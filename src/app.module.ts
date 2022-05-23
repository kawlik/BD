import { Module } from '@nestjs/common';
import { AutorModule } from './autor/autor.module';
import { PrismaModule } from './prisma/prisma.module';
import { WydawnictwoModule } from './wydawnictwo/wydawnictwo.module';
import { KsiazkaModule } from './ksiazka/ksiazka.module';
import { GatunekLiterackiModule } from './gatunek_literacki/gatunek_literacki.module';

@Module({
    imports: [AutorModule, PrismaModule, WydawnictwoModule, KsiazkaModule, GatunekLiterackiModule],
    controllers: [],
    providers: [],
})
export class AppModule { }