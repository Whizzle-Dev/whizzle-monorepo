import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { UtilService } from '../../services/util.service';
import { FilesResolver } from './files.resolver';

@Module({
  providers: [FilesService, UtilService, FilesResolver],
  exports: [FilesService],
})
export class FilesModule {}
