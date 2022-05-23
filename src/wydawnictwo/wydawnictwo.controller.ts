import { Controller, Get, Param } from '@nestjs/common';
import { WydawnictwoService } from './wydawnictwo.service';

@Controller('wydawnictwo')
export class WydawnictwoController {

    constructor(
        private wydawnictwoService: WydawnictwoService
    ) { }

    
    @Get('')
    async findAll() {
        return this.wydawnictwoService.findAll();
    }

    @Get('id/:id')
    async findOne(@Param('id') id: string) {
        return this.wydawnictwoService.findOne(id);
    }
}