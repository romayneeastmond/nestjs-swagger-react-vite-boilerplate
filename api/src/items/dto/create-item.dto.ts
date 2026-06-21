import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateItemDto {
	@ApiProperty({ example: 'Widget', description: 'Name of the item' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiPropertyOptional({ example: 'A very useful widget', description: 'Optional description' })
	@IsString()
	@IsOptional()
	description?: string;

	@ApiPropertyOptional({ example: 9.99, description: 'Price in USD' })
	@IsNumber()
	@IsOptional()
	price?: number;
}
