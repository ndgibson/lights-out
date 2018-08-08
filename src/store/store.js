import { action, observable, toJS } from 'mobx';
import * as Utils from '../utils';
import { backgroundMusic } from '../sfx';

class Store {
  @observable board = {};
  @observable originalBoard = {};
  @observable solution = {};
  
  @observable playMusic = false;
  @observable showSolution = false;
  
  @observable mascotPosition = { x: 0, y: 0 };
  @observable mascotMoving = false;

  @observable pressCount = 0;
  @observable solved = false;
  

  @action pressLight (id) {
    this.board = Utils.pressLight(this.board, id);
    this.pressCount++;
    this.solved = Utils.isBoardSolved(this.board);
  }

  @action newBoard () {
    const {
      board,
      solution,
    } = Utils.newBoard();
    this.board = board;
    this.originalBoard = toJS(this.board);
    this.solution = solution;
    this.pressCount = 0;
  }

  @action resetBoard () {
    this.board = toJS(this.originalBoard);
    this.pressCount = 0;
  }

  @action toggleSolution () {
    this.showSolution = !this.showSolution;
  }

  @action toggleMusic () {
    this.playMusic = !this.playMusic;
    this.playMusic ? backgroundMusic.play() : backgroundMusic.pause();
  }

  @action moveMascot (coordinates) {
    this.mascotPosition = coordinates;
    this.mascotMoving = true;
  }

  @action mascotMoved () {
    this.mascotMoving = false;
  }
}

export default Store;