import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Activa la validación en todos los endpoints que usen DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no estén en el DTO (ej. un "id" enviado a mano)
      transform: true, // entrega al controlador los valores ya transformados (con trim aplicado)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();