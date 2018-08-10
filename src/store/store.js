import { action, observable, toJS } from 'mobx';
import * as Utils from '../utils';
import { playBGM, pauseBGM, playComplete, playPress, playJump, playError } from '../sfx';
import { GRID_DIMENSION } from '../constants';

class Store {
  @observable presetBoards = '';
  @observable board = {};
  @observable originalBoard = {};
  @observable solution = {};
  
  @observable playMusic = false;
  @observable showSolution = false;
  
  @observable puzzleMode = false;
  @observable presetMode = true;
  @observable randomMode = false;
  @observable presetBoardNumber = 1;
  @observable visitedLights = {};
  
  @observable mascotPosition = { x: 0, y: 0 };
  @observable mascotDirection = 'down';
  @observable mascotMoving = false;

  @observable pressCount = 0;
  @observable solved = false;
  @observable currentLight = Utils.middleLight();

  @action updateBoard (id) {
    playPress();
    this.board = Utils.pressLight(this.board, id);
    this.currentLight = id;
    this.pressCount++;
    this.solved = Utils.isBoardSolved(this.board);
    this.visitedLights[id] = true;
    if (this.solved) {
      const that = this;
      playComplete();
      setTimeout(() => {
        that.newBoard();
      }, 2000);
      this.presetBoardNumber++;
      if (this.presetBoardNumber > 100) {
        this.presetBoardNumber = 100;
      }
    }
  }

  @action loadBoardFromText (text) {
    if (this.presetBoardNumber > 100 || this.presetBoardNumber < 1) {
      return;
    }
    const lines = text.split(/\r?\n/);
    const startLine = (this.presetBoardNumber - 1) * 5;
    const endLine = startLine + 5;
    const board = {};
    const solution = {};

    for (let line = startLine; line < endLine; line++) {
      for (let char = 0; char < lines[line].length; char++) {
        if (char < 5) {
          if (lines[line].charAt(char) === 'X') {
            board[((line % 5) * GRID_DIMENSION) + char] = true;
          }
        } else {
          if (lines[line].charAt(char) === 'O') {
            solution[((line % 5) * GRID_DIMENSION) + (char - 5)] = true;
          }
        }
      }
    }

    this.board = board;
    this.visitedLights = {};
    this.originalBoard = toJS(this.board);
    this.solution = solution;
    this.solved = false;
    this.pressCount = 0;
  }

  @action newBoard () {
    this.showSolution = false;
    if (!this.presetMode) {
      const {
        board,
        solution,
      } = Utils.newBoard(this.presetMode ? this.presetBoardNumber : undefined);
      this.board = board;
      this.visitedLights = {};
      this.originalBoard = toJS(this.board);
      this.solution = solution;
      this.solved = false;
      this.pressCount = 0;
    } else {
      fetch('assets/data/boards.txt')
        .then(response => response.text())
        .then(text => this.loadBoardFromText(text));
    }
  }

  @action resetBoard () {
    this.board = toJS(this.originalBoard);
    this.solved = false;
    this.pressCount = 0;
    this.visitedLights = {};
  }

  @action toggleSolution () {
    if (!this.puzzleMode) {
      this.showSolution = !this.showSolution;
    }
  }

  @action toggleMusic () {
    this.playMusic = !this.playMusic;
    this.playMusic ? playBGM() : pauseBGM();
  }

  @action togglePuzzleMode () {
    this.puzzleMode = !this.puzzleMode;
    if (this.pressCount > 0) {
      this.resetBoard();
    }
  }

  @action togglePresetMode () {
    if (this.presetMode) {
      return;
    }
    this.presetMode = !this.presetMode;
    if (this.presetMode) {
      this.randomMode = false;
      this.newBoard();
    }
    if (this.pressCount > 0) {
      this.newBoard();
    }
  }

  @action toggleRandomMode () {
    if (this.randomMode) {
      return;
    }
    this.randomMode = !this.randomMode;
    if (this.randomMode) {
      this.presetMode = false;
      this.newBoard();
    }
    if (this.pressCount > 0) {
      this.newBoard();
    }
  }

  @action setPresetBoards (boards) {
    this.presetBoards = boards;
  }

  isIllegalMove = (id) => {
    let illegal = false;

    if (this.puzzleMode && this.visitedLights[id]) {
      illegal = true;
    }

    if (this.puzzleMode && this.pressCount === Object.keys(this.solution).length) {
      illegal = true;
    }

    if (illegal) {
      playError();
    }

    return illegal;
  };

  @action onLightPress (id, coordinates) {
    if (this.isIllegalMove(id)) {
      return;
    }
    this.updateBoard(id)
    playJump();
    this.mascotDirection = Utils.getDirection(this.mascotPosition, coordinates);
    this.mascotPosition = coordinates;
    this.mascotMoving = true;
  }

  @action mascotMoved () {
    this.mascotMoving = false;
  }

  @action initializeMascot (coordinates) {
    this.mascotDirection = Utils.getDirection(this.mascotPosition, coordinates);
    this.mascotPosition = coordinates;
    this.mascotMoving = true;
  }

  @action changePresetBoardNumber (number) {
    this.presetBoardNumber = number;
    this.newBoard();
  }
}

export default Store;