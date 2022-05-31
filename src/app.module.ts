import { Module } from '@nestjs/common';
import { AutorModule } from './autor/autor.module';
import { PrismaModule } from './prisma/prisma.module';
import { WydawnictwoModule } from './wydawnictwo/wydawnictwo.module';
import { KsiazkaModule } from './ksiazka/ksiazka.module';
import { GatunekLiterackiModule } from './gatunek_literacki/gatunek_literacki.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [

        //  local modules
        AutorModule,
        PrismaModule,
        WydawnictwoModule,
        KsiazkaModule,
        GatunekLiterackiModule,

        //  utilities
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }