import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosService } from './axios/axios.service';

@Injectable()
export class ApiKeyAuthService {
  constructor(private readonly axiosService: AxiosService) {}

  async validateApiKey(apiKey: string): Promise<any> {
    try {
      const user = await this.axiosService.get(
        `http://localhost:3000/v1/api/subscriptions/sub?apiKey=${apiKey}`,
      );
      return user;
    } catch (error) {
      throw new NotFoundException(`Api key ${apiKey} not found`);
    }
  }
}
