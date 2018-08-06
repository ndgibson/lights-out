import { action, observable } from 'mobx';
import { getNeighborIds } from '../utils';

class Store {
  @observable lightbuttons = {};

  @action clickLightButton (id) {
      const newLightButtons = this.lightbuttons;
      const neighborIds = getNeighborIds(id);

      newLightButtons[id] = !newLightButtons[id];
      neighborIds.forEach(neighborId => {
        if (neighborId) {
          newLightButtons[neighborId] = !newLightButtons[neighborId];
        }
      });
      this.lightbuttons = newLightButtons;
  }
}

export default Store;