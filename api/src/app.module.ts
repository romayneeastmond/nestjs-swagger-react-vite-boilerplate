import { Module } from '@nestjs/common';
//import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { HealthModule } from './health/health.module';
import { CountriesModule } from './countries/countries.module';
//import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			autoLoadEntities: true,
			synchronize: false, // never true in production
		}),
		ItemsModule,
		HealthModule,
		CountriesModule
	],
	// providers: [
	// 	{
	// 		provide: APP_GUARD,
	// 		useClass: JwtAuthGuard,
	// 	},
	// ]
})
export class AppModule { }
