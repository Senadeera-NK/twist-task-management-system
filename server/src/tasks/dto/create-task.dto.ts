import {IsString, IsNotEmpty, IsOptional, MinLength} from 'class-validator';

export class createTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title:string;

    @IsString()
    @IsOptional()
    description?:string;
}