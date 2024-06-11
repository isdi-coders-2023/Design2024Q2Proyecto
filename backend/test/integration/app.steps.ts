import { After, Before } from '@cucumber/cucumber';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { World } from './World';
import { UserInMemoryRepository } from './user/user.inmemory.repository';
import { PrismaService } from '@src/database/prisma-service/prisma-service.service';
import { UserPrismaRepository } from '@src/users/infrastructure/user.prisma.repository';

Before({ timeout: 10 * 1000 }, async function (this: World) {
    const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
    })
        .overrideProvider('UserRepository')
        .useClass(UserInMemoryRepository)
        .overrideProvider(UserPrismaRepository)
        .useValue(null)
        .overrideProvider(PrismaService)
        .useValue(null)
        .compile();

    this.app = moduleFixture.createNestApplication();
    this.app.setGlobalPrefix(`api`);
    this.app.useLogger(false);

    await this.app.init();
});

After(async function (this: World) {
    await this.app?.close();
});
