import { Injectable, Logger } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { UtilService } from '../../services/util.service';
import { ConfigService } from '@nestjs/config';
import { GetReadUrlArgs } from './types';
import { Expirations, getExpiration } from './expirations';
import { Buffer } from 'buffer';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  storage: Storage;
  constructor(
    private utilService: UtilService,
    private configService: ConfigService,
  ) {
    const credentials = configService.get('GOOGLE_APPLICATION_CREDENTIALS');
    if (credentials) {
      this.storage = new Storage();
    } else {
      const privateKey = Buffer.from(
        configService.get('GCP_CREDENTIALS_PRIVATE_KEY') as string,
        'base64',
      ).toString('utf-8');
      this.storage = new Storage({
        credentials: {
          private_key: privateKey,
          type: 'service_account',
          universe_domain: 'googleapis.com',
          project_id: configService.get('GCP_PROJECT_ID') as string,
          private_key_id: configService.get('GCP_PRIVATE_KEY_ID') as string,
          client_email: configService.get('GCP_CLIENT_EMAIL') as string,
          client_id: configService.get('GCP_CLIENT_ID') as string,
        },
      });
    }
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
      this.logger.error(`failed to delete a file: ${fileName}`, e);
    }
  }
}
