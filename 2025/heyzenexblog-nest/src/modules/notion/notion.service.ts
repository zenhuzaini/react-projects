import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { NotionDataSourcePageDto, NotionUserDto } from './notion.dto';
import { NotionUserListResponse } from './notion.response.type';
import axios from 'axios';

@Injectable()
export class NotionService {
  private readonly notion: Client;
  private readonly logger = new Logger(NotionService.name);
  private readonly notionToken = process.env.NOTION_TOKEN;
  private readonly notionVersion = '2025-09-03';
  private readonly storybookDataSourceID = process.env.STORYBOOK_DATASOURCE_ID;

  constructor(private configService: ConfigService) {
    this.notion = new Client({
      auth: this.notionToken,
    });
  }

  async getUsers() {
    try {
      const response = (await this.notion.users.list(
        {},
      )) as NotionUserListResponse;
      return response.results.map((user) => new NotionUserDto(user));
    } catch (error) {
      return error;
    }
  }

  async getStoryBookDataSource(): Promise<NotionDataSourcePageDto[]> {
    const dataSourceId = this.storybookDataSourceID as string;

    const response = await this.notion.dataSources.query({
      data_source_id: dataSourceId,
    });

    return response.results.map((page) => new NotionDataSourcePageDto(page));
  }

  async getDatabaseByID(id: string): Promise<any> {
    const url = `https://api.notion.com/v1/databases/${id}`;

    try {
      const response = await axios.request({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${this.notionToken}`,
          'Notion-Version': this.notionVersion,
        },
        data: {},
      });

      return response.data;
    } catch (error) {
      this.logger.error('Error fetching Notion database:', error);
      throw error;
    }
  }
}
