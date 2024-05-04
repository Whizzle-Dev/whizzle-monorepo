import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DocumentsService } from './documents.service';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { JwtGraphqlDecorator } from '../../decorators/user.decorator';
import { JwtPayload } from '../../types/jwt-payload';
import { DocumentDto } from './dto/document.dto';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';
import { RecentlyUpdateDocumentDto } from './dto/recently-updated-document.dto';
import { NotificationsService } from '../notifications/notifications.service';

@UseGuards(JwtGraphqlGuard)
@Resolver()
export class DocumentsResolver {
  constructor(
    private documentsService: DocumentsService,
    private notificationsService: NotificationsService,
  ) {}

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [DocumentDto])
  documents(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('sort', { nullable: true, type: () => String }) sort?: string | null,
  ): Promise<DocumentDto[]> {
    return this.documentsService.getPublicDocumentsForCompany(
      token.companyId,
      sort,
    );
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [DocumentDto])
  myDocuments(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('sort', { nullable: true, type: () => String }) sort?: string | null,
  ): Promise<DocumentDto[]> {
    return this.documentsService.getPrivateDocuments(token.employeeId, sort);
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => DocumentDto)
  createDocument(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('input') input: CreateDocumentInput,
  ): Promise<DocumentDto> {
    return this.documentsService.createDocument({
      companyId: token.companyId,
      employeeId: token.employeeId,
      input,
    });
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async updateDocument(
    @Args('id') id: number,
    @Args('input') input: UpdateDocumentInput,
    @JwtGraphqlDecorator() token: JwtPayload,
  ) {
    await this.documentsService.updateDocument({
      companyId: token.companyId,
      employeeId: token.employeeId,
      id,
      name: input.name,
      file: input.content,
    });

    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async deleteDocument(
    @Args('id') id: number,
    @JwtGraphqlDecorator() token: JwtPayload,
  ) {
    await this.documentsService.deleteDocument(token.companyId, id);
    return true;
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Query(() => [RecentlyUpdateDocumentDto])
  recentlyUpdatedDocuments(
    @JwtGraphqlDecorator() token: JwtPayload,
    @Args('limit', { nullable: true, type: () => Number }) limit?: number,
  ): Promise<RecentlyUpdateDocumentDto[]> {
    return this.documentsService.getRecentlyUpdatedDocuments(
      token.companyId,
      limit,
    );
  }

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @Mutation(() => Boolean)
  async mentionEmployee(
    @Args('employeeId') employeeId: number,
    @Args('documentId') documentId: number,
    @JwtGraphqlDecorator() token: JwtPayload,
  ) {
    await this.notificationsService.handleMentionOnDocument({
      companyId: token.companyId,
      employeeId: token.employeeId,
      mentionedEmployee: employeeId,
      documentId,
    });

    return true;
  }
}
