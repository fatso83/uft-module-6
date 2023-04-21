import Observable from "../Shared/Observable";

class SortingRepository {
  #orderPm = new Observable(null);

  setSortOrder = async (direction) => {
    this.#orderPm.value = direction; // triggers update
  };

  subscribeToSortOrder(cb) {
    this.#orderPm.subscribe(cb);
  }
}
export default new SortingRepository();
