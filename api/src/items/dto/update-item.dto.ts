import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
	@ApiPropertyOptional({ example: 'Updated Widget' })
	@IsString()
	@IsOptional()
	name?: string;

	@ApiPropertyOptional({ example: 'An updated description' })
	@IsString()
	@IsOptional()
	description?: string;

	@ApiPropertyOptional({ example: 14.99 })
	@IsNumber()
	@IsOptional()
	price?: number;
}
