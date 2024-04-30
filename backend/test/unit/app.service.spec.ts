import { AppService } from '../../src/app.service';

describe('AppService', () => {
  let service: AppService;
  beforeEach(async () => {
    service = new AppService();
  });

  describe('root', () => {
    it('should return from appService', () => {
      expect(service.isAlive()).toStrictEqual('OK');
    });
  });
});
