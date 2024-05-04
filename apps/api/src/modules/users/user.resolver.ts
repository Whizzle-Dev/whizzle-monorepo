import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserDto } from './dto/userDto';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { FilesService } from '../files/files.service';
import { UserRepository } from './user.repository';
import { JwtPayload } from '../../types/jwt-payload';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { Expirations } from '../files/expirations';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

@UseGuards(JwtGraphqlGuard)
@Roles(PermissionRoleEnum.EMPLOYEE)
@Resolver(() => UserDto)
export class UserResolver {
  constructor(
    private filesService: FilesService,
    private userRepository: UserRepository,
  ) {}

  @Query(() => UserDto)
  async currentUser(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<UserDto> {
    const user = await this.userRepository
      .getUserFromToken(token)
      .select((eb) => [
        'User.id',
        'User.email',
        'User.dateOfBirth',
        'User.address',
        'User.name',
        'User.createdAt',
        'User.emailVerified',
        'User.phoneNumber',
        'User.profilePhotoUrl',
        'Employee.id as employeeId',
        jsonObjectFrom(
          eb
            .selectFrom('Company')
            .whereRef('Company.id', '=', 'Employee.companyId')
            .select([
              'Company.website as website',
              'Company.id as id',
              'Company.businessName as businessName',
            ]),
        ).as('company'),
      ])
      .executeTakeFirstOrThrow();
    return user;
  }

  @Mutation(() => Boolean)
  async updateDetails(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('personalDetails') personalDetails: UpdateUserInput,
  ) {
    await this.userRepository.updateUser(token.userId, personalDetails);

    return true;
  }

  @Mutation(() => String)
  async saveUserProfilePhoto(
    @Args('fileName') fileName: string,
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<string> {
    const user = await this.userRepository
      .getUserFromToken(token)
      .select(['User.profilePhotoFileName'])
      .executeTakeFirstOrThrow();
    const photoUrl = await this.filesService.getReadUrl({
      fileName,
      expiration: Expirations.sevenDays,
    });
    await this.userRepository.updateUser(token.userId, {
      profilePhotoFileName: fileName,
      profilePhotoUrl: photoUrl,
    });
    this.deleteUserImage(user.profilePhotoFileName);
    return photoUrl;
  }

  @Mutation(() => Boolean)
  async removeUserProfilePhoto(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<boolean> {
    const user = await this.userRepository
      .getUserFromToken(token)
      .select(['User.profilePhotoFileName'])
      .executeTakeFirstOrThrow();
    await this.userRepository.updateUser(token.userId, {
      profilePhotoFileName: null,
      profilePhotoUrl: null,
    });
    this.deleteUserImage(user.profilePhotoFileName);

    return true;
  }

  deleteUserImage(profilePhotoFileName?: string | null) {
    if (profilePhotoFileName) {
      this.filesService.deleteFile(profilePhotoFileName);
    }
  }
}
