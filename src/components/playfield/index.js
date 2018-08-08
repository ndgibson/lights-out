import React, { Component } from 'react';
import Grid from '../grid';
import { inject, observer } from 'mobx-react';
import { OptionsButton, PressCountText } from '../primitives';
import IconReplay from 'mineral-ui-icons/IconReplay';
import IconFiberNew from 'mineral-ui-icons/IconFiberNew';
import Flex, { FlexItem } from 'mineral-ui/Flex';

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
      style: {
        marginTop: '.1em',
      }
    };

    const optionsFlexProps = {
      direction: "column",
      style: {
        alignItems: 'center',
        marginTop: '1em',
      },
    }

    return (
      <Flex direction="row">
        <Grid />
        <Flex { ...optionsFlexProps }>
          <OptionsButton { ...newBoardButtonProps } />
          <OptionsButton { ...resetBoardButtonProps } />
          <PressCountText { ...pressCountTextProps } />
        </Flex>
      </Flex>
    );
  }
}

export default PlayField;