import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosService } from 'src/modules/axios/axios.service';


@Injectable()
export class ApiKeyAuthService {
  constructor(private readonly axiosService: AxiosService) {}

  async startByApiKey(apikeyDto: string): Promise<any> {
    try {
      const user = await this.axiosService.get(
        `http://localhost:3000/v1/api/subscriptions/sub?apiKey=${apikeyDto}`,
      );

      const {
        subscriptions: [
          {
            technology: [{ name: technologyName }],
            level: [{ name: levelName }],
          },
        ],
      } = user;

      const tip = await this.axiosService.get(
        `http://localhost:3000/v1/api/mock-tips/tips?level=${levelName}&technology=${technologyName}`,
      );
      return { tip: tip };
    } catch (error) {
      throw new NotFoundException(`Api key ${apikeyDto} not found`);
    }
  }
}
