import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationDto } from './dto/notification.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { JwtPayload } from '../../types/jwt-payload';
import { NotificationsService } from './notifications.service';

@Resolver()
export class NotificationsResolver {
  constructor(private notificationsService: NotificationsService) {}
  @Query(() => [NotificationDto])
  @UseGuards(JwtGraphqlGuard)
  @Roles(PermissionRoleEnum.EMPLOYEE)
  notifications(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<NotificationDto[]> {
    return this.notificationsService.getNotifications(token.employeeId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGraphqlGuard)
  @Roles(PermissionRoleEnum.EMPLOYEE)
  async markAsRead(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('id') id: number,
  ): Promise<boolean> {
    await this.notificationsService.markAsRead(token.employeeId, id);
    return true;
  }

  @Query(() => Number)
  @UseGuards(JwtGraphqlGuard)
  @Roles(PermissionRoleEnum.EMPLOYEE)
  async unreadNotificationsCount(
    @JwtGraphqlDecorator() token: JwtPayload,
  ): Promise<number> {
    const result = await this.notificationsService.getUnreadNotificationsCount(
      token.employeeId,
    );
    return result.count;
  }
}
