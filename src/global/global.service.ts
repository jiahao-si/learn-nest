import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  globalReturn(): string {
    return 'global return';
  }
}
