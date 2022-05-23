import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KsiazkaService } from './ksiazka.service';

@Controller('ksiazka')
export class KsiazkaController {

    constructor(
        private ksiazkaService: KsiazkaService
    ) { }

    
    @Get('')
    async findAll() {
        return this.ksiazkaService.findAll();
    }

    @Get('id/:id')
    async findOne(@Param('id') id: string) {
        return this.ksiazkaService.findOne(id);
    }

    @Post('@')
    async find(@Body() query: {
        title?: string,
        authorID?: string,
        genereID?: string,
        publishID?: string,
    }) {
        return this.ksiazkaService.find(query);
    }


    @Get('title/:title')
    async findAllByTitle(@Param('title') title: string) {
        return this.ksiazkaService.findAllByTitle(title);
    }

    @Get('release-from/:date')
    async findAllByReleaseFrom(@Param('date') date: string) {
        return this.ksiazkaService.findAllByReleaseFrom(date);
    }

    @Get('release-to/:date')
    async findAllByReleaseTo(@Param('date') date: string) {
        return this.ksiazkaService.findAllByReleaseTo(date);
    }

    @Get('author/:id')
    async findAllByAuthorID(@Param('id') id: string) {
        return this.ksiazkaService.findAllByAuthorID(id);
    }

    @Get('genre/:id')
    async findAllByGenreID(@Param('id') id: string) {
        return this.ksiazkaService.findAllByGenreID(id);
    }

    @Get('publish/:id')
    async findAllByPublishID(@Param('id') id: string) {
        return this.ksiazkaService.findAllByPublishID(id);
    }
}