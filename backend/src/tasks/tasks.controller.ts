import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
    create(@Body() createTaskDto: CreateTaskDto, @GetUser('userId') userId: string) {
        return this.tasksService.create(createTaskDto, userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all tasks with filtering and pagination' })
    findAll(
        @Query() filterDto: TaskFilterDto,
        @GetUser('userId') userId: string,
    ) {
        return this.tasksService.findAll(userId, filterDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a task by id' })
    findOne(@Param('id') id: string, @GetUser('userId') userId: string) {
        return this.tasksService.findOne(id, userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a task' })
    update(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUser('userId') userId: string,
    ) {
        return this.tasksService.update(id, updateTaskDto, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task' })
    remove(@Param('id') id: string, @GetUser('userId') userId: string) {
        return this.tasksService.remove(id, userId);
    }
}
