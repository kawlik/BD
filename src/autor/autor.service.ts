import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AutorService {

    constructor(
        private prismaService: PrismaService
    ) { }


    async findAll() {
        return this.prismaService.autor.findMany();
    }

    async findOne(id: string) {
        return this.prismaService.autor.findFirst({
            where: {
                ID_Autor: { equals: +id }
            }
        });
    }

    async find(query: {
        alias?: string,
        names?: string,
        surname?: string,
    }) {
        return [ ...new Set([
            ...await ( query?.alias      ? this.findAllByAlias( query.alias )        : [] ),
            ...await ( query?.names      ? this.findAllByNames( query.names )        : [] ),
            ...await ( query?.surname    ? this.findAllBySurname( query.surname )    : [] ),
        ])];
    }
    

    async findAllByAlias(alias: string) {
        return this.prismaService.autor.findMany({
            where: {
                Identyfikator: { contains: alias }
            }
        });
    }

    async findAllByNames(names: string) {
        return this.prismaService.autor.findMany({
            where: {
                Imiona: { contains: names }
            }
        });
    }

    async findAllBySurname(surname: string) {
        return this.prismaService.autor.findMany({
            where: {
                Nazwisko: { contains: surname }
            }
        });
    }

    async findAllByBirthFrom(date: string) {
        return this.prismaService.autor.findMany({
            where: {
                Data_narodzin: { gt: new Date(date) }
            }
        });
    }

    async findAllByBirthTo(date: string) {
        return this.prismaService.autor.findMany({
            where: {
                Data_narodzin: { lt: new Date(date) }
            }
        });
    }

    async findAllByDeathFrom(date: string) {
        return this.prismaService.autor.findMany({
            where: {
                Data_smierci: { gt: new Date(date) }
            }
        });
    }

    async findAllByDeathTo(date: string) {
        return this.prismaService.autor.findMany({
            where: {
                Data_smierci: { lt: new Date(date) }
            }
        });
    }
}