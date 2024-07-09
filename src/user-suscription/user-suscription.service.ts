import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

//TODO: Cambio de codigo para consumir con axios 

@Injectable()
export class UserSuscriptionService {
  private readonly users = [
    {
      apiKey: 'xyz7890abcdef',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '1987654321',
      role: 'company',
      managerName: 'Jane Doe',
      managerEmail: 'jane.doe@example.com',
      managerPhone: '+1122334455',
      subscriptions: [
        {
          seniority: "Junior",
          tecnology: "Java"
        }

      ],
    },
    {
      apiKey: 'xyz7890abcde2',
      name: 'Steve Smith',
      email: 'steve@example.com',
      phone: '3524154863',
      role: 'company',
      managerName: 'Jane Doe',
      managerEmail: 'jane.doe@example.com',
      managerPhone: '+1122334455',
      subscriptions: [
        {
          seniority: "Junior",
          tecnology: "Java"
        }

      ],
    },
  ];

  getUserSubscriptions(email: string) {
    const user = this.users.find(u => u.email === email);
    return user ? user.subscriptions : null;
  }

  getUserInfo(email: string) {
    const user = this.users.find(u => u.email === email);
    return user;
  }
}



