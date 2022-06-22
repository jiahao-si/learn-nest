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
  }

  public getClient(): any {
    return this.chClient;
  }
}
