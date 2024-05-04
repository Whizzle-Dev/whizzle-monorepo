import { CreateDocumentInput } from './dto/create-document.input';

export type UpdateDocumentArgs = {
  companyId: number;
  id: number;
  name: string;
  file: string;
  employeeId: number;
};
export type CreateDocumentArgs = {
  companyId: number;
  employeeId: number;
  input: CreateDocumentInput;
};
