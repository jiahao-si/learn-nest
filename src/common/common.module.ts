import { Module } from '@nestjs/common';
import { CommonService } from './common.service';

@Module({
  providers: [CommonService],
  /**
   * exports 中的提供者，只要导入 imports 了 common module ，便可以共享 commonService 实例
   */
  exports: [CommonService],
})
export class CommonModule {}
