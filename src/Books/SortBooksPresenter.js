import sortingRepository from "./SortingRepository";

export default class SortBooksPresenter {
  setSortOrder = (order) => {
    sortingRepository.setSortOrder(order);
  };
}
