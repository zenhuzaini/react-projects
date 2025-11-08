import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { NotionService } from './notion.service';
import {
  CreateStoryBookDto,
  NotionDataSourcePageDto,
  NotionUserDto,
  StoryBookResponseDto,
  UpdateStoryBookDto,
  UpdateTotallikeDto,
} from './notion.dto';

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

  @Patch('storybook/like')
  async updateTotalLike(@Body() dto: UpdateTotallikeDto) {
    return this.notionService.updateTotalLike(dto.pageId);
  }

  @Patch('storybook/view')
  async updateTotalView(@Body() dto: UpdateTotallikeDto) {
    return this.notionService.updateTotalView(dto.pageId);
  }

  @Get('storybook/:id')
  async getStoryBookBasedOnId(
    @Param('id') id: string,
  ): Promise<NotionDataSourcePageDto> {
    return this.notionService.getStoryBookBasedOnId(id);
  }

  @Post('storybook')
  async createStoryBook(
    @Body() createDto: CreateStoryBookDto,
  ): Promise<StoryBookResponseDto> {
    return this.notionService.createStoryBook(createDto);
  }

  @Patch('storybook')
  async updateStoryBook(
    @Body() dto: UpdateStoryBookDto,
  ): Promise<StoryBookResponseDto> {
    return this.notionService.updateStoryBook(dto);
  }
}
