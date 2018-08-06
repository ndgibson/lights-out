import { GRID_DIMENSION } from '../constants';

const getTopNeighbor = id => {
  if (id - GRID_DIMENSION > -1) {
    return id - GRID_DIMENSION;
  }
  
  return undefined;
};

const getRightNeighbor = id => {
  if (id % GRID_DIMENSION !== GRID_DIMENSION - 1) {
    return id + 1;
  }

  return undefined;
};

const getBottomNeighbor = id => {
  if (id + GRID_DIMENSION < GRID_DIMENSION ^ 2) {
    return id + GRID_DIMENSION;
  }

  return undefined;
};

const getLeftNeighbor = id => {
  if (id % GRID_DIMENSION !== 0) {
    return id - 1;
  }

  return undefined;
};

const getNeighborLights = id => {
  const ids = [];
  ids.push(getTopNeighbor(id))
  ids.push(getRightNeighbor(id))
  ids.push(getBottomNeighbor(id))
  ids.push(getLeftNeighbor(id));
  return ids;
};

export const pressLight = (board, id) => {
  const nextBoard = board;
  const neighborLights = getNeighborLights(id);
  nextBoard[id] = !nextBoard[id];
  neighborLights.forEach(light => {
    if (typeof light !== 'undefined') {
      nextBoard[light] = !nextBoard[light];
    }
  });
  return nextBoard;
};

export const newBoard = () => {
  let board = {};
  for (let i = 0; i < 25; i++) {
    if (Math.random() >= 0.5) {
      board = pressLight(board, i);
    }
  }
  return board;
};

export const isBoardSolved = board => {
  let result = true;

  for (const light in board) {
    if (board[light]) {
      result = false;
    }
  }

  return result;
}