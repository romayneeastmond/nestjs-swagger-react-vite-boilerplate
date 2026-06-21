import { apiService } from './api.service';
import type { Item, CreateItemDto, UpdateItemDto } from '../types/item.types';

export const itemsService = {
	getAll: () =>
		apiService.get<Item[]>('/items'),

	getOne: (id: string) =>
		apiService.get<Item>(`/items/${id}`),

	create: (body: CreateItemDto) =>
		apiService.post<Item>('/items', body),

	update: (id: string, body: UpdateItemDto) =>
		apiService.put<Item>(`/items/${id}`, body),

	delete: (id: string) =>
		apiService.delete<void>(`/items/${id}`),
};