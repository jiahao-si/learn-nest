import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { CommonModule } from './common/common.module';
import { GlobalModule } from './global/global.module';
import { RedisModule } from './redis/redis.module';
import { ClickhouseModule } from './clickhouse/clickhouse.module';
import { OssModule } from './oss/oss.module';

@Module({
  imports: [CatsModule, DogsModule, CommonModule, GlobalModule, RedisModule, ClickhouseModule, OssModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
