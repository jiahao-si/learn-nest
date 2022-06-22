import { Controller, Get } from '@nestjs/common';
import { ClickhouseService } from './clickhouse.service';
import { generate, parse, transform, stringify } from 'csv';
import { OssService } from '../oss/oss.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('ch')
export class ClickhouseController {
  private chClient: any;
  private ossService: any;
  constructor(chService: ClickhouseService, ossService: OssService) {
    this.chClient = chService.getClient();
    this.ossService = ossService;
  }

  @Get('test_ch')
  testCH(): any {
    // 得到 clickhouse 可读流
    const chReadStream = this.chClient.query(
      'SELECT item_id,approve_status,gmv,biz_type  FROM dwd_item__ads_daily_stat__di LIMIT 10 ',
    );
    let rows = [];
    chReadStream.on('data', (row) => {
      // console.log('row is: ', row);
      rows.push(row);
    });

    chReadStream.on('error', (err) => {
      /* handler error */
    });

    chReadStream.on('end', () => {
      console.log(
        rows.length,
        chReadStream.supplemental.rows,
        chReadStream.supplemental.rows_before_limit_at_least, // how many rows in result are set without windowing
        rows,
      );
    });

    // ch可读流 pipe 到 csv 双工流，返回一个流
    const csvStream = chReadStream.pipe(
      //转换成 csv
      stringify({
        header: true,
        columns: {
          year: 'birthYear',
          phone: 'phone',
        },
      }),
    );
    // .pipe(process.stdout);

    let taskResult = null;
    this.ossService
      .putObject({
        bucket: 'AdsAdminBFF',
        name: 'test4.csv',
        // 将 csv 流传给 s3 sdk 进行上传
        body: csvStream,
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
