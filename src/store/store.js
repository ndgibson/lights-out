import { action, observable, toJS } from 'mobx';
import * as Utils from '../utils';
import { backgroundMusic } from '../sfx';

class Store {
  @observable board = {};
  @observable originalBoard = {};
  @observable pressCount = 0;
  @observable showSolution = false;
  @observable solved = false;
  @observable solution = {};
  @observable playMusic = false;

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
    if (this.playMusic) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }
}

export default Store;