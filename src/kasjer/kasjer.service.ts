import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KasjerService {

    constructor(
        private prismaService: PrismaService
    ) { }

    async signIn(ID_Kasjer: string) {
        return this.prismaService.kasjer.findFirst({
            where: {
                ID_Kasjer: { equals: +ID_Kasjer }
            }
        });
    }

    async signUp(names: string, surname: string) {
        return this.prismaService.kasjer.create({
            data: {
                Imiona: names,
                Nazwisko: surname,
            }
        });
    }
}