import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MockService {
  async getUserByApiKey(apiKey: string): Promise<any> {
    const mockUsers = [
      {
        id: '2',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '1987654321',
        role: 'company',
        managerName: 'Jane Doe',
        managerEmail: 'jane.doe@example.com',
        managerPhone: '+1122334455',
        subscriptions: [
          {
            apiKey: 'xyz7890abcdef',
            seniority: 'Junior',
            technology: 'Java',
          },
        ],
      },
      {
        id: '1',
        name: 'Steve Smith',
        email: 'steve@example.com',
        phone: '3524154863',
        role: 'company',
        managerName: 'Jane Doe',
        managerEmail: 'jane.doe@example.com',
        managerPhone: '+1122334455',
        subscriptions: [
          {
            apiKey: 'xyz7890abcde2',
            seniority: 'Junior',
            technology: 'JavaScript',
          },
        ],
      },
    ];

    const user = mockUsers.find(user => user.subscriptions.some(sub => sub.apiKey === apiKey));
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const subscription = user.subscriptions.find(sub => sub.apiKey === apiKey);
    return subscription;
  }
}

