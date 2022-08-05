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

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Issues = (props: IssuesState) => {
  const { list, loading } = props;
  const [term, setTerm] = React.useState('');
  const [open, setOpen] = React.useState(true);
  const [closed, setClosed] = React.useState(true);
  const dispatch: Dispatch<any> = useDispatch();

  const requestButton = () => {
    dispatch(actions.issuesQuery(term, open, closed));
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          id="standard-basic"
          label="Look for something..."
          variant="standard"
          value={term}
          onChange={onInputChange}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              requestButton();
            }
          }}
        />
        <FormControlLabel
          control={<Checkbox checked={open} onChange={onOpenChange} />}
          label="Open"
        />
        <FormControlLabel
          control={<Checkbox checked={closed} onChange={onClosedChange} />}
          label="Closed"
        />
        <Button variant="outlined" onClick={requestButton}>
          Search
        </Button>
      </div>
      <div style={{ height: 32, display: 'flex', justifyContent: 'center' }}>
        {loading && <CircularProgress size={24} />}
      </div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {list.map((l: any, i) => (
          <Grid item sm={12} md={6} key={i}>
            <Card title={l.title} bodyText={l.bodyText} number={l.number} />
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
