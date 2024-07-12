export interface VerificationCodeGenerated {
  email: string;
  used: boolean;
  code: string;
  createdAt: Date;
  expiredAt: Date;
}
