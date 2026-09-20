import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //  app.useBodyParser('json', { limit: '50mb' });
  //  app.useBodyParser('urlencoded', { limit: '50mb', extended: true });

  const config = new DocumentBuilder()
    .setTitle('Notion API')
    .setDescription('Storybook CRUD operations using Notion API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
