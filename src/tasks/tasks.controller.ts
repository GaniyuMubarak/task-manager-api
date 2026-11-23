import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    return this.tasksService.createTask(createTaskDto, req.user.id);
  }

  @Get()
  getAllTasks(@Request() req: any) {
    return this.tasksService.getAllTasks(req.user.id);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.tasksService.getTaskById(id, req.user.id);
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: any,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto, req.user.id);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.tasksService.deleteTask(id, req.user.id);
  }
}