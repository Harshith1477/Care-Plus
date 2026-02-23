import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({ example: 'Buy groceries' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @ApiPropertyOptional({ example: 'Milk, Eggs, Bread' })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;
}
