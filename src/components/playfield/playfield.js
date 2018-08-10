import React, { Component } from 'react';
import Grid from '../grid';
import Controls from '../controls';
import { inject } from 'mobx-react';
import Flex from 'mineral-ui/Flex';

@inject('store')
class PlayField extends Component {

  componentDidMount () {
    this.props.store.newBoard();
  }

  render () {
    return (
      <Flex direction="row" margin="auto" style={{ flexGrow: 2 }}>
        <Grid />
        <Controls />
      </Flex>
    );
  }
}

export default PlayField;