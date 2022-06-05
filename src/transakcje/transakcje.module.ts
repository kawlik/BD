import { Module } from '@nestjs/common';
import { TransakcjeController } from './transakcje.controller';
import { TransakcjeService } from './transakcje.service';

@Module({
    controllers: [TransakcjeController],
    providers: [TransakcjeService]
})
export class TransakcjeModule { }