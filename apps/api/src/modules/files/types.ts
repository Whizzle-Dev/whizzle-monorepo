import { GetSignedUrlConfig } from '@google-cloud/storage';

import { Expirations } from './expirations';

export type GetReadUrlArgs = {
  fileName: string;
  expiration?: Expirations;
} & Omit<GetSignedUrlConfig, 'action' | 'expires'>;
