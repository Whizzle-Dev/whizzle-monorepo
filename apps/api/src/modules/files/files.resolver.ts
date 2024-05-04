import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlGuard } from '../../guards/jwt-graphql.guard';
import { FilesService } from './files.service';
import { UploadFileModel } from './upload-file.model';
import { Roles } from '../auth/roles.decorator';
import { PermissionRoleEnum } from '../../types/permission-role.enum';

@Resolver()
export class FilesResolver {
  constructor(private filesService: FilesService) {}

  @Roles(PermissionRoleEnum.EMPLOYEE)
  @UseGuards(JwtGraphqlGuard)
  @Query(() => UploadFileModel)
  async getFileUploadUrl(
    @Args('fileName') fileName: string,
  ): Promise<UploadFileModel> {
    const { url, generatedFileName } = await this.filesService.getUploadUrl({
      fileName,
    });

    return { url, fileName: generatedFileName };
  }
}
