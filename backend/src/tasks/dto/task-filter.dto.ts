import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class TaskFilterDto {
    @ApiPropertyOptional({ example: 'buy' })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ example: false })
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    completed?: boolean;

    @ApiPropertyOptional({ example: 10 })
    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    limit?: number = 10;

    @ApiPropertyOptional({ example: 0 })
    @IsInt()
    @Min(0)
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    offset?: number = 0;
}
