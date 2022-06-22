/** @format */

import { Injectable, Inject } from '@nestjs/common';
import {
  OssOption,
  BucketInfo,
  PutObjectParams,
  PutObjectRes,
  getObjectParams,
  getObjectRes,
  ObjectBody,
} from './oss.interface';
import { S3, Credentials, Endpoint } from 'aws-sdk';

@Injectable()
export class OssService {
  public s3Client: S3;
  constructor(@Inject('OSS_OPTION') private ossOption: OssOption) {
    this.s3Client = new S3({
      credentials: new Credentials({
        accessKeyId: ossOption.accessKey,
        secretAccessKey: ossOption.secretKey,
        sessionToken: '',
      }),
      endpoint: new Endpoint(ossOption.host),
      region: ossOption.region || 'default',
      s3ForcePathStyle: true,
      sslEnabled: false,
    });
  }

  public async getBucketList(): Promise<BucketInfo[]> {
    return new Promise((resolve, reject) => {
      this.s3Client.listBuckets((error, bucketList) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(
          bucketList.Buckets?.map((item) => ({
            name: item.Name as string,
            creationDate: item.CreationDate?.getTime(),
          })) || [],
        );
      });
    });
  }

  /**
   * 上传文件，大小小于5G，expires为过期日期
   * @param {String} params 需要说的句子
   */
  public async putObject(params: PutObjectParams): Promise<PutObjectRes> {
    return new Promise((resolve, reject) => {
      // s3.upload method： Uploads an arbitrarily sized buffer, blob, or stream, using intelligent concurrent handling of parts if the payload is large enough.
      // this.s3Client.putObject(
      this.s3Client.upload(
        {
          Bucket: params.bucket,
          Key: params.name,
          Body: params.body,
          Expires: params.expires,
        },
        (error, data) => {
          if (error) {
            reject(error);
            return;
          }
          resolve({ name: params.name, etag: data.ETag });
        },
      );
    });
  }

  public async getObject(params: getObjectParams): Promise<getObjectRes> {
    return new Promise((resolve, reject) => {
      this.s3Client.getObject(
        {
          Bucket: params.bucket,
          Key: params.name,
        },
        (error, data) => {
          if (error) {
            reject(error);
            return;
          }
          resolve({
            body: data.Body as ObjectBody,
            contentLength: data.ContentLength,
            etag: data.ETag,
          });
        },
      );
    });
  }
}
