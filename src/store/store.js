import { action, observable, toJS } from 'mobx';
import * as Utils from '../utils';
import { playBGM, pauseBGM, playComplete, playPress, playJump } from '../sfx';

class Store {
  @observable board = {};
  @observable originalBoard = {};
  @observable solution = {};
  
  @observable playMusic = false;
  @observable showSolution = false;
  
  @observable puzzleMode = false;
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
      playComplete();
    }
  }

  @action newBoard () {
    const {
      board,
      solution,
    } = Utils.newBoard();
    this.board = board;
    this.visitedLights = {};
    this.originalBoard = toJS(this.board);
    this.solution = solution;
    this.solved = false;
    this.pressCount = 0;
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
      this.newBoard();
    }
  }

  isIllegalMove = (id) => {
    if (this.puzzleMode && this.visitedLights[id]) {
      return true;
    }

    if (this.puzzleMode && this.pressCount === 15) {
      return true;
    }

    return false;
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
}

export default Store;