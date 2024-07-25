import { Test, TestingModule } from '@nestjs/testing';
import { QrCodeController } from './qr-code.controller';
import { QrCodeService } from '../services/qr-code.service';
import { CodeDto, EmailDto } from '../dtos';

describe('QrCodeController', () => {
  let qrCodeController: QrCodeController;
  let qrCodeService: QrCodeService;

  const mockQrCodeService = {
    generateQrCode: jest.fn().mockResolvedValue({ code: 'mockCode', url: 'mockUrl' }),
    verifyQrCode: jest.fn().mockResolvedValue(true),
    checkAuthentication: jest.fn().mockResolvedValue(true),
    userExists: jest.fn().mockResolvedValue(true),
    generateVerificationCode: jest.fn().mockResolvedValue({ code: 'mockCode', email: 'mockEmail', used: false, createdAt: new Date(), expiredAt: new Date() }),
    sendEmail: jest.fn().mockResolvedValue({ success: true }),
    isCodeMatch: jest.fn().mockResolvedValue({ isCodeMatch: true, email: 'mockEmail' }),
    getUserSubscriptions: jest.fn().mockResolvedValue({ name: 'mockName', subscriptions: [], tip: 'mockTip' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QrCodeController],
      providers: [
        { provide: QrCodeService, useValue: mockQrCodeService },
      ],
    }).compile();

    qrCodeController = module.get<QrCodeController>(QrCodeController);
    qrCodeService = module.get<QrCodeService>(QrCodeService);
  });

  it('should be defined', () => {
    expect(qrCodeController).toBeDefined();
  });

  describe('generateQr', () => {
    it('should generate a QR code', async () => {
      const result = await qrCodeController.generateQr();
      expect(result).toEqual({ code: 'mockCode', url: 'mockUrl' });
      expect(qrCodeService.generateQrCode).toHaveBeenCalled();
    });
  });

  describe('verifyQr', () => {
    it('should verify a QR code', async () => {
      const result = await qrCodeController.verifyQr('mockCode');
      expect(result).toEqual({ verified: true });
      expect(qrCodeService.verifyQrCode).toHaveBeenCalledWith('mockCode');
    });
  });

  describe('checkAuthentication', () => {
    it('should check authentication for a QR code', async () => {
      const result = await qrCodeController.checkAuthentication('mockCode');
      expect(result).toEqual({ authenticated: true });
      expect(qrCodeService.checkAuthentication).toHaveBeenCalledWith('mockCode');
    });
  });

  describe('userExists', () => {
    it('should check if a user exists by email', async () => {
      const result = await qrCodeController.userExists('mockEmail');
      expect(result).toBe(true);
      expect(qrCodeService.userExists).toHaveBeenCalledWith('mockEmail');
    });
  });

  describe('generateVerificationCode', () => {
    it('should generate a verification code', async () => {
      const result = await qrCodeController.generateVerificationCode('mockEmail');
      expect(result).toEqual({ code: 'mockCode', email: 'mockEmail', used: false, createdAt: expect.any(Date), expiredAt: expect.any(Date) });
      expect(qrCodeService.generateVerificationCode).toHaveBeenCalledWith('mockEmail');
    });
  });

  describe('sendVerificationCode', () => {
    it('should send a verification code via email', async () => {
      const result = await qrCodeController.sendVerificationCode({ email: 'mockEmail' } as EmailDto);
      expect(result).toEqual({ success: true });
      expect(qrCodeService.sendEmail).toHaveBeenCalledWith('mockEmail');
    });
  });

  describe('matchVerificationCode', () => {
    it('should match a verification code', async () => {
      const result = await qrCodeController.matchVerificationCode('mockCode');
      expect(result).toEqual({ isCodeMatch: true, email: 'mockEmail' });
      expect(qrCodeService.isCodeMatch).toHaveBeenCalledWith('mockcode');
    });
  });

  describe('getUserSubscriptionsByCode', () => {
    it('should get user subscriptions by code', async () => {
      const result = await qrCodeController.getUserSubscriptionsByCode({ code: 'mockCode' } as CodeDto);
      expect(result).toEqual({ name: 'mockName', subscriptions: [], tip: 'mockTip' });
      expect(qrCodeService.getUserSubscriptions).toHaveBeenCalledWith('mockcode');
    });
  });
});
