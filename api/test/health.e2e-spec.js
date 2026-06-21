"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require('supertest');
const app_module_1 = require("../src/app.module");
describe('HealthController (e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it('GET /health should return 200 and healthy status', () => {
        return request(app.getHttpServer())
            .get('/health')
            .expect(200)
            .expect({ status: 'healthy' });
    });
});
//# sourceMappingURL=health.e2e-spec.js.map