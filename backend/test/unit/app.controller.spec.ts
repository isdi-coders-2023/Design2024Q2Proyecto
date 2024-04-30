import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';

describe('AppController', () => {
  let appController: AppController;

  const appService: AppService = {
    isAlive: jest.fn(),
  };

  const serviceSpy: jest.SpyInstance = jest.spyOn(appService, 'isAlive');

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(() => {
    serviceSpy.mockClear();
  });

  describe('root', () => {
    it('should return from appService', () => {
      serviceSpy.mockReturnValue('Hello test');
      expect(appController.isAlive()).toStrictEqual('Hello test');
    });

    it('should collect error from appService', () => {
      serviceSpy.mockRejectedValue(new Error('Unexpected error'));
      expect(appController.isAlive()).rejects.toThrow('Unexpected error');
    });
  });
});
