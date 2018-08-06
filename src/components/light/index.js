import React, { Component } from 'react';
import { LightButton } from '../primitives';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Light extends Component {

  static propTypes = {
    id: PropTypes.number,
  };

  @computed get onOff () {
    return this.props.store.board[this.props.id];
  }
  
  onClick = () => {
    this.props.store.pressLight(this.props.id);
  };

  render () {
    const buttonProps = {
      onClick: this.onClick,
      primary: this.onOff,
      size: 'jumbo',
    };

    return (
      <LightButton { ...buttonProps }/>
    );
  }
}

export default Light;