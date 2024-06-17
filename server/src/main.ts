import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useGlobalPipes(new ValidationPipe());

  const logger = new Logger(bootstrap.name);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('port');

  await app.listen(port);
  logger.log(`🦾 Server started on http://127:0.0.1:${port}`);
}
bootstrap();
