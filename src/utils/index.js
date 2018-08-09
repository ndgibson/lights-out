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
  if (id + GRID_DIMENSION < Math.pow(GRID_DIMENSION, 2)) {
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
    nextBoard[light] = !nextBoard[light];
  });
  return nextBoard;
};

export const newBoard = () => {
  let board = {};
  let solution = {};
  for (let id = 0; id < Math.pow(GRID_DIMENSION, 2); id++) {
    if (Math.random() >= 0.5) {
      board = pressLight(board, id);
      solution[id] = true;
    }
  }
  return { 
    board,
    solution,
  };
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

export const getDirection = (current, next) => {
  let direction;
  const deltaX = Math.abs(next.x - current.x);
  const deltaY = Math.abs(next.y - current.y);
  if (deltaX === 0 && deltaY === 0) {
    return 'down';
  }
  if (deltaX > deltaY) {
    direction = next.x > current.x ? 'right' : 'left';
  } else {
    direction = next.y > current.y ? 'down' : 'up';
  }
  return direction;
}

export const middleLight = () => {
  return Math.floor((Math.pow(GRID_DIMENSION, 2) / 2));
}