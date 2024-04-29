import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma-service/prisma-service.service';
import { User } from '@prisma/client';

@Injectable()
export class UserListService {
  constructor(private prisma: PrismaService) {}

  async users(params: { skip?: number; take?: number }): Promise<User[]> {
    const { skip, take } = params;

    return this.prisma.user.findMany({
      skip,
      take,
    });
  }
}
