import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Item {
	@ApiProperty({ example: '1', description: 'Unique identifier' })
	id: string;

	@ApiProperty({ example: 'Widget' })
	name: string;

	@ApiPropertyOptional({ example: 'A very useful widget' })
	description?: string;

	@ApiPropertyOptional({ example: 9.99 })
	price?: number;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
	createdAt: Date;

	@ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
	updatedAt: Date;
}
