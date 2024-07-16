import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class MockService {
  async getSubByApiKey(apiKey: string): Promise<any> {
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
            levels: [
              {
                _id: {
                  $oid: '66845a35688ba50c93cf8bfb',
                },
                name: 'Junior',
              },
            ],
            technology: [
              {
                _id: {
                  $oid: '66854d83d09bd33eb9536dfd',
                },
                name: 'JavaScript',
              },
            ],
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
            levels: [
              {
                _id: {
                  $oid: '66845a35688ba50c93cf8bfb',
                },
                name: 'Junior',
              },
            ],
            technology: [
              {
                _id: {
                  $oid: '66854d83d09bd33eb9536dfd',
                },
                name: 'JavaScript',
              },
            ],
          },
        ],
      },
    ];

    const user = mockUsers.find((user) =>
      user.subscriptions.some((sub) => sub.apiKey === apiKey),
    );
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
