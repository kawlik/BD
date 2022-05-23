import { Module } from '@nestjs/common';
import { AutorController } from './autor.controller';
import { AutorService } from './autor.service';

@Module({
    controllers: [AutorController],
    providers: [AutorService]
})
export class AutorModule { }