import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyAuthController } from '../controllers/apikey.controller';
import { ApiKeyAuthService } from '../services/apikey.service';
import { AuthenticationApikeyDto } from '../dtos/dtos-apikey';

describe('ApiKeyAuthController', () => {
  let controller: ApiKeyAuthController;
  let service: ApiKeyAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiKeyAuthController],
      providers: [
        {
          provide: ApiKeyAuthService,
          useValue: {
            startByApiKey: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ApiKeyAuthController>(ApiKeyAuthController);
    service = module.get<ApiKeyAuthService>(ApiKeyAuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('validateApiKey', () => {
    it('should return a valid API key message', async () => {
      const result = { isValid: true };
      const apiKey = 'xyz7890abcde2';
      const apikeyDto: AuthenticationApikeyDto = { apiKey };

      jest.spyOn(service, 'startByApiKey').mockResolvedValue(result);

      expect(await controller.validateApiKey(apikeyDto)).toEqual({
        message: 'API Key is valid',
        data: result,
      });
    });

    it('should return an invalid API key message', async () => {
      const result = null;
      const apiKey = 'invalidKey';
      const apikeyDto: AuthenticationApikeyDto = { apiKey };

      jest.spyOn(service, 'startByApiKey').mockResolvedValue(result);

      expect(await controller.validateApiKey(apikeyDto)).toEqual({
        message: 'API Key is invalid',
      });
    });
  });
});
