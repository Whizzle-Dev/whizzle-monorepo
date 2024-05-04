import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UtilService {
  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  generateUUID(): string {
    return crypto.randomUUID({
      disableEntropyCache: true,
    });
  }
}
