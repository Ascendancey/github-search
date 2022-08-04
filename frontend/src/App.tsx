import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Issues from './issues/issues';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Issues />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
