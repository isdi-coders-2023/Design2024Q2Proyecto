import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testingApi } from './utils/testingApp';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await testingApi();
  });

  it('/auth/login (POST) Success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'alice@prisma.io', password: 'IamAlice' })
      .expect(200);
    expect(response.body.access_token).toStrictEqual(expect.any(String));
  });
  it('/auth/login (POST) Unauthorized', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'unknown@user.io', password: 'fake-password' })
      .expect(401);
    expect(response.body).toStrictEqual({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });
});
