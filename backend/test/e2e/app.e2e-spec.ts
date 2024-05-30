import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testingApi } from './utils/testingApp';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        app = await testingApi();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/isAlive')
            .expect(200)
            .expect('OK');
    });
});
