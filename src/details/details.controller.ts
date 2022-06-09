import { Controller, Get, Param } from '@nestjs/common';
import { DetailsService } from './details.service';

@Controller('details')
export class DetailsController {

    constructor(
        private detailsService: DetailsService
    ) { }

    @Get('book/:id')
    async getBookData(@Param('id') bookID: string) {
        return this.detailsService.getBookData( bookID );
    }
}