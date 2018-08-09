import React, { Component } from 'react';
import { LightButton } from '../primitives';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import IconBlurCircular from 'mineral-ui-icons/IconBlurCircular';
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

  @computed get isIllegalLight () {
    return this.props.store.puzzleMode && this.props.store.visitedLights[this.props.id];
  }

  constructor (props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount () {
    if (this.props.id === Utils.middleLight()) {
      this.props.store.initializeMascot(this.getCoordinates());
    }
  }

  onClick = () => {
    this.props.store.onLightPress(this.props.id, this.getCoordinates());
  };

  getCoordinates = () => {
    const {
      x,
      y,
    } = this.ref.current.getBoundingClientRect();

    return { x, y };
  }

  getStyle () {
    const style = {};

    if (this.isCurrentLight && !this.isLightOn) { // active tile
      style.backgroundColor = 'transparent';
    }

    if (this.isCurrentLight && this.isLightOn) { // active tile, zeroth move
      style.boxShadow = '0px 0px 20px 5px #3272d9';
    }

    if (!this.isCurrentLight && this.isLightOn) { // inactive but on
      style.boxShadow = '0px 0px 20px 5px #3272d9';
    }

    if (!this.isCurrentLight && !this.isLightOn) { //inactive but off
      style.backgroundColor = 'transparent';
    }

    if (this.isIllegalLight && this.isLightOn ) { // illegal but on
      style.borderColor = 'transparent';
      style.backgroundColor = 'rgba(50, 114, 217, 0.3)';
      style.boxShadow = '0px 0px 20px 5px #3272d9';
    }

    if (this.isIllegalLight && !this.isLightOn ) { // illegal but off
      style.borderColor = 'transparent';
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