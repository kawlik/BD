import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransakcjeService {

    constructor(
        private prismaService: PrismaService
    ) { }

    async buy(cena: number, kasjerID: string, ksiazkaID: string, dane: {
        data: Date,
        cena: number,
        stan: string,
        opis: string,
        ISBN: string,
    }) {
        const egzemplarz = this.prismaService.egzemplarz.create({
            data: {
                Data_wydania: dane.data,
                Cena_sugerowana: dane.cena,
                Stan__ocena_: dane.stan,
                Stan__opis_: dane.opis,
                ISBN: dane.ISBN,
                ID_Ksiazka: +ksiazkaID,
            }
        });
        const transakcja = this.prismaService.transakcja_zakupu.create({
            data: {
                Cena: cena,
                Data_transakcji: Date.now().toString(),
                ID_Egzemplarz: (await egzemplarz).ID_Egzemplarz,
                ID_Kasjer: +kasjerID,
            }
        })
    }

    async sell(cena: number, kasjerID: string, egzemplarzID: string) {
        const transakcja = this.prismaService.transakcja_sprzedazy.create({
            data: {
                Cena: cena,
                Data_transakcji: ( new Date()).toISOString(),
                ID_Egzemplarz: +egzemplarzID,
                ID_Kasjer: +kasjerID,
            }
        })
    }
}