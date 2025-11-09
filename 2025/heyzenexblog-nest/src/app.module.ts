import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionModule } from './modules/notion/notion.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), NotionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
