import { IsInt, Max, Min } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginatedQueryInput {
  @Field()
  @IsInt()
  @Min(0)
  @Max(99999)
  readonly skip: number;

  @Field()
  @IsInt()
  @Min(0)
  @Max(99999)
  readonly take: number;
}
