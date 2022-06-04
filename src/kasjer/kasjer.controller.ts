import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KasjerService } from './kasjer.service';

@Controller('kasjer')
export class KasjerController {

    constructor(
        private kasjerService: KasjerService
    ) { }

    @Get('signIn/:id')
    async signIn(@Param('id') id: string) {
        return this.kasjerService.signIn(id);
    }

    @Post('signUp')
    async signUp(@Body() cashier: {
        names: string,
        surname: string,
    }) {
        return this.kasjerService.signUp(cashier.names, cashier.surname);
    }
}