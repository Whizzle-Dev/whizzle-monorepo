import { InputType, OmitType } from '@nestjs/graphql';
import { CreateDocumentInput } from './create-document.input';

@InputType()
export class UpdateDocumentInput extends OmitType(CreateDocumentInput, [
  'isPrivate',
]) {}
