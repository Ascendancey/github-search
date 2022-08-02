import { request, gql } from 'graphql-request';

const query = gql`
  query ($lastNum: Float!, $open: Boolean!, $closed: Boolean!, $term: String!) {
    issues(lastNum: $lastNum, open: $open, closed: $closed, term: $term) {
      url
      title
      body
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

export function issuesQuery() {
  return request(
    process.env.REACT_APP_GRAPHQL_API_URL as string,
    query,
    variables,
  ).then((data) => {
    console.log(data);
    return data;
  });
}
