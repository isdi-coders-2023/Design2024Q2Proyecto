import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { AuthGuard } from '@src/auth/auth.guard';
import { PrismaService } from '@src/database/prisma-service/prisma-service.service';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

class TestPrismaService extends PrismaService {
    constructor() {
        super({
            datasourceUrl: process.env.TEST_DATABASE_URL,
        });
    }
}
const canActivateMock = (context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = 'alice@prisma.io';
    return true;
};
export const testingApi = async (): Promise<INestApplication> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    })
        .overrideProvider(PrismaService)
        .useClass(TestPrismaService)
        .overrideGuard(AuthGuard)
        .useValue(canActivateMock)
        .compile();

    const app = moduleFixture.createNestApplication();
    await app.init();

    await promisify(exec)('npx prisma migrate reset --force');
    await promisify(exec)('npx prisma db seed');
    return app;
};
