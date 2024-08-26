import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'API is running',
      status: 200,
      timestamp: new Date().toISOString(),
    };
  }
}
