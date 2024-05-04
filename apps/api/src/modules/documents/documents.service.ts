import { Injectable } from '@nestjs/common';
import { Database } from '../../database/database.module';
import { CreateDocumentArgs, UpdateDocumentArgs } from './types';

@Injectable()
export class DocumentsService {
  constructor(private database: Database) {}

  getPublicDocumentsForCompany(companyId: number, sort?: string | null) {
    const sortOrder = sort === 'asc' ? 'asc' : 'desc';
    return this.database
      .selectFrom('Document')
      .where('companyId', '=', companyId)
      .where('isPrivate', '=', false)
      .orderBy(`createdAt ${sortOrder}`)
      .selectAll()
      .execute();
  }

  createDocument(args: CreateDocumentArgs) {
    const { companyId, employeeId, input } = args;
    return this.database
      .insertInto('Document')
      .values({
        companyId: companyId,
        name: input.name,
        content: input.content,
        isPrivate: input.isPrivate,
        createdById: employeeId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  updateDocument(args: UpdateDocumentArgs) {
    const { companyId, id, name, file, employeeId } = args;
    return this.database
      .updateTable('Document')
      .set({
        name,
        content: file,
        lastUpdatedById: employeeId,
        updatedAt: new Date(),
      })
      .where('id', '=', id)
      .where('companyId', '=', companyId)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  deleteDocument(companyId: number, id: number) {
    return this.database
      .deleteFrom('Document')
      .where('id', '=', id)
      .where('companyId', '=', companyId)
      .execute();
  }

  async getPrivateDocuments(
    employeeId: number,
    sort: string | null | undefined,
  ) {
    const sortOrder = sort === 'asc' ? 'asc' : 'desc';
    return this.database
      .selectFrom('Document')
      .where('createdById', '=', employeeId)
      .where('isPrivate', '=', true)
      .orderBy(`createdAt ${sortOrder}`)
      .selectAll()
      .execute();
  }

  getRecentlyUpdatedDocuments(companyId: number, limit = 5) {
    return this.database
      .selectFrom('Document')
      .leftJoin('Employee', 'Document.lastUpdatedById', 'Employee.id')
      .leftJoin('User', 'Employee.userId', 'User.id')
      .leftJoin('Company', 'Document.companyId', 'Company.id')
      .where('Document.companyId', '=', companyId)
      .where('Document.isPrivate', '=', false)
      .orderBy('Document.updatedAt desc')
      .limit(limit)
      .select([
        'Document.id as id',
        'Document.name as name',
        'User.profilePhotoUrl as employeePhotoUrl',
        'User.name as employeeName',
        'Document.updatedAt as updatedAt',
      ])
      .execute();
  }
}
