import { ApiProperty } from '@nestjs/swagger';
import { NotionUser } from './notion.response.type';

export class NotionUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  avatarUrl: string | null;

  @ApiProperty()
  type: 'person' | 'bot';

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  workspaceName?: string;

  @ApiProperty({ required: false })
  workspaceId?: string;

  constructor(user: NotionUser) {
    this.id = user.id;
    this.name = user.name;
    this.avatarUrl = user.avatar_url ?? null;
    this.type = user.type;

    if (user.type === 'person' && user.person) {
      this.email = user.person.email;
    }

    if (user.type === 'bot' && user.bot) {
      this.workspaceName = user.bot.workspace_name;
      this.workspaceId = user.bot.workspace_id;
    }
  }
}

export class NotionDataSourcePageDto {
  id: string;
  name: string;
  story: string;
  photoUrls: string[];
  url: string;
  createdAt: string;
  modifiedAt: string;

  constructor(page: any) {
    this.id = page.id;
    this.name = page.properties?.Name?.title[0]?.plain_text || '';
    this.story = page.properties?.story?.rich_text[0]?.plain_text || '';
    this.photoUrls =
      page.properties?.photoUrls?.multi_select?.map((item: any) => item.name) ||
      [];
    this.url = page.url;
    this.createdAt = page.properties?.['created at']?.created_time;
    this.modifiedAt = page.properties?.['modified at']?.last_edited_time;
  }
}
