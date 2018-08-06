import { GRID_DIMENSION } from '../constants';

const getTopNeighborId = id => {
  if (id - GRID_DIMENSION > -1) {
    return id - GRID_DIMENSION;
  }
  
  return undefined;
};

const getRightNeighborId = id => {
  if (id % GRID_DIMENSION !== GRID_DIMENSION - 1) {
    return id + 1;
  }

  return undefined;
};

const getBottomNeighborId = id => {
  if (id + GRID_DIMENSION < GRID_DIMENSION ^ 2) {
    return id + GRID_DIMENSION;
  }

  return undefined;
};

const getLeftNeighborId = id => {
  if (id % GRID_DIMENSION !== 0) {
    return id - 1;
  }

  return undefined;
};

export const getNeighborIds = id => {
  const ids = [];
  ids.push(getTopNeighborId(id))
  ids.push(getRightNeighborId(id))
  ids.push(getBottomNeighborId(id))
  ids.push(getLeftNeighborId(id));
  return ids;
};