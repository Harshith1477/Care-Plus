import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto, userId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAll(filterDto: TaskFilterDto, userId: string): Promise<{
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
