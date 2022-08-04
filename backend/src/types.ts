import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field((type) => String)
  login: string;
}

@ObjectType()
export class Comment {
  @Field((type) => String)
  bodyText: string;

  @Field((type) => Author)
  author: Author;
}

@ObjectType()
export class Issue {
  @Field((type) => Float)
  number: number;

  @Field((type) => String)
  url: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  bodyText: string;

  @Field((type) => String)
  state: string;

  @Field((type) => [Comment])
  comments?: Comment[];
}
