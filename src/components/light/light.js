import React, { Component } from 'react';
import { LightButton } from '../primitives';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import IconBlurCircular from 'mineral-ui-icons/IconBlurCircular';
import { playPress, playJump } from '../../sfx';
import { GRID_DIMENSION } from '../../constants';

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

  constructor (props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount () {
    if (this.props.id === (Math.floor(Math.pow(GRID_DIMENSION, 2) / 2))) {
      this.moveMascot();
    }
  }

  onClick = () => {
    this.moveMascot();
    this.props.store.pressLight(this.props.id);
    playPress();
    playJump();
  };

  moveMascot () {
    const {
      x,
      y,
    } = this.ref.current.getBoundingClientRect();

    this.props.store.moveMascot({ x, y });
  }

  render () {
    const buttonProps = {
      iconStart: this.showSolutionIcon,
      onClick: this.onClick,
      primary: this.onOff,
      size: 'jumbo',
      style: {
        boxShadow: this.onOff ? '0px 0px 20px 5px #3272d9' : undefined,
      }
    };

    return (
      <div ref={ this.ref }>
        <LightButton { ...buttonProps }/>
      </div>
    );
  }
}

export default Light;