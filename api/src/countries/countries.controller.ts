import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { PaginationDto } from './dto/pagination.dto';
import { Country } from './entities/country.entity';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
	constructor(private readonly countriesService: CountriesService) { }

	@Get()
	@ApiOperation({ summary: 'Get all countries (paginated)' })
	@ApiQuery({ name: 'page', required: false, example: 1 })
	@ApiQuery({ name: 'limit', required: false, example: 20 })
	@ApiResponse({
		status: 200,
		description: 'Paginated list of countries.',
		schema: {
			example: {
				data: [{ code: 'CA', name: 'Canada', continent: 'North America', region: 'Northern America' }],
				meta: { total: 239, page: 1, limit: 20, totalPages: 12 },
			},
		},
	})
	findAll(@Query() paginationDto: PaginationDto) {
		return this.countriesService.findAll(paginationDto);
	}

	@Get(':code')
	@ApiOperation({ summary: 'Get a single country by code' })
	@ApiParam({ name: 'code', example: 'CA', description: 'ISO country code' })
	@ApiResponse({ status: 200, description: 'The requested country.', type: Country })
	@ApiResponse({ status: 404, description: 'Country not found.' })
	findOne(@Param('code') code: string) {
		return this.countriesService.findOne(code);
	}
}