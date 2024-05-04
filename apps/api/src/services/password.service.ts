import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  comparePassword(
    decryptedPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(decryptedPassword, encryptedPassword);
  }
}
