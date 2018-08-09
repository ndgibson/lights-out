import React, { Component } from 'react';
import Flex from 'mineral-ui/Flex';
import { OptionsButton, SpacerButton, PressCountText } from '../primitives';
import { inject, observer } from 'mobx-react';
import IconReplay from 'mineral-ui-icons/IconReplay';
import IconShuffle from 'mineral-ui-icons/IconShuffle';
import IconLightbulbOutline from 'mineral-ui-icons/IconLightbulbOutline';
import IconMusicNote from 'mineral-ui-icons/IconMusicNote';
import IconExtension from 'mineral-ui-icons/IconExtension';
import IconSchool from 'mineral-ui-icons/IconSchool';
import IconDoNotDisturbAlt from 'mineral-ui-icons/IconDoNotDisturbAlt';

@inject('store')
@observer
export default class Controls extends Component {

  onToggleMusicClick = () => {
    this.props.store.toggleMusic();
  }

  onRandomModeClick = () => {
    this.props.store.toggleRandomMode();
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

  onTogglePresetModeClick = () => {
    this.props.store.togglePresetMode();
  }

  getPressCountText = () => {
    const pressCount = this.props.store.pressCount;
    const solution = this.props.store.solution;
    if (this.props.store.puzzleMode) {
      return `${pressCount}/${Object.keys(solution).length}`;
    }
    return pressCount;
  }

  render () {
    const togglePresetModeProps = {
      iconStart: <IconSchool />,
      onClick: this.onTogglePresetModeClick,
    }

    const resetBoardButtonProps = {
      iconStart: <IconReplay />,
      onClick: this.onResetBoardClick,
    };

    const randomModeButtonProps = {
      iconStart: <IconShuffle />,
      onClick: this.onRandomModeClick,
    };

    const toggleSolutionButtonProps = {
      iconStart: <IconLightbulbOutline />,
      onClick: this.onToggleSolutionClick,
    };

    const noSolutionButtonProps = {
      iconStart: <IconDoNotDisturbAlt />,
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
        paddingTop: '2.5em',
      },
    }

    return (
      <Flex { ...optionsFlexProps }>
        { OptionsButton(false)({ ...resetBoardButtonProps }) }
        { this.props.store.puzzleMode ?
            OptionsButton()({ ...noSolutionButtonProps }) :
            OptionsButton(this.props.store.showSolution)({ ...toggleSolutionButtonProps })
        }
        <SpacerButton />
        { OptionsButton(this.props.store.presetMode)({ ...togglePresetModeProps }) }
        { OptionsButton(this.props.store.randomMode)({ ...randomModeButtonProps }) }
        { OptionsButton(this.props.store.puzzleMode)({ ...togglePuzzleModeProps }) }
        <SpacerButton />
        <PressCountText { ...pressCountTextProps } />
        <SpacerButton />
        { OptionsButton(this.props.store.playMusic)({ ...toggleMusicButtonProps }) }
      </Flex>
    )
  }
}