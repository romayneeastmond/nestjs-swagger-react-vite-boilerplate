export interface Item {
	id: string;
	name: string;
	description?: string;
	price?: number;
	createdAt: string;
	updatedAt: string;
}

export interface CreateItemDto {
	name: string;
	description?: string;
	price?: number;
}

export interface UpdateItemDto {
	name?: string;
	description?: string;
	price?: number;
}