import { Controller, Get, Param } from '@nestjs/common';
import { GatunekLiterackiService } from './gatunek_literacki.service';

@Controller('gatunek-literacki')
export class GatunekLiterackiController {

    constructor(
        private gatunekLiterackiService: GatunekLiterackiService
    ) { }

    
    @Get('')
    async findAll() {
        return this.gatunekLiterackiService.findAll();
    }

    @Get('id/:id')
    async findOne(@Param('id') id: string) {
        return this.gatunekLiterackiService.findOne(id);
    }
}