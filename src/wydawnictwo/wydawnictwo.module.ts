import { Module } from '@nestjs/common';
import { WydawnictwoController } from './wydawnictwo.controller';
import { WydawnictwoService } from './wydawnictwo.service';

@Module({
    controllers: [WydawnictwoController],
    providers: [WydawnictwoService]
})
export class WydawnictwoModule { }