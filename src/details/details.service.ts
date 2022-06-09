import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DetailsService {

    constructor(
        private prismaService: PrismaService
    ) { }

    async getBookData(bookID: string) {
        return {
            autorzy: await this.prismaService.autor.findMany({
                where: {
                    ksiazka_autor: {
                        some: {
                            ID_Ksiazka: +bookID
                        }
                    }
                }
            }),
            gatunki: await this.prismaService.gatunek_literacki.findMany({
                where: {
                    ksiazka_gatunek: {
                        some: {
                            ID_Ksiazka: +bookID
                        }
                    }
                }
            }),
            wydawnictwa: await this.prismaService.wydawnictwo.findMany({
                where: {
                    ksiazka_wydawnictwo: {
                        some: {
                            ID_Ksiazka: +bookID
                        }
                    }
                }
            }),
        }
    }
}