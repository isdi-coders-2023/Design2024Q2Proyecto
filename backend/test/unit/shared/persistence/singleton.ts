import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

import { PrismaService } from '@src/database/prisma-service/prisma-service.service';
import prisma from './client';

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaService>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaService>;
