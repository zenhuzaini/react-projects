export type BaseProp = {
	id?: string;
};

export type PropEntity<T> = {
	[K in keyof T]: T[K];
} & BaseProp;
