import React, { Component } from 'react';
import PlayField from './components/playfield';
import { ThemeProvider } from 'mineral-ui/themes';
import { createTheme } from 'mineral-ui/themes';
import { Provider } from 'mobx-react';
import Store from './store';

const store = new Store();
const theme = createTheme({
  colors: { theme: 'purple' },
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={ theme }>
        <Provider store={ store }>
          <PlayField />
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
