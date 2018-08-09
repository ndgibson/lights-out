import React, { Component } from 'react';
import { LightButton } from '../primitives';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import IconBlurCircular from 'mineral-ui-icons/IconBlurCircular';
import { playPress, playJump } from '../../sfx';
import * as Utils from '../../utils';


@inject('store')
@observer
class Light extends Component {

  static propTypes = {
    id: PropTypes.number,
  };

  @computed get isLightOn () {
    return this.props.store.board[this.props.id];
  }

  @computed get showSolutionIcon () {
    return this.props.store.showSolution && this.props.store.solution[this.props.id] ?
      <IconBlurCircular /> :
      undefined;
  }

  @computed get isCurrentLight () {
    return this.props.store.currentLight === this.props.id;
  }

  constructor (props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount () {
    if (this.props.id === Utils.middleLight()) {
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

  getStyle () {
    let style = {
      backgroundColor: 'transparent',
    };

    if (this.isCurrentLight) {
      return style;
    }
    else if (this.isLightOn) { // neighbor
      style = {
        boxShadow: '0px 0px 20px 5px #3272d9',
      }
    }

    return style;

  }

  render () {
    const buttonProps = {
      iconStart: this.showSolutionIcon,
      onClick: this.onClick,
      primary: this.isLightOn,
      size: 'jumbo',
      style: this.getStyle(),
    };

    return (
      <div ref={ this.ref }>
        <LightButton { ...buttonProps }/>
      </div>
    );
  }
}

export default Light;