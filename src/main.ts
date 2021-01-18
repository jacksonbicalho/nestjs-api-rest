import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from 'typeorm/container';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
          transform: true,
          forbidUnknownValues: true,
          validationError: { target: false }
      })
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}

bootstrap();