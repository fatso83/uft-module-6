import HttpGateway from "../Shared/HttpGateway";
import Observable from "../Shared/Observable";
import sortingRepository from "./SortingRepository";

class BooksRepository {
  gateway = new HttpGateway();
  booksPm = new Observable([]);
  lastAddedBookPm = new Observable("");

  #order = null;

  constructor() {
    sortingRepository.subscribeToSortOrder((sortingOrder) => {
      this.#order = sortingOrder;
      this.#applyTransformationsAndUpdatePM(this.booksPm.value);
    });
  }

  subscribeToBooks = async (callback) => {
    this.booksPm.subscribe(callback);
    if (this.booksPm.value.length === 0) {
      await this.loadApiData();
    }
  };

  addBook = async (programmersModel) => {
    let dto = {
      name: programmersModel.name,
      author: programmersModel.author,
      ownerId: "carlerik@gmail.com",
    };

    // Fix for eventual consistency: optimistic update
    this.booksPm.value = this.booksPm.value.concat([dto]);

    await this.gateway.post("/books", dto);
    this.lastAddedBookPm.value = programmersModel.name;

    // eventual consistency for the key-value store often exceeds 2-3 seconds
    await this.loadApiData();
  };

  subscribeToLastAddedBook = async (callback) => {
    this.lastAddedBookPm.subscribe(callback);
  };

  subscribeToBookCount = async (callback) => {
    this.booksPm.subscribe(() => callback(this.booksPm.value.length));
  };

  loadApiData = async () => {
    const dto = await this.gateway.get("/books");
    const pmBooks = dto.result.map((dtoItem) => dtoItem);
    this.#applyTransformationsAndUpdatePM(pmBooks);
  };

  #applyTransformationsAndUpdatePM = (listOfPmBooks) => {
    this.booksPm.value = this.#applySorting(listOfPmBooks);
  };

  #applySorting = (list) => {
    if (["ASC", "DESC"].includes(this.#order)) {
      const direction = this.#order === "ASC" || -1;
      return list.slice().sort((a, b) => {
        return direction * a.name.localeCompare(b.name);
      });
    }
    return list;
  };

  reset = async () => {
    await this.gateway.get("/reset");
    await this.loadApiData();
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
