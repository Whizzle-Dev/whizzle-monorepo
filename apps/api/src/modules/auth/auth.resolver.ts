import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup-input.dto';
import { VerificationInput } from './dto/verification.input';

import { NotificationsService } from '../notifications/notifications.service';
import { BetaAccessInput } from './dto/beta-access.input';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private configService: ConfigService,
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
    if (this.configService.get('PRIVATE_BETA') === 'true') {
      throw new BadRequestException(
        'Signup is not available during private beta',
      );
    }
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

  @Mutation(() => Boolean)
  async requestBetaAccess(@Args('input') input: BetaAccessInput) {
    try {
      await this.authService.requestBetaAccess(input);
      return true;
    } catch (e) {
      throw new BadRequestException(
        'Failed to signup for beta access. This email may already be registered.',
      );
    }
  }
}
