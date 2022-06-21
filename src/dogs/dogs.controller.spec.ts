import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { CatsService } from '../cats/cats.service';
import { CommonModule } from '../common/common.module';
import { GlobalService } from '../global/global.service';

describe('DogsController', () => {
  let controller: DogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [DogsController],
      providers: [CatsService, GlobalService],
    }).compile();

    controller = module.get<DogsController>(DogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
