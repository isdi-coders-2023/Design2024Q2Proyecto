import { ExecutionContext } from '@nestjs/common';

export const canActivateMock = (context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  req.user = 'alice@prisma.io';
  return true;
};
