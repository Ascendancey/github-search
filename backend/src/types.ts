import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Issue {
  @Field((type) => String)
  url: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  bodyText: string;

  @Field((type) => String)
  state: string;
}
