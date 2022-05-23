import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//  define server
async function bootstrap() {
    const app = await NestFactory.create( AppModule, { cors: true });
    await app.listen( 8080 );
}

//  start server
bootstrap();