import { ApiProperty, PartialType } from '@nestjs/swagger';
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
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  story: string;
  @ApiProperty()
  photoUrls: string[];
  @ApiProperty()
  headerPhoto: string;
  @ApiProperty()
  lat: string;
  @ApiProperty()
  long: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  totallike: number | null;
  @ApiProperty()
  totalview: number | null;
  @ApiProperty()
  youtube: string;
  @ApiProperty()
  instagram: string;
  @ApiProperty()
  strava: string;
  @ApiProperty()
  komoot: string;
  @ApiProperty()
  otherURL: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
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

export class CreateStoryBookDto {
  @ApiProperty({
    example: 'Me & My Bike(s)',
    description: 'Title of the storybook',
  })
  name: string;

  @ApiProperty({
    example: 'A journey through the city with my new bike',
    description: 'Story description or content',
  })
  story: string;

  @ApiProperty({
    example: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
    ],
    description: 'Array of photo URLs',
    type: [String],
  })
  photoUrls: string[];

  @ApiProperty({
    example: 'https://example.com/header.jpg',
    description: 'Main header photo URL',
  })
  headerPhoto: string;

  @ApiProperty({
    example: '3.1390',
    description: 'Latitude (optional)',
    required: false,
  })
  lat: string;

  @ApiProperty({
    example: '101.6869',
    description: 'Longitude (optional)',
    required: false,
  })
  long: string;

  @ApiProperty({
    example: 'Kuala Lumpur, Malaysia',
    description: 'Location name or address',
  })
  location: string;

  @ApiProperty({ example: 6, description: 'Total number of likes' })
  totallike: number;

  @ApiProperty({ example: 1, description: 'Total number of views' })
  totalview: number;

  @ApiProperty({
    example: 'https://youtube.com/watch?v=abcd1234',
    description: 'YouTube video URL',
    required: false,
  })
  youtube: string;

  @ApiProperty({
    example: 'https://instagram.com/p/xyz567',
    description: 'Instagram post URL',
    required: false,
  })
  instagram: string;

  @ApiProperty({
    example: 'https://www.strava.com/activities/123456789',
    description: 'Strava activity URL',
    required: false,
  })
  strava: string;

  @ApiProperty({
    example: 'https://www.komoot.com/tour/12345678',
    description: 'Komoot route URL',
    required: false,
  })
  komoot: string;

  @ApiProperty({
    example: 'https://zenhuzaini.com/blog/my-ride',
    description: 'Other external link',
    required: false,
  })
  otherURL: string;
}

export class StoryBookResponseDto {
  @ApiProperty({ example: 'Me & My Bike(s)' })
  name: string;

  @ApiProperty({ example: '', description: 'Story content' })
  story: string;

  @ApiProperty({ type: [String], example: [] })
  photoUrls: string[];

  @ApiProperty({ example: '' })
  headerPhoto: string;

  @ApiProperty({ example: '' })
  lat: string;

  @ApiProperty({ example: '' })
  long: string;

  @ApiProperty({ example: '' })
  location: string;

  @ApiProperty({ example: 6 })
  totallike: number;

  @ApiProperty({ example: 1 })
  totalview: number;

  @ApiProperty({ example: '' })
  youtube: string;

  @ApiProperty({ example: '' })
  instagram: string;

  @ApiProperty({ example: '' })
  strava: string;

  @ApiProperty({ example: '' })
  komoot: string;

  @ApiProperty({ example: '' })
  otherURL: string;
}

// Update
export class UpdateStoryBookDto extends PartialType(CreateStoryBookDto) {
  @ApiProperty({
    description: 'The Notion page ID to update',
    example: '2a3a9449-e267-806e-aeca-d0f498b456de',
  })
  pageId: string;
}
