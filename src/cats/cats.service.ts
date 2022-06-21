import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  sayName(): string {
    console.log('i am cat');
    return 'i am cat';
  }
}
