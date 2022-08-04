import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from '../store';
import { Dispatch } from 'redux';
import * as actions from './actions';
import { IssuesState } from './types';
import Card from './card';

const Issues = (props: IssuesState) => {
  const { list, loading } = props;
  const [term, setTerm] = React.useState('');
  const dispatch: Dispatch<any> = useDispatch();

  const requestButton = () => {
    dispatch(actions.issuesQuery(term));
  };

  useEffect(() => {
    requestButton();
    // eslint-disable-next-line
  }, []);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  return (
    <div>
      <input value={term} onChange={onInputChange} />
      <button onClick={requestButton}>Send query</button>
      {loading && <i>Loading...</i>}
      <ul>
        {list.map((l: any, i) => (
          <Card key={i} title={l.title} bodyText={l.bodyText} />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ issues }: IRootState) => {
  const { list, loading } = issues;
  return { list, loading };
};

export default connect(mapStateToProps)(Issues);
