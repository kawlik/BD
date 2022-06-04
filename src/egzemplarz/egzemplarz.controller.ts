import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EgzemplarzService } from './egzemplarz.service';

@Controller('egzemplarz')
export class EgzemplarzController {

    constructor(
        private egzemplarzService: EgzemplarzService
    ) { }

    
    @Get('')
    async findAll() {
        return this.egzemplarzService.findAll();
    }

    @Get('id/:id')
    async findOne(@Param('id') id: string) {
        return this.egzemplarzService.findOne(id);
    }

    @Post('@')
    async find(@Body() query: {
        title?: string,
        authorID?: string,
        genereID?: string,
        publishID?: string,
    }) {
        return this.egzemplarzService.find(query);
    }

    @Get('condition/:condition')
    async findAllByCondition(@Param('condition') condition: string) {
        return this.egzemplarzService.findAllByCondition(condition);
    }

    @Get('price-from/:price')
    async findAllByPriceFrom(@Param('price') price: string) {
        return this.egzemplarzService.findAllByPriceFrom(price);
    }

    @Get('price-to/:price')
    async findAllByPriceTo(@Param('price') price: string) {
        return this.egzemplarzService.findAllByPriceTo(price);
    }

    @Get('ISBN/:ISBN')
    async findAllByISBN(@Param('ISBN') ISBN: string) {
        return this.egzemplarzService.findAllByISBN(ISBN);
    }

    @Get('title/:title')
    async findAllByTitle(@Param('title') title: string) {
        return this.egzemplarzService.findAllByTitle(title);
    }

    @Get('release-from/:date')
    async findAllByReleaseFrom(@Param('date') date: string) {
        return this.egzemplarzService.findAllByReleaseFrom(date);
    }

    @Get('release-to/:date')
    async findAllByReleaseTo(@Param('date') date: string) {
        return this.egzemplarzService.findAllByReleaseTo(date);
    }

    @Get('author/:id')
    async findAllByAuthorID(@Param('id') id: string) {
        return this.egzemplarzService.findAllByAuthorID(id);
    }

    @Get('genre/:id')
    async findAllByGenreID(@Param('id') id: string) {
        return this.egzemplarzService.findAllByGenreID(id);
    }

    @Get('publish/:id')
    async findAllByPublishID(@Param('id') id: string) {
        return this.egzemplarzService.findAllByPublishID(id);
    }
}