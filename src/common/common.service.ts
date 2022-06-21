import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  commonReturn(): string {
    return 'common return ';
  }
}
