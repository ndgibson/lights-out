import React, { Component } from 'react';
import Flex from 'mineral-ui/Flex';
import { OptionsButton, PressCountText } from '../primitives';
import { inject, observer } from 'mobx-react';
import IconReplay from 'mineral-ui-icons/IconReplay';
import IconShuffle from 'mineral-ui-icons/IconShuffle';
import IconLightbulbOutline from 'mineral-ui-icons/IconLightbulbOutline';
import IconMusicNote from 'mineral-ui-icons/IconMusicNote';
import IconExtension from 'mineral-ui-icons/IconExtension';

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

  onTogglePuzzleModeClick = () => {
    this.props.store.togglePuzzleMode();
  }

  getPressCountText = () => {
    const pressCount = this.props.store.pressCount;
    if (this.props.store.puzzleMode) {
      return `${pressCount}/15`;
    }
    return pressCount;
  }

  render () {
    const newBoardButtonProps = {
      iconStart: <IconShuffle />,
      onClick: this.onNewBoardClick,
    };

    const resetBoardButtonProps = {
      iconStart: <IconReplay />,
      onClick: this.onResetBoardClick,
    };

    const toggleSolutionButtonProps = {
      disabled: this.props.store.puzzleMode,
      iconStart: <IconLightbulbOutline />,
      onClick: this.onToggleSolutionClick,
    };

    const toggleMusicButtonProps = {
      iconStart: <IconMusicNote />,
      onClick: this.onToggleMusicClick,
    };

    const togglePuzzleModeProps = {
      iconStart: <IconExtension />,
      onClick: this.onTogglePuzzleModeClick,
    }

    const pressCountTextProps = {
      children: this.getPressCountText(),
      fontWeight: 'extraBold',
      noMargins: true,
      style: {
        marginTop: '.3em',
        color: this.props.store.puzzleMode ? 'white' : undefined,
        filter: this.props.store.puzzleMode ? 'drop-shadow(white 0px 0px 10px)' : undefined,
      }
    };

    const optionsFlexProps = {
      direction: "column",
      style: {
        alignItems: 'center',
        marginTop: '1em',
        width: '7em',
      },
    }

    return (
      <Flex { ...optionsFlexProps }>
        { OptionsButton(false)({ ...newBoardButtonProps }) }
        { OptionsButton(false)({ ...resetBoardButtonProps }) }
        { OptionsButton(this.props.store.showSolution)({ ...toggleSolutionButtonProps }) }
        { OptionsButton(this.props.store.playMusic)({ ...toggleMusicButtonProps }) }
        { OptionsButton(this.props.store.puzzleMode)({ ...togglePuzzleModeProps }) }
        <PressCountText { ...pressCountTextProps } />
      </Flex>
    )
  }
}