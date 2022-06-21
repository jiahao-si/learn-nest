import { Global, Module } from '@nestjs/common';
import { GlobalService } from './global.service';

/**
 * 全局模块
 * @Global()使模块成为全局作用域，
 * 其他模块不必再 import 就可以使用 exports 的 globalService
 * 全局模块可用于减少模板文件数量，但显式 imports 仍是模块api透明的最佳方式
 * 全局模块对 Test 创建的不起作用
 */
@Global()
@Module({
  providers: [GlobalService],
  exports: [GlobalService],
})
export class GlobalModule {}
