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
  headerPhoto: string;
  lat: string;
  long: string;
  location: string;
  totallike: number | null;
  totalview: number | null;
  youtube: string;
  instagram: string;
  strava: string;
  komoot: string;
  otherURL: string;
  url: string;
  createdAt: string;
  modifiedAt: string;

  constructor(page: any) {
    const props = page.properties || {};

    const richTextToString = (prop: any) =>
      prop?.rich_text?.map((rt: any) => rt.plain_text).join('') || '';

    this.id = page.id;
    this.name = props?.Name?.title?.[0]?.plain_text || '';
    this.story = richTextToString(props?.story);
    this.photoUrls =
      props?.photoUrls?.multi_select?.map((i: any) => i.name) || [];
    this.headerPhoto = richTextToString(props?.headerPhoto);
    this.lat = richTextToString(props?.lat);
    this.long = richTextToString(props?.long);
    this.location = richTextToString(props?.location);
    this.totallike = props?.totallike?.number ?? null;
    this.totalview = props?.totalview?.number ?? null;
    this.youtube = richTextToString(props?.youtube);
    this.instagram = richTextToString(props?.instagram);
    this.strava = richTextToString(props?.strava);
    this.komoot = richTextToString(props?.komoot);
    this.otherURL = richTextToString(props?.otherURL);
    this.url = page.url;
    this.createdAt = props?.['created at']?.created_time || '';
    this.modifiedAt = props?.['modified at']?.last_edited_time || '';
  }
}

// for like
export class UpdateTotallikeDto {
  @ApiProperty()
  pageId: string;
}
