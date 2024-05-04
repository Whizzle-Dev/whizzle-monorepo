import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';

import { JwtPayload } from '../types/jwt-payload';
import { AccessControlService } from '../modules/auth/access-control.service';
import { Reflector } from '@nestjs/core';
import { PermissionRoleEnum } from '../types/permission-role.enum';
import { ROLE_KEY } from '../modules/auth/roles.decorator';

@Injectable()
export class JwtGraphqlGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
    private accessControlService: AccessControlService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest<IncomingMessage & { user?: JwtPayload }>(
      context,
    );
    try {
      const token = this.getToken(request as any);
      const user = this.jwtService.verify(token, {
        algorithms: [this.configService.get('JWT_ALGORITHM')] as any,
      });
      // check the payload if it contains userId and companyId
      if (!user.userId || !user.companyId || !user.employeeId) {
        return false;
      }

      const requiredRoles = this.reflector.getAllAndOverride<
        PermissionRoleEnum[]
      >(ROLE_KEY, [context.getHandler(), context.getClass()]);

      for (const role of requiredRoles) {
        const result = this.accessControlService.isAuthorized({
          requiredRole: role,
          currentRole: user.permissionRole,
        });

        if (result) {
          request.user = user;
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return req;
  }

  protected getToken(request: {
    headers: Record<string, string | string[]>;
  }): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error('Invalid Authorization Header');
    }
    const [_, token] = authorization.split(' ');
    return token;
  }
}
