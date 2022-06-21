import { Module, DynamicModule } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
})
export class RedisModule {
  static forRoot(options): DynamicModule {
    /**
     * 根据配置动态获取一些 providers
     */
    // const providers = createRedisModuleProviders(options)
    const providers = [];

    /**
     * return 的对象会继承（而不是重写）装饰器静态声明的 module 配置
     */
    return {
      module: RedisModule,
      providers: providers,
      exports: providers,
    };
  }
}
