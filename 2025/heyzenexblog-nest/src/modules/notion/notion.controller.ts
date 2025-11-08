import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotionService } from './notion.service';
import { NotionDataSourcePageDto, NotionUserDto } from './notion.dto';

@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get('users')
  async getUsers(): Promise<NotionUserDto[]> {
    return this.notionService.getUsers();
  }

  @Get('storybook')
  async getStoryBookDataSource() {
    return this.notionService.getStoryBookDataSource();
  }

  // this api only to check the datasource id
  @Get('database/:id')
  async getDatabaseByID(
    @Param('id') id: string,
  ): Promise<NotionDataSourcePageDto[]> {
    return this.notionService.getDatabaseByID(id);
  }
}
