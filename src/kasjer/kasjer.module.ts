import { Module } from '@nestjs/common';
import { KasjerController } from './kasjer.controller';
import { KasjerService } from './kasjer.service';

@Module({
    controllers: [KasjerController],
    providers: [KasjerService]
})
export class KasjerModule { }