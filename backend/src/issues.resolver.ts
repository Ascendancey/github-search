import { Query, Resolver, Args } from '@nestjs/graphql';
import { GraphQLClient, gql } from 'graphql-request';
import { IssuesArgs } from './args';
import { Issue } from './types';

@Resolver()
export class IssuesResolver {
  @Query((returns) => [Issue])
  async issues(@Args() issuesArgs: IssuesArgs) {
    const endpoint = 'https://api.github.com/graphql';

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer ' + process.env.GITHUB_KEY,
      },
    });

    const query = gql`
      {
        search(
          query: "repo:facebook/react in:title in:body ${issuesArgs.term}"
          type: ISSUE
          first: 20
        ) {
          nodes {
            ... on Issue {
              url
              title
              bodyText
              state
            }
          }
        }
      }
    `;

    const data = await graphQLClient.request(query, issuesArgs);
    console.log(data);
    let issues = [];
    for (let i = 0; i < data.search.nodes.length; i++) {
      if (data.search.nodes[i].url) {
        issues.push(data.search.nodes[i]);
      }
    }

    return issues;
  }
}
