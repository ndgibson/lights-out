import React, { Component } from 'react';
import { inject } from 'mobx-react';
import Flex from 'mineral-ui/Flex';

@inject('store')
class BoardPicker extends Component {

  render () {
    return (
      <Flex direction="row" margin="auto">
        
      </Flex>
    );
  }
}

export default BoardPicker;