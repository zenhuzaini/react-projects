import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionModule } from './modules/notion/notion.module';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ConfigModule.forRoot(), NotionModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
