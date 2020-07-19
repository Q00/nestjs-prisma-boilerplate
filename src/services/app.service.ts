import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello!';
  }

  getHelloName(name: string): string {
    return `Hello ${name}!`;
  }
}
