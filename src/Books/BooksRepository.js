import HttpGateway from "../Shared/HttpGateway";
import Observable from "../Shared/Observable";

class BooksRepository {
  gateway = null;
  booksPm = null;
  lastAddedBookPm = null;
  mode = "books";

  constructor() {
    this.gateway = new HttpGateway();
    this.booksPm = new Observable([]);
    this.lastAddedBookPm = new Observable("");
  }

  getBooks = async (callback) => {
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
      ownerId: "carlerik@gmail.com"
    };
    await this.gateway.post("/books", dto);
    await this.loadApiData();
    this.lastAddedBookPm.value = programmersModel.name;
  };

  getLastAddedBook = async (callback) => {
    this.lastAddedBookPm.subscribe(callback);
  };

  loadApiData = async () => {
    const dto = await this.gateway.get("/" + this.mode);
    this.booksPm.value = dto.result.map((dtoItem) => {
      return dtoItem;
    });
  };

  refreshModelData = () => {
    this.booksPm.value = this.booksPm.value.map((pm) => {
      return pm;
    });
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
