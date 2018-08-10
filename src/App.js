import React, { Component } from 'react';
import PlayField from './components/playfield';
import { ThemeProvider } from 'mineral-ui/themes';
import { createTheme } from 'mineral-ui/themes';
import { Provider } from 'mobx-react';
import Store from './store';
import Mascot from './components/mascot';
import Flex from 'mineral-ui/Flex';
import Tutorial from './components/tutorial';

const store = new Store();
const theme = createTheme({
  colors: { theme: 'blue' },
  overrides: {
    color_disabled: 'transparent',
  },
});

class App extends Component {
  render() {
    const flexProps = {
      direction: 'column',
      style: {
        height: '100vh',
        width: '100vw',
      },
    };

    const videoProps = {
      id: 'video_background',
      preload: 'auto',
      autoPlay: 'true',
      playsInline: 'true',
      loop: 'loop',
      muted: 'true',
      src: 'assets/video/loop.webm',
      style: {
        position: 'absolute',
        zIndex: '-9000',
        minWidth: '100%',
        minHeight: '100%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
      },
    }

    return (
      <React.Fragment>
        <video { ...videoProps } />
        <ThemeProvider theme={ theme }>
          <Provider store={ store }>
            <Flex { ...flexProps }>
              <Tutorial />
              <PlayField />
              <Mascot />
            </Flex>
          </Provider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
