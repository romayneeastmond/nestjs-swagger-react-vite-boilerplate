import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class CountriesService {
	constructor(
		@InjectRepository(Country)
		private readonly countryRepository: Repository<Country>,
	) { }

	async findAll(paginationDto: PaginationDto) {
		const { page, limit } = paginationDto;
		const skip = (page - 1) * limit;

		const [data, total] = await this.countryRepository.findAndCount({
			skip,
			take: limit,
			order: { name: 'ASC' },
		});

		return {
			data,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	async findOne(code: string) {
		const country = await this.countryRepository.findOne({
			where: { code },
		});
		if (!country) {
			throw new NotFoundException(`Country with code "${code}" not found`);
		}
		return country;
	}
}