import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ItemsService {
	private readonly items: Map<string, Item> = new Map();

	create(createItemDto: CreateItemDto): Item {
		const item: Item = {
			id: randomUUID(),
			...createItemDto,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.items.set(item.id, item);
		return item;
	}

	findAll(): Item[] {
		return Array.from(this.items.values());
	}

	findOne(id: string): Item {
		const item = this.items.get(id);
		if (!item) {
			throw new NotFoundException(`Item with id "${id}" not found`);
		}
		return item;
	}

	update(id: string, updateItemDto: UpdateItemDto): Item {
		const existing = this.findOne(id);
		const updated: Item = {
			...existing,
			...updateItemDto,
			updatedAt: new Date(),
		};
		this.items.set(id, updated);
		return updated;
	}

	remove(id: string): void {
		this.findOne(id);
		this.items.delete(id);
	}
}
