import { Controller, Get } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { OssService } from './oss.service';
import { v4 as uuidv4 } from 'uuid';
@Controller('oss')
export class OssController {
  private ossService: OssService;

  constructor(ossService: OssService) {
    this.ossService = ossService;
  }

  /**
   * 流式读取，将可读流传给 sdk ，便可流式上传
   * @returns
   */
  @Get('test_upload')
  testUpload(): any {
    const readStream = createReadStream(join(__dirname, 'test.csv'));
    let taskResult = null;

    /**
     * 1. s3 同名覆盖
     * 2. 300M 的文件上传大概1min
     */
    this.ossService
      .putObject({
        bucket: 'AdsAdminBFF',
        name: 'test2.csv',
        body: readStream,
        expires: new Date(3000),
      })
      .then((res) => {
        console.log(
          '🚀 ~ file: oss.controller.ts ~ line 25 ~ OssController ~ testUpload ~ res',
          res,
        );
        taskResult = res;
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: oss.controller.ts ~ line 34 ~ OssController ~ testUpload ~ err',
          err,
        );
        taskResult = 'error';
      });

    const taskId = `upload-task-${uuidv4({ offset: 8 })}`;

    return `already submit task, taskId: ${taskId}`;
  }
}
