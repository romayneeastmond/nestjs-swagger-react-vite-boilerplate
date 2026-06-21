import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
const request = require('supertest');
import { AppModule } from '../src/app.module';

describe('HealthController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();

		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				transform: true,
			}),
		);
		//app.setGlobalPrefix('api/v1');

		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('GET /health should return 200 and healthy status', () => {
		return request(app.getHttpServer())
			//.get('/api/v1/health')
			.get('/health')
			.expect(200)
			.expect({ status: 'healthy' });
	});
});