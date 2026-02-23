import {
    Controller,
    Get,
    Patch,
    Body,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: 'Return current user info' })
    async getMe(@GetUser('userId') userId: string) {
        const user = await this.usersService.findOneById(userId);
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    @Patch('me')
    @ApiOperation({ summary: 'Update current user profile' })
    @ApiResponse({ status: 200, description: 'User profile updated' })
    async updateMe(
        @GetUser('userId') userId: string,
        @Body() updateUserDto: Prisma.UserUpdateInput,
    ) {
        // Basic protection: don't allow updating password directly here or role
        const { password, role, ...data } = updateUserDto as any;
        const user = await this.usersService.update(userId, data);
        if (user) {
            const { password: _, ...result } = user;
            return result;
        }
        return null;
    }
}
