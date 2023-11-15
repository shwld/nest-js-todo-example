import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeFirebaseAdmin } from './_initializers/initialize-firebase-admin';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  initializeFirebaseAdmin();
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  await app.listen(3002);
}
bootstrap();
