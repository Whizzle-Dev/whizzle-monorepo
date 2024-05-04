import { Field, InputType } from '@nestjs/graphql';

import { CheckInSubmissionStatus } from './enums';

@InputType()
export class CheckInSubmissionsFiltersInput {
  @Field(() => CheckInSubmissionStatus, { nullable: true })
  status?: keyof typeof CheckInSubmissionStatus | null;

  @Field(() => Number, { nullable: true })
  teamId?: number | null;
}
