import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Enable CORS for React frontend on port 3000 / 5173 / etc.
	app.enableCors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	});

	// Global validation pipe — strips unknown fields and validates DTOs
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	// Global API prefix (e.g. /api/v1/items)
	// app.setGlobalPrefix('api/v1');

	// Swagger
	const config = new DocumentBuilder()
		.setTitle('NestJS API')
		.setDescription('REST API with full CRUD and health check')
		.setVersion('1.0')
		.addTag('Items')
		.addTag('Health')
		.addTag('Countries')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document); // available at /docs

	const port = process.env.PORT ?? 3000

	await app.listen(port);
	console.log(`Application running on: http://localhost:${port}`);
	console.log(`Swagger docs at:        http://localhost:${port}/docs`);
}
bootstrap();
