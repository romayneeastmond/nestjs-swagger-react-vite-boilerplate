import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiBody,
} from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
	constructor(private readonly itemsService: ItemsService) {

	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new item' })
	@ApiBody({ type: CreateItemDto })
	@ApiResponse({ status: 201, description: 'Item created successfully.', type: Item })
	@ApiResponse({ status: 400, description: 'Validation error.' })
	create(@Body() createItemDto: CreateItemDto): Item {
		return this.itemsService.create(createItemDto);
	}

	@Get()
	@ApiOperation({ summary: 'Retrieve all items' })
	@ApiResponse({ status: 200, description: 'List of all items.', type: [Item] })
	findAll(): Item[] {
		return this.itemsService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Retrieve a single item by ID' })
	@ApiParam({ name: 'id', description: 'UUID of the item' })
	@ApiResponse({ status: 200, description: 'The requested item.', type: Item })
	@ApiResponse({ status: 404, description: 'Item not found.' })
	findOne(@Param('id') id: string): Item {
		return this.itemsService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update an existing item by ID' })
	@ApiParam({ name: 'id', description: 'UUID of the item' })
	@ApiBody({ type: UpdateItemDto })
	@ApiResponse({ status: 200, description: 'Item updated successfully.', type: Item })
	@ApiResponse({ status: 400, description: 'Validation error.' })
	@ApiResponse({ status: 404, description: 'Item not found.' })
	update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Item {
		return this.itemsService.update(id, updateItemDto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete an item by ID' })
	@ApiParam({ name: 'id', description: 'UUID of the item' })
	@ApiResponse({ status: 204, description: 'Item deleted successfully.' })
	@ApiResponse({ status: 404, description: 'Item not found.' })
	remove(@Param('id') id: string): void {
		return this.itemsService.remove(id);
	}
}
