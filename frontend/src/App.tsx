import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from './store';
import { Dispatch } from 'redux';
import { request, gql } from 'graphql-request';
import * as asyncactions from './store/demo/async-actions';
import { DemoActions } from './store/demo/types';

const mapStateToProps = ({ demo }: IRootState) => {
  const { list, loading } = demo;
  return { list, loading };
};

const mapDispatcherToProps = (dispatch: Dispatch<DemoActions>) => {
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
  query {
    hello
  }
`;

request(process.env.REACT_APP_GRAPHQL_API_URL as string, query).then((data) => {
  console.log(data);
});

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
