import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
	let service: ItemsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ItemsService],
		}).compile();

		service = module.get<ItemsService>(ItemsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create and return an item', () => {
			const dto = { name: 'Widget', description: 'A widget', price: 9.99 };
			const item = service.create(dto);
			expect(item.id).toBeDefined();
			expect(item.name).toBe('Widget');
			expect(item.createdAt).toBeInstanceOf(Date);
		});
	});

	describe('findAll', () => {
		it('should return an array of items', () => {
			service.create({ name: 'Item A' });
			service.create({ name: 'Item B' });
			expect(service.findAll()).toHaveLength(2);
		});
	});

	describe('findOne', () => {
		it('should return the item if found', () => {
			const created = service.create({ name: 'Widget' });
			const found = service.findOne(created.id);
			expect(found.id).toBe(created.id);
		});

		it('should throw NotFoundException if not found', () => {
			expect(() => service.findOne('non-existent-id')).toThrow(NotFoundException);
		});
	});

	describe('update', () => {
		it('should update and return the item', () => {
			const created = service.create({ name: 'Widget' });
			const updated = service.update(created.id, { name: 'Updated Widget' });
			expect(updated.name).toBe('Updated Widget');
			expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(created.updatedAt.getTime());
		});

		it('should throw NotFoundException for unknown id', () => {
			expect(() => service.update('bad-id', { name: 'X' })).toThrow(NotFoundException);
		});
	});

	describe('remove', () => {
		it('should remove the item', () => {
			const created = service.create({ name: 'Widget' });
			service.remove(created.id);
			expect(service.findAll()).toHaveLength(0);
		});

		it('should throw NotFoundException for unknown id', () => {
			expect(() => service.remove('bad-id')).toThrow(NotFoundException);
		});
	});
});
