import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testingApi } from './utils/testingApp';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await testingApi();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/')
      .expect(200)
      .expect([
        {
          id: 1,
          email: 'alice@prisma.io',
          name: 'Alice',
          password: 'IamAlice',
        },
        {
          id: 2,
          email: 'bob@prisma.io',
          name: 'Bob',
          password: 'IamBob',
        },
      ]);
  });
});
