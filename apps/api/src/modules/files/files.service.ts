import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { UtilService } from '../../services/util.service';
import { ConfigService } from '@nestjs/config';
import { GetReadUrlArgs } from './types';
import { Expirations, getExpiration } from './expirations';

@Injectable()
export class FilesService {
  storage: Storage;
  constructor(
    private utilService: UtilService,
    private configService: ConfigService,
  ) {
    this.storage = new Storage();
  }

  async getUploadUrl({
    fileName,
    expiration = Expirations.oneHour,
    ...rest
  }: GetReadUrlArgs) {
    const generatedFileName = `${this.utilService.generateUUID()}_${fileName}`;
    const [url] = await this.storage
      .bucket(this.configService.get('GCP_BUCKET_NAME') as string)
      .file(generatedFileName)
      .getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: getExpiration(expiration),
        ...rest,
      });

    return { url, generatedFileName };
  }

  async getReadUrl({
    fileName,
    expiration = Expirations.oneDay,
    ...rest
  }: GetReadUrlArgs) {
    const [url] = await this.storage
      .bucket(this.configService.get('GCP_BUCKET_NAME') as string)
      .file(fileName)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: getExpiration(expiration),
        ...rest,
      });

    return url;
  }

  async deleteFile(fileName: string) {
    try {
      await this.storage
        .bucket(this.configService.get('GCP_BUCKET_NAME') as string)
        .file(fileName)
        .delete();
    } catch (e) {
      // todo add proper logging
      console.log(e);
    }
  }
}
