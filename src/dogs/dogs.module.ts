import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { CatsService } from '../cats/cats.service';
import { CommonModule } from '../common/common.module';

@Module({
  // 引入  commonModule 后，里面 exports 的实例都可以被依赖注入
  imports: [CommonModule],
  providers: [DogsService, CatsService],
  controllers: [DogsController],
})
export class DogsModule {}
