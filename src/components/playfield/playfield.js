import React, { Component } from 'react';
import Grid from '../grid';
import Controls from '../controls';
import { inject, observer } from 'mobx-react';
import Flex from 'mineral-ui/Flex';

@inject('store')
@observer
class PlayField extends Component {

  componentDidMount () {
    this.props.store.newBoard();
  }

  render () {
    return (
      <Flex direction="row">
        <Grid />
        <Controls />
      </Flex>
    );
  }
}

export default PlayField;