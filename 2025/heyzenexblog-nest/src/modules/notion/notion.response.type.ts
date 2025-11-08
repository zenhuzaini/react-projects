export interface NotionUserListResponse {
  object: 'list';
  results: NotionUser[];
  next_cursor: string | null;
  has_more: boolean;
  type: 'user';
  user: Record<string, never>;
  request_id: string;
}

export interface NotionUser {
  object: 'user';
  id: string;
  name: string;
  avatar_url: string | null;
  type: 'person' | 'bot';
  person?: NotionPerson;
  bot?: NotionBot;
}

export interface NotionPerson {
  email: string;
}

export interface NotionBot {
  owner: NotionBotOwner;
  workspace_name: string;
  workspace_id: string;
  workspace_limits: {
    max_file_upload_size_in_bytes: number;
  };
}

export interface NotionBotOwner {
  type: 'workspace' | 'user';
  workspace?: boolean;
  user?: {
    id: string;
    name?: string;
  };
}

// Data source
export interface NotionDataSourceResponse {
  object: 'list';
  results: NotionDataSourcePage[];
  next_cursor: string | null;
  has_more: boolean;
  type: 'page_or_data_source';
  page_or_data_source: Record<string, never>;
  request_id: string;
}

export interface NotionDataSourcePage {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUserRef;
  last_edited_by: NotionUserRef;
  cover: string | null;
  icon: string | null;
  parent: NotionParent;
  archived: boolean;
  in_trash: boolean;
  is_locked: boolean;
  properties: NotionPageProperties;
  url: string;
  public_url: string | null;
}

export interface NotionUserRef {
  object: 'user';
  id: string;
}

export interface NotionParent {
  type: 'data_source_id';
  data_source_id: string;
  database_id: string;
}

export interface NotionPageProperties {
  id: NotionRichTextProperty;
  'modified at': NotionLastEditedTimeProperty;
  story: NotionRichTextProperty;
  photoUrls: NotionMultiSelectProperty;
  'created at': NotionCreatedTimeProperty;
  Name: NotionTitleProperty;
}

export interface NotionRichTextProperty {
  id: string;
  type: 'rich_text';
  rich_text: Array<{
    type: 'text';
    text: {
      content: string;
      link: string | null;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: string | null;
  }>;
}

export interface NotionLastEditedTimeProperty {
  id: string;
  type: 'last_edited_time';
  last_edited_time: string;
}

export interface NotionCreatedTimeProperty {
  id: string;
  type: 'created_time';
  created_time: string;
}

export interface NotionMultiSelectProperty {
  id: string;
  type: 'multi_select';
  multi_select: Array<any>;
}

export interface NotionTitleProperty {
  id: string;
  type: 'title';
  title: Array<{
    type: 'text';
    text: {
      content: string;
      link: string | null;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: string | null;
  }>;
}
