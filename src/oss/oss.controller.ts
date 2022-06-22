import { Controller, Get } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { OssService } from './oss.service';
import { v4 as uuidv4 } from 'uuid';
import { generate, parse, transform, stringify } from 'csv';

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
  testUpload(): string {
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

  @Get('test_csv')
  testCSV(): any {
    // generate({
    //   columns: ['int', 'bool'],
    //   delimiter: '|',
    //   length: 5,
    // }) // Parse the records
    // .pipe(
    //   parse({
    //     delimiter: '|',
    //   }),
    // )
    // Transform each value into uppercase
    // .pipe(
    //   transform(function (record) {
    //     return record.map(function (value) {
    //       return value.toUpperCase();
    //     });
    //   }),
    // )
    // Convert the object into a stream
    // .pipe(
    //   stringify({
    //     quoted: true,
    //   }),
    // )
    // Print the CSV stream to stdout
    // .pipe(process.stdout);

    generate({
      length: 5,
      objectMode: true,
      seed: 1,
      // headers: 2,
      columns: 2,
      duration: 400,
    })
      .pipe(
        stringify({
          header: true,
          columns: {
            year: 'birthYear',
            phone: 'phone',
          },
        }),
      )
      .pipe(process.stdout);
    return;
  }
}
