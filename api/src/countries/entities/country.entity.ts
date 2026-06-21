import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('country')
export class Country {
	@ApiProperty({ example: 'CA' })
	@PrimaryColumn({ name: 'Code' })
	code: string;

	@ApiProperty({ example: 'Canada' })
	@Column({ name: 'Name' })
	name: string;

	@ApiProperty({ example: 'North America' })
	@Column({ name: 'Continent' })
	continent: string;

	@ApiProperty({ example: 'Northern America' })
	@Column({ name: 'Region' })
	region: string;
}