import { Controller, Get, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
    @Get()
    @Version('1')
    @ApiOperation({ summary: 'API Root' })
    @ApiResponse({ status: 200, description: 'Welcome message' })
    getHello() {
        return {
            message: 'Welcome to CarePlus API',
            version: '1.0.0',
            status: 'OK',
            docs: '/api/docs',
        };
    }
}
