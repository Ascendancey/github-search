import * as React from 'react';
import Issues from './issues/issues';

class App extends React.Component {
  public render() {
    return (
      <div style={{ margin: '16px' }}>
        <Issues />
      </div>
    );
  }
}

export default App;
