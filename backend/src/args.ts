import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class IssuesArgs {
  @Field((type) => Number)
  lastNum: number;

  @Field((type) => Boolean)
  open: boolean;

  @Field((type) => Boolean)
  closed: boolean;

  @Field((type) => String)
  term: string;
}
