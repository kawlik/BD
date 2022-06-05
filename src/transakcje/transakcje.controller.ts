import { Body, Controller, Post } from '@nestjs/common';
import { TransakcjeService } from './transakcje.service';

@Controller('transakcje')
export class TransakcjeController {

    constructor(
        private transakcjeService: TransakcjeService
    ) { }

    @Post('buy')
    async buy(@Body() payload: {
        kasjerID: string,
        ksiazkaID: string,
        cena: number,
        dane: {
            data: Date,
            cena: number,
            stan: string,
            opis: string,
            ISBN: string,
        }
    }) {
        return this.transakcjeService.buy(payload.cena, payload.kasjerID, payload.ksiazkaID, payload.dane);
    }

    @Post('sell')
    async sell(@Body() payload: {
        kasjerID: string,
        egzemplarzID: string,
        cena: number,
    }) {
        return this.transakcjeService.sell(payload.cena, payload.kasjerID, payload.egzemplarzID);
    }
}