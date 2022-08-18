/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.model";

/* eslint-disable prettier/prettier */
@Entity()
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title:string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}