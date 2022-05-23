import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WydawnictwoService {

    constructor(
        private prismaService: PrismaService
    ) { }

    
    async findAll() {
        return this.prismaService.wydawnictwo.findMany();
    }

    async findOne(id: string) {
        return this.prismaService.wydawnictwo.findFirst({
            where: {
                ID_Wydawnictwo: { equals: +id }
            }
        });
    }
}