import { action, observable, toJS } from 'mobx';
import * as Utils from '../utils';

class Store {
  @observable board = {};
  @observable originalBoard = {};
  @observable pressCount = 0;
  @observable solved = false;

  @action pressLight (id) {
    this.board = Utils.pressLight(this.board, id);
    this.pressCount++;
    this.solved = Utils.isBoardSolved(this.board);
  }

  @action newBoard () {
    this.board = Utils.newBoard();
    this.originalBoard = toJS(this.board);
    this.pressCount = 0;
  }

  @action resetBoard () {
    this.board = toJS(this.originalBoard);
    this.pressCount = 0;
  }
}

export default Store;