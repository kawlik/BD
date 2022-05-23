import { Module } from '@nestjs/common';
import { KsiazkaController } from './ksiazka.controller';
import { KsiazkaService } from './ksiazka.service';

@Module({
    controllers: [KsiazkaController],
    providers: [KsiazkaService]
})
export class KsiazkaModule { }