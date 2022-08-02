import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from '../store';
import { Dispatch } from 'redux';
import * as actions from './actions';
import { IssuesState } from './types';

const Issues = (props: IssuesState) => {
  const { list, loading } = props;
  const [term, setTerm] = React.useState('');
  const dispatch: Dispatch<any> = useDispatch();

  const issuesQuery = () => {
    dispatch(actions.setLoading(true));
    dispatch(actions.setLoading(false));
  };
  const requestButton = () => {
    dispatch(actions.issuesQuery());
  };

  useEffect(() => {
    issuesQuery();
    // eslint-disable-next-line
  }, []);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  return (
    <div>
      <input value={term} onChange={onInputChange} />
      <button onClick={requestButton}>Send query</button>
      {loading && <div>Loading...</div>}
      <ul>
        {list.map((l, i) => (
          <li key={i}>{l}</li>
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
