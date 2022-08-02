import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Issue {
  @Field((type) => String)
  url: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  body: string;

  @Field((type) => String)
  state: string;
}
