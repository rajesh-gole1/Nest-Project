/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import {TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ){}


    async getTaskById(id: string): Promise<Task>{
        const found = await this.tasksRepository.findOne({where: {id}});
    
    if(!found){
        throw new NotFoundException(`Task with ID "${id}" not found`);
     }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const{title,description} = createTaskDto;

        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        await this.tasksRepository.save(task)
        return task;
    }

    // async deleteTask(id: string): Promise<void>{
    //     const result = await this.tasksRepository.delete(id)
    //     console.log(result);
        
    // }

    // updateTaskStatus(id: string, status: TaskStatus){
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    //     }
    

  

    // createTask(createTaskDto: CreateTaskDto): Task{
    //     const {title, description} = createTaskDto;

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }

    //     this.tasks.push(task);
    //     return task;


    // }
}
