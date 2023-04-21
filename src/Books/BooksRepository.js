import HttpGateway from "../Shared/HttpGateway";
import Observable from "../Shared/Observable";

class BooksRepository {
  gateway = new HttpGateway();
  booksPm = new Observable([]);
  lastAddedBookPm = new Observable("");

  subscribeToBooks = async (callback) => {
    this.booksPm.subscribe(callback);
    if (this.booksPm.value.length === 0) {
      await this.loadApiData();
    } else {
      this.refreshModelData(callback);
    }
  };

  addBook = async (programmersModel) => {
    let dto = {
      name: programmersModel.name,
      author: programmersModel.author,
      ownerId: "carlerik@gmail.com",
    };
    await this.gateway.post("/books", dto);
    await this.loadApiData();
    this.lastAddedBookPm.value = programmersModel.name;
  };

  subscribeToLastAddedBook = async (callback) => {
    this.lastAddedBookPm.subscribe(callback);
  };

  subscribeToBookCount = async (callback) => {
    this.booksPm.subscribe(() => callback(this.booksPm.value.length));
  };

  loadApiData = async () => {
    const dto = await this.gateway.get("/books");
    this.booksPm.value = dto.result.map((dtoItem) => {
      return dtoItem;
    });
  };

  refreshModelData = () => {
    this.booksPm.value = this.booksPm.value.map((pm) => {
      return pm;
    });
  };

  reset = async () => {
    await this.gateway.get("/reset");
    await this.loadApiData();
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
