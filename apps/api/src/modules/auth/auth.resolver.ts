import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup-input.dto';
import { VerificationInput } from './dto/verification-dto.input';

import { NotificationsService } from '../notifications/notifications.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
  ) {}

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput) {
    const { token } = await this.authService.login({
      email: input.email,
      password: input.password,
    });

    return token;
  }

  @Mutation(() => Boolean)
  async signup(@Args('input') input: SignupInput) {
    const verificationToken = await this.authService.registerUser(input);

    this.notificationsService.handleUserSignedUp(
      verificationToken,
      input.email,
    );

    return true;
  }

  @Mutation(() => Boolean)
  async verify(@Args('input') input: VerificationInput) {
    await this.authService.verifyUser(input.verificationToken);

    return true;
  }
}
