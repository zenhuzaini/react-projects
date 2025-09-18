export type BaseProp = {
	id?: string;
};

export type PropEntity<T> = {
	[K in keyof T]: T[K];
} & BaseProp;

export type ReconciliationFile = {
	fileName: string;
	fileType: string;
	dateUploaded: string;
	description: string;
};

export type Reconsiliation = PropEntity<{
	projectName?: string;
	version?: string;
	createdOn: string;
	lastModified: string;
	teamId: string;
	bio: string;
	fileInfo: [ReconciliationFile];
}>;
