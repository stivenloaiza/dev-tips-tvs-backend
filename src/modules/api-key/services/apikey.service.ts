import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosService } from 'src/modules/axios/axios.service';


@Injectable()
export class ApiKeyAuthService {
  constructor(private readonly axiosService: AxiosService) { }

  async startByApiKey(apikey: string): Promise<any> {
    try {
      const user = await this.axiosService.get(
        ` http://localhost:3001/v1/api/tvs/getApiKey/${apikey} `
      );
      const {
        level,
        technology,
        userId: { name }
      } = user;
        const tip = await this.axiosService.get(
        `http://localhost:3000/api/v1/mock-tips/tips?level=${level}&technology=${technology}`,
      );  
      return {tip: tip, name }
      // { /*tip: tip,*/ user: name,};
    } catch (error) {
      throw new NotFoundException(`Api key ${apikey} not found`);
    }
  }
}
