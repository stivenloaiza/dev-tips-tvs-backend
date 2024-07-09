import {  HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  async get(url: string, config?: any) {
    const response = await firstValueFrom(this.httpService.get(url, config));
    return response.data;
  }

}