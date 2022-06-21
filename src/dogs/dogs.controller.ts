import { Controller, Get } from '@nestjs/common';
import { CatsService } from '../cats/cats.service';
import { CommonService } from '../common/common.service';
import { GlobalService } from '../global/global.service';

@Controller('dogs')
export class DogsController {
  private catsService: CatsService;
  private commonService: CommonService;
  private globalService: GlobalService;

  constructor(
    catsService: CatsService,
    commonService: CommonService,
    globalService: GlobalService,
  ) {
    this.catsService = catsService;
    this.commonService = commonService;
    this.globalService = globalService;
  }

  @Get('say_cats')
  sayCats(): string {
    return this.catsService.sayName();
  }

  @Get('common_return')
  commonReturn(): string {
    return this.commonService.commonReturn();
  }

  @Get('global_return')
  globalReturn(): string {
    return this.globalService.globalReturn();
  }
}
