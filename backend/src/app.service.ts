import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isAlive(): 'OK' {
    return 'OK';
  }
}
