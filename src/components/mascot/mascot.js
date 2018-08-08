import React, { Component } from 'react';
import posed from 'react-pose';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

const Poser = posed.img({
  still: {
    scale: 1,
  },
  move: {
    x: ({ x }) => x,
    y: ({ y }) => y,
    scale: 1.5,
    transition: {
      type: 'spring',
      mass: .2,
      stiffness: 90,
      damping: 50,
      restDelta: 100,
      restSpeed: 100,
    }
  },
});

@inject('store')
@observer
class Mascot extends Component {

  @computed get mascotPosition () {
    return this.props.store.mascotPosition;
  }

  @computed get mascotMoving () {
    return this.props.store.mascotMoving;
  }

  @computed get mascotDirection () {
    return this.props.store.mascotDirection;
  }

  getFrame () {
    switch (this.mascotDirection) {
      case 'left':
        return this.mascotMoving ? 'assets/gfx/left_jump.png' : 'assets/gfx/left_stand.png';
      case 'right':
        return this.mascotMoving ? 'assets/gfx/right_jump.png' : 'assets/gfx/right_stand.png';
      case 'down':
        return this.mascotMoving ? 'assets/gfx/down_jump.png' : 'assets/gfx/down_stand.png';
      case 'up':
        return this.mascotMoving ? 'assets/gfx/up_jump.png' : 'assets/gfx/up_stand.png';
      default:
        return 'assets/gfx/down_stand.png'
    }
  }

  render () {
    const poserProps = {
      src: this.getFrame(),
      style: {
        filter: 'drop-shadow(rgba(0, 0, 0, 0.5) 10px -5px 5px)',
        position: 'absolute',
        height: '7em',
        marginLeft: '1.5em',
        marginTop: '1em',
        pointerEvents: 'none',
        width: '7em',
      },
      onPoseComplete: () => {
        this.props.store.mascotMoved();
      },
      pose: this.mascotMoving ? 'move' : 'still',
      x: this.mascotPosition.x,
      y: this.mascotPosition.y,
    };

    return (
      <Poser { ...poserProps} />
    );
  }
}
  
export default Mascot;
  