import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService){}

    //creating tasks
    async create(userId:number, title:string, description?:string){
        return this.prisma.task.create({
            data:{
                title,
                description:description||'',
                userId
            }
        });
    }

    //getting all tasks
    async findAll(userId: number, search?: string){
        return this.prisma.task.findMany({
            where:{
                userId:userId,
                //this is only applies if user search the tasks by the title
                ...(search &&{
                    title:{
                        contains:search,
                        mode:'insensitive',
                    },
                }),
            },
        });
    }

    //update a specific task
    async update(taskId: number,userId: number,data:{title?:string, description?:string, isCompleted?:boolean}){
        return this.prisma.task.updateMany({
            where:{
                id:taskId,
                userId:userId
            },
            data,
        });
    }

    //delete a specific task
    async remove(taskId:number, userId: number){
        return this.prisma.task.deleteMany({
            where:{
                id:taskId,
                userId:userId,
            },
        });
    }

}
