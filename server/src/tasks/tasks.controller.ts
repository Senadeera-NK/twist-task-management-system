import { Controller, Post, Get, Body, UseGuards, Request, ParseIntPipe, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Post('/create')
    async createTask(@Body() body:createTaskDto, @Request() req:any){
        return this.tasksService.create(req.user.userId, body.title, body.description);
    }

    @Get('/get-all')
    async findAllTasks(@Request() req:any, @Query('search') search?:string){
        return this.tasksService.findAll(req.user.userId, search);
    }

    @Patch(':id')
    async updateTask(@Param('id', ParseIntPipe) id:number, @Request() req:any, @Body() body:any){
        return this.tasksService.update(id, req.user.userId, body);
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id:number, @Request() req:any){
        return this.tasksService.remove(id, req.user.userId);
    }
}
