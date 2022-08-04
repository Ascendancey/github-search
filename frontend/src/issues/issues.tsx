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
  const [open, setOpen] = React.useState(true);
  const [closed, setClosed] = React.useState(true);
  const dispatch: Dispatch<any> = useDispatch();

  const requestButton = () => {
    dispatch(actions.issuesQuery(term, open, closed));
  };

  const issueButton = () => {
    dispatch(actions.issueQuery(19034));
  };

  useEffect(() => {
    requestButton();
    // eslint-disable-next-line
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  const onOpenChange = () => {
    setOpen(!open);
  };
  const onClosedChange = () => {
    setClosed(!closed);
  };

  return (
    <div>
      <input value={term} onChange={onInputChange} />
      <input type="checkbox" checked={open} onChange={onOpenChange} />
      <label>OPEN</label>
      <input type="checkbox" checked={closed} onChange={onClosedChange} />
      <label>CLOSED</label>
      <button onClick={requestButton}>Send query</button>
      <button onClick={issueButton}>Issue query</button>
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
  const { list, issue, loading } = issues;
  return { list, issue, loading };
};

export default connect(mapStateToProps)(Issues);
