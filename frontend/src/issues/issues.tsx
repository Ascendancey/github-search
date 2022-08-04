import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { IRootState } from '../store';
import { Dispatch } from 'redux';
import * as actions from './actions';
import { IssuesState } from './types';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Card from './components/card';

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
    <div style={{ margin: 16 }}>
      <input
        value={term}
        onChange={onInputChange}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            requestButton();
          }
        }}
      />
      <input type="checkbox" checked={open} onChange={onOpenChange} />
      <label>OPEN</label>
      <input type="checkbox" checked={closed} onChange={onClosedChange} />
      <label>CLOSED</label>
      <button onClick={requestButton}>Send query</button>
      <button onClick={issueButton}>Issue query</button>
      {loading && <CircularProgress />}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {list.map((l: any, i) => (
          <Grid item sm={12} md={6} key={i}>
            <Card title={l.title} bodyText={l.bodyText} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ issues }: IRootState) => {
  const { list, issue, loading } = issues;
  return { list, issue, loading };
};

export default connect(mapStateToProps)(Issues);
