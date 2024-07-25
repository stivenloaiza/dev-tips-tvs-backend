import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiKeyAuthService {

  async startByApiKey(apikey: string): Promise<any> {
    try {
      const urlUser = process.env.USER_URL
      const response = await axios.get(`${urlUser}/v1/api/tvs/getApiKey/${apikey}`);
      
      const user = response.data;
      
      const {
        level,
        technology,
        userId: { name }
      } = user;
      const urlTips = process.env.TIPS_URL

      const tipResponse = await axios.get(`${urlTips}/tips/random?limit=1&level=${level}&technology=${technology}`, {
        headers:{
          "x-api-key": process.env.TVS_APIKEY
        }
      }, );
           
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