import { Module, DynamicModule } from '@nestjs/common';
import { OssOption, OssAsyncOption } from './oss.interface';
import { OssService } from './oss.service';
import { OssController } from './oss.controller';

@Module({})
export class OssModule {
  static register(option: OssOption): DynamicModule {
    return {
      module: OssModule,
      providers: [{ provide: 'OSS_OPTION', useValue: option }, OssService],
    };
  }

  static forRootAsync(options: OssAsyncOption): DynamicModule {
    return {
      module: OssModule,
      imports: options.imports,
      controllers: [OssController],
      providers: [
        OssService,
        {
          provide: 'OSS_OPTION',
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ],
      exports: [OssService],
    };
  }
}
