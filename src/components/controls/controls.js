import React, { Component } from 'react';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import { OptionsButton, SpacerButton, PressCountText, withTooltip } from '../primitives';
import { inject, observer } from 'mobx-react';
import BoardPicker from '../boardPicker';
import IconReplay from 'mineral-ui-icons/IconReplay';
import IconShuffle from 'mineral-ui-icons/IconShuffle';
import IconLightbulbOutline from 'mineral-ui-icons/IconLightbulbOutline';
import IconMusicNote from 'mineral-ui-icons/IconMusicNote';
import IconExtension from 'mineral-ui-icons/IconExtension';
import IconSchool from 'mineral-ui-icons/IconSchool';
import IconDoNotDisturbAlt from 'mineral-ui-icons/IconDoNotDisturbAlt';

const RESTART_TOOLTIP = 'Reset the board!';
const SOLUTION_TOOLIP = 'Show a solution!';
const NO_SOLUTION_TOOLIP = 'Solutions locked in Puzzle Mode!';
const PRESET_TOOLTIP = 'Curated mode! 100 boards! Enter 1 - 100 to jump to that Board!';
const RANDOM_TOOLTIP = 'Random mode! Always solvable!';
const PUZZLE_TOOLTIP = 'Puzzle mode! Limited moves! No back tracking! Works with Curated or Random boards!';
const COUNT_TOOLTIP = 'Move count!';
const COUNT_LIMIT_TOOLTIP = 'Move count and move limit for this Puzzle!';
const MUSIC_TOOLTIP = 'Toggle music!';

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
        marginLeft: this.props.store.puzzleMode ? '.3em' : '.9em',
        color: this.props.store.puzzleMode ? this.props.store.pressCount < Object.keys(this.props.store.solution).length ? 'white' : 'red' : undefined,
        filter: this.props.store.puzzleMode ? this.props.store.pressCount < Object.keys(this.props.store.solution).length ? 'drop-shadow(white 0px 0px 10px)' : 'drop-shadow(red 0px 0px 10px)' : undefined,
      }
    };

    const optionsFlexProps = {
      direction: "column",
      style: {
        alignItems: 'flex-start',
        marginTop: '1em',
        width: '7em',
        paddingTop: '2.5em',
      },
    }

    const presetModeFlexProps = {
      direction: "row",
      alignItems: "center",
    }

    return (
      <Flex { ...optionsFlexProps }>
        { withTooltip(OptionsButton(false)({ ...resetBoardButtonProps }), RESTART_TOOLTIP) }
        { this.props.store.puzzleMode ?
            withTooltip(OptionsButton()({ ...noSolutionButtonProps }), NO_SOLUTION_TOOLIP) :
            withTooltip(OptionsButton(this.props.store.showSolution)({ ...toggleSolutionButtonProps }), SOLUTION_TOOLIP)
        }
        <SpacerButton />
        <Flex { ...presetModeFlexProps }>
          { withTooltip(OptionsButton(this.props.store.presetMode)({ ...togglePresetModeProps }), PRESET_TOOLTIP) }
          { this.props.store.presetMode ? <BoardPicker /> : <FlexItem /> }
        </Flex>
        { withTooltip(OptionsButton(this.props.store.randomMode)({ ...randomModeButtonProps }), RANDOM_TOOLTIP) }
        { withTooltip(OptionsButton(this.props.store.puzzleMode)({ ...togglePuzzleModeProps }), PUZZLE_TOOLTIP) }
        <SpacerButton />
        { withTooltip(<PressCountText { ...pressCountTextProps } />, this.props.store.puzzleMode ? COUNT_LIMIT_TOOLTIP : COUNT_TOOLTIP )}
        <SpacerButton />
        { withTooltip(OptionsButton(this.props.store.playMusic)({ ...toggleMusicButtonProps }), MUSIC_TOOLTIP) }
      </Flex>
    )
  }
}