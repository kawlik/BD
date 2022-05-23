import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AutorService } from './autor.service';

@Controller('autor')
export class AutorController {

    constructor(
        private autorService: AutorService
    ) { }

    
    @Get('')
    async findAll() {
        return this.autorService.findAll();
    }

    @Get('id/:id')
    async findOne(@Param('id') id: string) {
        return this.autorService.findOne(id);
    }

    @Post('@')
    async find(@Body() query: {
        alias?: string,
        names?: string,
        surname?: string,
    }) {
        return this.autorService.find(query);
    }


    @Get('alias/:alias')
    async findAllByAlias(@Param('alias') alias: string) {
        return this.autorService.findAllByAlias(alias);
    }

    @Get('names/:names')
    async findAllByName(@Param('names') names: string) {
        return this.autorService.findAllByNames(names);
    }

    @Get('surname/:surname')
    async findAllBySurname(@Param('surname') surname: string) {
        return this.autorService.findAllBySurname(surname);
    }

    @Get('birth-from/:date')
    async findAllByBirthFrom(@Param('date') date: string) {
        return this.autorService.findAllByBirthFrom(date);
    }

    @Get('birth-to/:date')
    async findAllByBirthTo(@Param('date') date: string) {
        return this.autorService.findAllByBirthTo(date);
    }

    @Get('death-from/:date')
    async findAllByDeathFrom(@Param('date') date: string) {
        return this.autorService.findAllByDeathFrom(date);
    }

    @Get('death-to/:date')
    async findAllByDeathTo(@Param('date') date: string) {
        return this.autorService.findAllByDeathTo(date);
    }
}