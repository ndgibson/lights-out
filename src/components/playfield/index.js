import React, { Component } from 'react';
import Grid from '../grid';
import { inject, observer } from 'mobx-react';
import { OptionsButton, PressCountText } from '../primitives';
import IconReplay from 'mineral-ui-icons/IconReplay';
import IconFiberNew from 'mineral-ui-icons/IconFiberNew';

@inject('store')
@observer
class PlayField extends Component {

  componentDidMount () {
    this.props.store.newBoard();
  }
  
  onNewBoardClick = () => {
    this.props.store.newBoard();
  }

  onResetBoardClick = () => {
    this.props.store.resetBoard();
  }

  render () {
    const newBoardButtonProps = {
      circular: true,
      iconStart: <IconFiberNew />,
      minimal: true,
      onClick: this.onNewBoardClick,
    };

    const resetBoardButtonProps = {
      circular: true,
      iconStart: <IconReplay />,
      minimal: true,
      onClick: this.onResetBoardClick,
    };

    const pressCountTextProps = {
      children: this.props.store.pressCount,
      fontWeight: 'extraBold',
    };

    return (
      <React.Fragment>
        <Grid />
        <OptionsButton { ...newBoardButtonProps } />
        <OptionsButton { ...resetBoardButtonProps } />
        <PressCountText { ...pressCountTextProps } />
      </React.Fragment>
    );
  }
}

export default PlayField;