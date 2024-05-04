import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateTimeEntryInput } from './create-time-entry.input';

@InputType()
export class EditTimeEntryInput extends CreateTimeEntryInput {
  @Field()
  @IsNotEmpty()
  id: number;
}
