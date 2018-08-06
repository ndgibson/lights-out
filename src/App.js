import React, { Component } from 'react';
import PlayField from './components/playfield';
import { ThemeProvider } from 'mineral-ui/themes';
import { Provider } from 'mobx-react';
import Store from './store';

import './App.scss';
import './App.less';
import './App.styl';

const store = new Store();

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <Provider store={ store }>
          <PlayField />
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
