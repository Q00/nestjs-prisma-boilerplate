import { GoogleIdToken } from './dto/google.dto';
import { Injectable } from '@nestjs/common';
import JWT from 'jwt-decode';

@Injectable()
export class GoogleProvider {
  constructor() {}

  async getClientId(accessToken: string) {
    //email 사용
    const idToken = JWT(accessToken) as GoogleIdToken;
    const email = idToken.email;
    return email;
  }
}
