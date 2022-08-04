import { Query, Resolver, Args } from '@nestjs/graphql';
import { GraphQLClient, gql } from 'graphql-request';
import { IssuesArgs } from './args';
import { Issue, Comment, Author } from './types';

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
              number
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
    let issues = [];
    for (let i = 0; i < data.search.nodes.length; i++) {
      if (data.search.nodes[i].url) {
        issues.push(data.search.nodes[i]);
      }
    }

    return issues;
  }

  @Query((returns) => Issue)
  async issue(@Args('issueNumber') issueNumber: number) {
    const endpoint = 'https://api.github.com/graphql';

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: 'Bearer ' + process.env.GITHUB_KEY,
      },
    });

    const query = gql`
      {
        repository(owner: "facebook", name: "react") {
          issue(number: ${issueNumber}) {
            number
            url
            title
            bodyText
            state
            comments(last: 20) {
              nodes {
                author {
                  login
                }
                bodyText
              }
            }
          }
        }
      }
    `;

    const data = await graphQLClient.request(query, issueNumber);
    let issue = data.repository.issue;
    let comments = [];
    for (let i = 0; i < data.repository.issue.comments.nodes.length; i++) {
      if (data.repository.issue.comments.nodes[i]) {
        comments.push(data.repository.issue.comments.nodes[i]);
      }
    }
    issue.comments = comments;

    return issue;
  }
}
