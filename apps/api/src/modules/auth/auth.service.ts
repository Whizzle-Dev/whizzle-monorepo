import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../users/user.service';
import { LoginDto } from './dto/login.dto';
import { LoginInputDto } from './dto/login-input.dto';
import { PasswordService } from '../../services/password.service';
import { AuthRepository } from './auth.repository';
import { SignupInput } from './dto/signup-input.dto';
import { UtilService } from '../../services/util.service';
import { EMAIL_VALIDITY_MINUTES } from '../../constants';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { DateService } from '../../shared/date.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private passwordService: PasswordService,
    private authRepository: AuthRepository,
    private utilService: UtilService,
    private dateService: DateService,
  ) {}

  private signToken(
    userId: number,
    companyId: number,
    employeeId: number,
    permissionRole: string,
  ) {
    return this.jwtService.sign(
      {
        userId,
        companyId,
        employeeId,
        permissionRole,
      },
      {
        algorithm: this.configService.get('JWT_ALGORITHM'),
      },
    );
  }

  async login(loginUser: LoginInputDto): Promise<LoginDto> {
    const user = await this.validateUser(loginUser);
    return {
      token: this.signToken(
        user.id,
        user.companyId,
        user.employeeId,
        user.permissionRole,
      ),
    };
  }

  async validateUser(loginUser: { email: string; password: string }) {
    const { email, password } = loginUser;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      throw new BadRequestException('Invalid credentials, please try again');
    }

    const isPasswordMatching = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async registerUser(input: SignupInput) {
    const request = await this.authRepository.getUserSignupRequestByEmail(
      input.email,
    );

    const verificationToken = this.utilService.generateCode();
    if (request) {
      await this.authRepository.updateUserSignupRequest(
        request.id,
        {
          verificationCode: verificationToken,
          codeGeneratedAt: new Date(),
          name: input.name,
          password: await this.passwordService.hashPassword(input.password),
          company: {
            name: input.businessName,
            website: input.website,
          },
        },
        request.companyId,
      );
    } else {
      await this.authRepository.createUserSignupRequest({
        email: input.email,
        name: input.name,
        password: await this.passwordService.hashPassword(input.password),
        verificationCode: verificationToken,
        codeGeneratedAt: new Date(),
        company: {
          name: input.businessName,
          website: input.website,
        },
      });
    }

    return verificationToken;
  }

  async verifyUser(verificationToken: string) {
    const signupRequest = await this.authRepository.getUserSignupRequestByToken(
      verificationToken,
    );

    if (!signupRequest || !signupRequest.codeGeneratedAt) {
      throw new Error('Invalid verification token');
    }

    if (
      this.dateService
        .createFrom(signupRequest.codeGeneratedAt)
        .isBefore(
          this.dateService
            .getCurrentDate()
            .subtract(EMAIL_VALIDITY_MINUTES, 'm'),
        )
    ) {
      throw new Error('Verification token expired');
    }

    await this.authRepository.createUser({
      email: signupRequest.email,
      name: signupRequest.name || '',
      password: signupRequest.password,
      status: 'ACTIVE',
      companyId: signupRequest.companyId,
      emailVerified: true,
      verificationToken,
      permissionRole: PermissionRoleEnum.ACCOUNT_OWNER,
    });
  }
}
