import { Injectable } from '@nestjs/common';

@Injectable()
export class Cryptor {
  async generateHashSHA1(data: string) {
    const encrypt = await import('node:crypto');
    return encrypt.createHash('sha1').update(data).digest('hex');
  }
}
