import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUserByEmail(email: string) {
    return this.userRepository
      .getUserFromEmail(email)
      .executeTakeFirstOrThrow();
  }
}
