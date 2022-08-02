import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from './store';
import { Dispatch } from 'redux';
import { request, gql } from 'graphql-request';
import * as asyncactions from './issues/async-actions';
import { IssuesActions } from './issues/types';

const mapStateToProps = ({ issues }: IRootState) => {
  const { list, loading } = issues;
  return { list, loading };
};

const mapDispatcherToProps = (dispatch: Dispatch<IssuesActions>) => {
  return {
    addItem: (item: string) => asyncactions.addItemAsync(dispatch, item),
  };
};

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>;

interface IState {
  inputText: string;
}

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

const requestButton = () => {
  request(
    process.env.REACT_APP_GRAPHQL_API_URL as string,
    query,
    variables,
  ).then((data) => {
    console.log(data);
  });
};

class App extends React.Component<ReduxType, IState> {
  public state: IState = {
    inputText: '',
  };

  public onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value });
  };

  public onAddClick = () => {
    this.props.addItem(this.state.inputText);
    this.setState({ inputText: '' });
  };

  public render() {
    const { list, loading } = this.props;

    return (
      <div style={{ margin: '20px' }}>
        <input value={this.state.inputText} onChange={this.onInputChange} />
        <button onClick={this.onAddClick}>Add</button>
        <br />
        <button onClick={requestButton}>Send query</button>
        {loading && <div>Loading...</div>}
        <ul>
          {list.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);
