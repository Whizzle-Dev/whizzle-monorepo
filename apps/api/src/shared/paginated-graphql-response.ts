import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  data: T[];
  totalCount: number;
  hasNextPage: boolean;
}

export function PaginatedGraphqlResponse<T>(
  classRef: Type<T>,
): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    constructor(props: IPaginatedType<T>) {
      this.totalCount = props.totalCount;
      this.hasNextPage = props.hasNextPage;
      this.data = props.data;
    }

    @Field(() => Int)
    totalCount: number;

    @Field(() => Boolean)
    hasNextPage: boolean;

    @Field(() => [classRef])
    readonly data: T[];
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
