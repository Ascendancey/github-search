import { Query, Resolver } from '@nestjs/graphql';
import { GraphQLClient, gql } from 'graphql-request';
import { Issue } from './types';

@Resolver()
export class IssuesResolver {
  @Query((returns) => [Issue])
  async issues() {
    const endpoint = 'https://api.github.com/graphql';

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer ' + process.env.GITHUB_KEY,
      },
    });

    const query = gql`
      query {
        repository(owner: "facebook", name: "react") {
          issues(last: 20, states: CLOSED) {
            edges {
              node {
                url
                title
                body
              }
            }
          }
        }
      }
    `;

    const data = await graphQLClient.request(query);

    let issues = [];
    data.repository.issues.edges.forEach((value) => issues.push(value.node));
    console.log(issues);

    return issues;
  }
}