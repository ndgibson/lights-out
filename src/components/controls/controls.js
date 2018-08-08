import React, { Component } from 'react';
import Flex from 'mineral-ui/Flex';
import { OptionsButton, PressCountText } from '../primitives';
import { inject, observer } from 'mobx-react';
import IconReplay from 'mineral-ui-icons/IconReplay';
import IconShuffle from 'mineral-ui-icons/IconShuffle';
import IconLightbulbOutline from 'mineral-ui-icons/IconLightbulbOutline';
import IconMusicNote from 'mineral-ui-icons/IconMusicNote';

@inject('store')
@observer
export default class Controls extends Component {

  onToggleMusicClick = () => {
    this.props.store.toggleMusic();
  }

  onNewBoardClick = () => {
    this.props.store.newBoard();
  }

  onResetBoardClick = () => {
    this.props.store.resetBoard();
  }

  onToggleSolutionClick = () => {
    this.props.store.toggleSolution();
  }

  render () {
    const newBoardButtonProps = {
      circular: true,
      iconStart: <IconShuffle />,
      minimal: true,
      onClick: this.onNewBoardClick,
    };

    const resetBoardButtonProps = {
      circular: true,
      iconStart: <IconReplay />,
      minimal: true,
      onClick: this.onResetBoardClick,
    };

    const toggleSolutionButtonProps = {
      circular: true,
      iconStart: <IconLightbulbOutline />,
      minimal: true,
      onClick: this.onToggleSolutionClick,
    };

    const toggleMusicButtonProps = {
      circular: true,
      iconStart: <IconMusicNote />,
      minimal: true,
      onClick: this.onToggleMusicClick,
    };

    const pressCountTextProps = {
      children: this.props.store.pressCount,
      fontWeight: 'extraBold',
      noMargins: true,
      style: {
        marginTop: '.3em',
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
      <Flex { ...optionsFlexProps }>
        <OptionsButton { ...newBoardButtonProps } />
        <OptionsButton { ...resetBoardButtonProps } />
        <OptionsButton { ...toggleSolutionButtonProps } />
        <OptionsButton { ...toggleMusicButtonProps } />
        <PressCountText { ...pressCountTextProps } />
      </Flex>
    )
  }
}