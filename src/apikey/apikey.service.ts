import { Injectable } from '@nestjs/common';
import { AxiosService } from './axios/axios.service';

@Injectable()
export class ApiKeyAuthService {
  constructor(private readonly axiosService: AxiosService) {}

  async validateApiKey(apiKey: string): Promise<any> {
    const user = await this.axiosService.get(`http://microservice-users/users?apiKey=${apiKey}`);
    return user;
  }
}

