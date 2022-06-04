import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EgzemplarzService {

    constructor(
        private prismaService: PrismaService
    ) { }


    async findAll() {
        return this.prismaService.egzemplarz.findMany({
            where: {
                transakcja_sprzedazy: { none: {} }
            }
        });
    }

    async findOne(id: string) {
        return this.prismaService.egzemplarz.findFirst({
            where: {
                ID_Egzemplarz: { equals: +id },
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


    async findAllByCondition(condition: string) {
        return this.prismaService.egzemplarz.findMany({
            where: {
                Stan__ocena_: { contains: condition },
                OR: {
                    Stan__opis_: { contains: condition }
                }
            }
        });
    }

    async findAllByPriceFrom(price: string) {
        return this.prismaService.egzemplarz.findMany({
            where: {
                Cena_sugerowana: { gt: +price }   
            }
        });
    }

    async findAllByPriceTo(price: string) {
        return this.prismaService.egzemplarz.findMany({
            where: {
                Cena_sugerowana: { lt: +price }   
            }
        });
    }

    async findAllByISBN(ISBN: string) {
        return this.prismaService.egzemplarz.findMany({
            where: {
                ISBN: { contains: ISBN }
            }
        });
    }


    async findAllByTitle(title: string) {
        return this.prismaService.egzemplarz.findMany({
            where: {
                ksiazka: {
                    
                    Tytul: { contains: title },
                }
            }
        });
    }

    async findAllByReleaseFrom(date: string) {
        return this.prismaService.egzemplarz.findMany({
            where: {
                ksiazka: {
                    
                    Data_premiery: { gt: date }
                }
            }
        });
    }

    async findAllByReleaseTo(date: string) {
        return this.prismaService.egzemplarz.findMany({
            where: {
                ksiazka: {
                    
                    Data_premiery: { lt: date }
                }
            }
        });
    }


    async findAllByAuthorID(id: string) {
        return this.prismaService.egzemplarz.findMany({
            where: {
                ksiazka: {
                    ksiazka_autor: {
                        some: {
                            ID_Autor: { equals: +id }
                        }
                    }
                }
            }
        });
    }

    async findAllByGenreID(id: string) {
        return this.prismaService.egzemplarz.findMany({
            where: {
                ksiazka: {
                    ksiazka_gatunek: {
                        some: {
                            ID_Gatunek: { equals: +id }
                        }
                    }
                }
            }
        });
    }

    async findAllByPublishID(id: string) {
        return this.prismaService.egzemplarz.findMany({
            where: {
                ksiazka: {
                    ksiazka_wydawnictwo: {
                        some: {
                            ID_Wydawnictwo: { equals: +id }
                        }
                    }
                }
            }
        });
    }
}