import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      userId,
    });
    return this.taskRepository.save(task);
  }

  async getAllTasks(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId } });
  }

  async getTaskById(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return task;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task> {
    const task = await this.getTaskById(id, userId);
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number, userId: number): Promise<{ message: string }> {
    const task = await this.getTaskById(id, userId);
    await this.taskRepository.remove(task);
    return { message: 'Task deleted successfully' };
  }
}