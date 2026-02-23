import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto, userId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAll(userId: string, filterDto: TaskFilterDto): Promise<{
        items: {
            id: string;
            title: string;
            description: string | null;
            completed: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        }[];
        total: number;
        limit: number;
        offset: number;
    }>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
