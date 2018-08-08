import React, { Component } from 'react';
import posed from 'react-pose';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

const Poser = posed.img({
  still: {},
  move: {
    x: ({ x }) => x,
    y: ({ y }) => y,
  },
});

@inject('store')
@observer
class Mascot extends Component {

  @computed get mascotPosition () {
    return this.props.store.mascotPosition;
  }

  @computed get getMascotMoving () {
    return this.props.store.mascotMoving;
  }

  render () {
    const poserProps = {
      src: 'assets/gfx/front_stand.png',
      style: {
        position: 'absolute',
        height: '7em',
        marginLeft: '1.5em',
        marginTop: '1em',
        width: '7em',
      },
      pose: this.getMascotMoving ? 'move' : 'still',
      x: this.mascotPosition.x,
      y: this.mascotPosition.y,
    };

    if (this.getMascotMoving) {
      this.props.store.mascotMoved();
    }

    return (
      <Poser { ...poserProps} />
    );
  }
}
  
export default Mascot;
  