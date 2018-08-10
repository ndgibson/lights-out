import React, { Component } from 'react';
import Flex from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';

class Tutorial extends Component {

  render () {

    const textProps = {
      align: 'center',
      color: 'white',
      element: 'h1',
    }

    return (
      <Flex direction="row" margin="auto" style={{ marginTop: '3em', marginBottom: '2em' }}>
        <Text { ...textProps }>
          { 'Jumping to a light will toggle it and its four adjacent lights.' }
          <br />
          { 'Turn off all the lights!' }
          <br />
          { 'Clear all 100 boards! Try Puzzle Mode for a real challenge!' }
        </Text>
      </Flex>
    );
  }
}

export default Tutorial;