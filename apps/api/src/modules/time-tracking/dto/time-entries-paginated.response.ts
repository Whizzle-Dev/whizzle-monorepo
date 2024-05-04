import { Field, ObjectType } from '@nestjs/graphql';
import { PaginatedGraphqlResponse } from '../../../shared/paginated-graphql-response';
import { TimeEntryDto } from './time-entry.dto';

@ObjectType()
export class TimeEntriesPaginatedResponse extends PaginatedGraphqlResponse(
  TimeEntryDto,
) {
  @Field(() => [TimeEntryDto])
  data: TimeEntryDto[];
}
