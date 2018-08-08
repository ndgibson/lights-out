import { action, observable, toJS } from 'mobx';
import * as Utils from '../utils';
import { playBGM, pauseBGM, playComplete } from '../sfx';

class Store {
  @observable board = {};
  @observable originalBoard = {};
  @observable solution = {};
  
  @observable playMusic = false;
  @observable showSolution = false;
  
  @observable mascotPosition = { x: 0, y: 0 };
  @observable mascotDirection = 'down';
  @observable mascotMoving = false;

  @observable pressCount = 0;
  @observable solved = false;
  

  @action pressLight (id) {
    this.board = Utils.pressLight(this.board, id);
    this.pressCount++;
    this.solved = Utils.isBoardSolved(this.board);
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
    this.originalBoard = toJS(this.board);
    this.solution = solution;
    this.solved = false;
    this.pressCount = 0;
  }

  @action resetBoard () {
    this.board = toJS(this.originalBoard);
    this.solved = false;
    this.pressCount = 0;
  }

  @action toggleSolution () {
    this.showSolution = !this.showSolution;
  }

  @action toggleMusic () {
    this.playMusic = !this.playMusic;
    this.playMusic ? playBGM() : pauseBGM();
  }

  @action moveMascot (coordinates) {
    this.mascotDirection = Utils.getDirection(this.mascotPosition, coordinates);
    this.mascotPosition = coordinates;
    this.mascotMoving = true;
  }

  @action mascotMoved () {
    this.mascotMoving = false;
  }
}

export default Store;