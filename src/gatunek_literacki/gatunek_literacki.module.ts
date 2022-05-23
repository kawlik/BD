import { Module } from '@nestjs/common';
import { GatunekLiterackiController } from './gatunek_literacki.controller';
import { GatunekLiterackiService } from './gatunek_literacki.service';

@Module({
    controllers: [GatunekLiterackiController],
    providers: [GatunekLiterackiService]
})
export class GatunekLiterackiModule { }