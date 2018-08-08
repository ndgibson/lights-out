import React, { Component } from 'react';
import { LightButton } from '../primitives';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Howl } from 'howler';
import IconBlurCircular from 'mineral-ui-icons/IconBlurCircular';

const lightPressSfx = new Howl({
  preload: true,
  src: 'assets/sfx/button.mp3',
});

@inject('store')
@observer
class Light extends Component {

  static propTypes = {
    id: PropTypes.number,
  };

  @computed get onOff () {
    return this.props.store.board[this.props.id];
  }

  @computed get showSolutionIcon () {
    return this.props.store.showSolution && this.props.store.solution[this.props.id] ?
      <IconBlurCircular /> :
      undefined;
  }
  
  onClick = () => {
    this.props.store.pressLight(this.props.id);
    lightPressSfx.play();
  };

  render () {
    const buttonProps = {
      iconStart: this.showSolutionIcon,
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