import { Module } from '@nestjs/common';
import { EgzemplarzController } from './egzemplarz.controller';
import { EgzemplarzService } from './egzemplarz.service';

@Module({
    controllers: [EgzemplarzController],
    providers: [EgzemplarzService]
})
export class EgzemplarzModule { }