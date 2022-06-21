/** @format */
import { Readable, Writable } from 'stream';
import { ModuleMetadata } from '@nestjs/common/interfaces';
export type ACLType =
  | 'private'
  | 'public-read'
  | 'public-read-write'
  | 'authenticated-read';

export interface OssOption {
  accessKey: string;
  secretKey: string;
  host: string;
  region?: string;
}

export interface OssAsyncOption extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => OssOption | Promise<OssOption>;
  inject?: any[];
}

export interface BucketInfo {
  name: string;
  creationDate?: number;
}

/**
 * TODO: 使用包提供的类型定义
 */
export interface PutObjectParams {
  bucket: string;
  name: string;
  body: Buffer | string | Readable;
  expires: Date; // 到期时间戳
}

export interface PutObjectRes {
  name: string;
  etag?: string;
}

export interface getObjectParams {
  bucket: string;
  name: string;
}

export type ObjectBody = Buffer | string | Readable | Uint8Array | Blob;

export interface getObjectRes {
  body?: ObjectBody;
  contentLength?: number;
  etag?: string;
}
