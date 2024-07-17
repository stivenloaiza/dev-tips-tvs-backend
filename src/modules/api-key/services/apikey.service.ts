import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class ApiKeyAuthService {

  async startByApiKey(apikey: string): Promise<any> {
    try {
      const response = await axios.get(`http://localhost:3001/v1/api/tvs/getApiKey/${apikey}`);
      const user = response.data;

      const {
        level,
        technology,
        userId: { name }
      } = user;

      const tipResponse = await axios.get(`http://localhost:3000/api/v1/mock-tips/tips`, {
        params: {
          level,
          technology
        }
      });

      const tip = tipResponse.data;
      return { tip, name };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`API key ${apikey} not found`);
      } else {
        throw new Error(`Error fetching data: ${error.message}`);
      }
    }
  }
}