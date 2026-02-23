import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async create(createTaskDto: CreateTaskDto, userId: string) {
        return this.prisma.task.create({
            data: {
                ...createTaskDto,
                userId,
            },
        });
    }

    async findAll(userId: string, filterDto: TaskFilterDto) {
        const { search, completed, limit = 10, offset = 0 } = filterDto;

        const where: any = { userId };

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
            ];
        }

        if (completed !== undefined) {
            where.completed = completed;
        }

        const [items, total] = await Promise.all([
            this.prisma.task.findMany({
                where,
                take: Number(limit),
                skip: Number(offset),
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.task.count({ where }),
        ]);

        return {
            items,
            total,
            limit,
            offset,
        };
    }

    async findOne(id: string, userId: string) {
        const task = await this.prisma.task.findFirst({
            where: { id, userId },
        });

        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return task;
    }

    async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
        await this.findOne(id, userId);

        return this.prisma.task.update({
            where: { id },
            data: updateTaskDto,
        });
    }

    async remove(id: string, userId: string) {
        await this.findOne(id, userId);

        return this.prisma.task.delete({
            where: { id },
        });
    }
}
