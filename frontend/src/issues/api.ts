import { request, gql } from 'graphql-request';

export function issuesQuery(term: string) {
  const query = gql`
    query (
      $lastNum: Float!
      $open: Boolean!
      $closed: Boolean!
      $term: String!
    ) {
      issues(lastNum: $lastNum, open: $open, closed: $closed, term: $term) {
        number
        url
        title
        bodyText
        state
      }
    }
  `;

  const variables = {
    lastNum: 20,
    open: true,
    closed: true,
    term: '',
  };

  return request(process.env.REACT_APP_GRAPHQL_API_URL as string, query, {
    ...variables,
    term: term,
  }).then((data) => {
    return data;
  });
}

export function issueQuery(issueNumber: number) {
  const query = gql`
    query ($issueNumber: Float!) {
      issue(issueNumber: $issueNumber) {
        number
        url
        title
        bodyText
        state
        comments {
          bodyText
          author {
            login
          }
        }
      }
    }
  `;
  const variables = {
    issueNumber: issueNumber,
  };
  return request(
    process.env.REACT_APP_GRAPHQL_API_URL as string,
    query,
    variables,
  ).then((data) => {
    return data;
  });
}
