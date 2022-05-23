import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KsiazkaService {

    constructor(
        private prismaService: PrismaService
    ) { }


    async findAll() {
        return this.prismaService.ksiazka.findMany();
    }

    async findOne(id: string) {
        return this.prismaService.ksiazka.findFirst({
            where: {
                ID_Ksiazka: { equals: +id },
            }
        });
    }

    async find(query: {
        title?: string,
        authorID?: string,
        genereID?: string,
        publishID?: string,
    }) {
        return [ ...new Set([
            ...await ( query?.title     ? this.findAllByTitle( query.title )            : [] ),
            ...await ( query?.authorID  ? this.findAllByAuthorID( query.authorID )      : [] ),
            ...await ( query?.genereID  ? this.findAllByGenreID( query.genereID )       : [] ),
            ...await ( query?.publishID ? this.findAllByPublishID( query.publishID )    : [] ),
        ])];
    }


    async findAllByTitle(title: string) {
        return this.prismaService.ksiazka.findMany({
            where: {
                Tytul: { contains: title },
            }
        });
    }

    async findAllByReleaseFrom(date: string) {
        return this.prismaService.ksiazka.findMany({
            where: {
                Data_premiery: { gt: date }
            }
        });
    }

    async findAllByReleaseTo(date: string) {
        return this.prismaService.ksiazka.findMany({
            where: {
                Data_premiery: { lt: date }
            }
        });
    }


    async findAllByAuthorID(id: string) {
        return this.prismaService.ksiazka.findMany({
            where: {
                ksiazka_autor: {
                    some: {
                        ID_Autor: { equals: +id }
                    }
                }
            }
        });
    }

    async findAllByGenreID(id: string) {
        return this.prismaService.ksiazka.findMany({
            where: {
                ksiazka_gatunek: {
                    some: {
                        ID_Gatunek: { equals: +id }
                    }
                }
            }
        });
    }

    async findAllByPublishID(id: string) {
        return this.prismaService.ksiazka.findMany({
            where: {
                ksiazka_wydawnictwo: {
                    some: {
                        ID_Wydawnictwo: { equals: +id }
                    }
                }
            }
        });
    }
}