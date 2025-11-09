import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import {
  CreateStoryBookDto,
  NotionDataSourcePageDto,
  NotionUserDto,
  StoryBookResponseDto,
  UpdateStoryBookDto,
} from './notion.dto';
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

  async getStoryBookDataSource(
    pageSize = 10,
    startCursor?: string,
  ): Promise<{
    data: NotionDataSourcePageDto[];
    next_cursor: string | null;
    has_more: boolean;
  }> {
    const dataSourceId = this.storybookDataSourceID as string;

    const response = await this.notion.dataSources.query({
      data_source_id: dataSourceId,
      sorts: [
        {
          property: 'created at',
          direction: 'descending',
        },
      ],
      page_size: Number(pageSize), // number of items per page
      start_cursor: startCursor, // for next page
    });

    const constructedData = response.results.map(
      (page) => new NotionDataSourcePageDto(page),
    );
    return {
      data: constructedData,
      next_cursor: response.next_cursor,
      has_more: response.has_more,
    };
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

  async getStoryBookBasedOnId(
    pageId: string,
  ): Promise<NotionDataSourcePageDto> {
    const page = await this.notion.pages.retrieve({ page_id: pageId });
    return new NotionDataSourcePageDto(page);
  }

  async updateTotalLike(pageId: string): Promise<any> {
    try {
      // 1️⃣ Fetch current page
      const page = await this.getStoryBookBasedOnId(pageId);

      // 3️⃣ Increment by 1
      const newTotallike = (page.totallike ?? 0) + 1;
      const response = await this.notion.pages.update({
        page_id: pageId,
        properties: {
          totallike: {
            number: newTotallike,
          },
        },
      });

      return response;
    } catch (error: any) {
      this.logger.error(
        `Failed to update totallike for page ${pageId}`,
        error.message,
      );
      throw new Error(`Notion API error: ${error.message}`);
    }
  }

  async updateTotalView(pageId: string): Promise<any> {
    try {
      const page = await this.getStoryBookBasedOnId(pageId);
      const newTotalView = (page.totalview ?? 0) + 1;

      const response = await this.notion.pages.update({
        page_id: pageId,
        properties: {
          totalview: {
            number: newTotalView,
          },
        },
      });

      return response;
    } catch (error: any) {
      this.logger.error(
        `Failed to update totallike for page ${pageId}`,
        error.message,
      );
      throw new Error(`Notion API error: ${error.message}`);
    }
  }

  async createStoryBook(
    dto: CreateStoryBookDto,
  ): Promise<StoryBookResponseDto> {
    try {
      const data_source_id = this.storybookDataSourceID;

      const response = await this.notion.pages.create({
        parent: { data_source_id: data_source_id as string },
        properties: {
          Name: {
            title: [
              {
                text: { content: dto.name },
              },
            ],
          },
          story: {
            rich_text: [
              {
                text: { content: dto.story || '' },
              },
            ],
          },
          photoUrls: {
            multi_select: (dto.photoUrls || []).map((url) => ({ name: url })),
          },
          headerPhoto: {
            rich_text: [
              {
                text: { content: dto.headerPhoto || '' },
              },
            ],
          },
          lat: {
            rich_text: [
              {
                text: { content: dto.lat || '' },
              },
            ],
          },
          long: {
            rich_text: [
              {
                text: { content: dto.long || '' },
              },
            ],
          },
          location: {
            rich_text: [
              {
                text: { content: dto.location || '' },
              },
            ],
          },
          totallike: {
            number: dto.totallike ?? 0,
          },
          totalview: {
            number: dto.totalview ?? 0,
          },
          youtube: {
            rich_text: [
              {
                text: { content: dto.youtube || '' },
              },
            ],
          },
          instagram: {
            rich_text: [
              {
                text: { content: dto.instagram || '' },
              },
            ],
          },
          strava: {
            rich_text: [
              {
                text: { content: dto.strava || '' },
              },
            ],
          },
          komoot: {
            rich_text: [
              {
                text: { content: dto.komoot || '' },
              },
            ],
          },
          otherURL: {
            rich_text: [
              {
                text: { content: dto.otherURL || '' },
              },
            ],
          },
        },
      });

      // 🧠 Map response to your DTO for clean output
      const result: StoryBookResponseDto = {
        name: dto.name,
        story: dto.story,
        photoUrls: dto.photoUrls,
        headerPhoto: dto.headerPhoto,
        lat: dto.lat,
        long: dto.long,
        location: dto.location,
        totallike: dto.totallike,
        totalview: dto.totalview,
        youtube: dto.youtube,
        instagram: dto.instagram,
        strava: dto.strava,
        komoot: dto.komoot,
        otherURL: dto.otherURL,
      };

      return result;
    } catch (error: any) {
      this.logger.error('Failed to create storybook', error.message);
      throw new Error(`Notion API error: ${error.message}`);
    }
  }

  async updateStoryBook(
    dto: UpdateStoryBookDto,
  ): Promise<StoryBookResponseDto> {
    try {
      const { pageId, ...data } = dto;

      await this.notion.pages.update({
        page_id: pageId,
        properties: {
          ...(data.name && {
            Name: {
              title: [{ text: { content: data.name } }],
            },
          }),
          ...(data.story && {
            story: {
              rich_text: [{ text: { content: data.story } }],
            },
          }),
          ...(data.photoUrls && {
            photoUrls: {
              multi_select: data.photoUrls.map((url) => ({ name: url })),
            },
          }),
          ...(data.headerPhoto && {
            headerPhoto: {
              rich_text: [{ text: { content: data.headerPhoto } }],
            },
          }),
          ...(data.lat && {
            lat: {
              rich_text: [{ text: { content: data.lat } }],
            },
          }),
          ...(data.long && {
            long: {
              rich_text: [{ text: { content: data.long } }],
            },
          }),
          ...(data.location && {
            location: {
              rich_text: [{ text: { content: data.location } }],
            },
          }),
          ...(data.totallike !== undefined && {
            totallike: { number: data.totallike },
          }),
          ...(data.totalview !== undefined && {
            totalview: { number: data.totalview },
          }),
          ...(data.youtube && {
            youtube: {
              rich_text: [{ text: { content: data.youtube } }],
            },
          }),
          ...(data.instagram && {
            instagram: {
              rich_text: [{ text: { content: data.instagram } }],
            },
          }),
          ...(data.strava && {
            strava: {
              rich_text: [{ text: { content: data.strava } }],
            },
          }),
          ...(data.komoot && {
            komoot: {
              rich_text: [{ text: { content: data.komoot } }],
            },
          }),
          ...(data.otherURL && {
            otherURL: {
              rich_text: [{ text: { content: data.otherURL } }],
            },
          }),
        },
      });

      return {
        name: data.name || '',
        story: data.story || '',
        photoUrls: data.photoUrls || [],
        headerPhoto: data.headerPhoto || '',
        lat: data.lat || '',
        long: data.long || '',
        location: data.location || '',
        totallike: data.totallike || 0,
        totalview: data.totalview || 0,
        youtube: data.youtube || '',
        instagram: data.instagram || '',
        strava: data.strava || '',
        komoot: data.komoot || '',
        otherURL: data.otherURL || '',
      };
    } catch (error: any) {
      this.logger.error('Failed to update storybook', error.message);
      throw new Error(`Notion API error: ${error.message}`);
    }
  }
}
