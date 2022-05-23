import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GatunekLiterackiService {

    constructor(
        private prismaService: PrismaService
    ) { }

    
    async findAll() {
        return this.prismaService.gatunek_literacki.findMany();
    }

    async findOne(id: string) {
        return this.prismaService.gatunek_literacki.findFirst({
            where: {
                ID_Gatunek: { equals: +id }
            }
        });
    }
}