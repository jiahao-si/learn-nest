import { Injectable } from '@nestjs/common';
const ClickHouse = require('@apla/clickhouse');

// TODO: 运行时补齐
const clickhouse = new ClickHouse({
  host: '',
  port: 443,
  user: '',
  password: '',
  protocol: 'https:',
  queryOptions: {
    // profile: "web",
    database: '',
  },
});

@Injectable()
export class ClickhouseService {
  private chClient: any;

  constructor() {
    this.chClient = clickhouse;
    clickhouse.query(
      'SELECT item_id,approve_status  FROM dwd_item__ads_daily_stat__di LIMIT 10',
      (data) => {
        console.log(data);
      },
    );
  }

  public getClient(): any {
    return this.chClient;
  }
}
