import booksRepository from "../Books/BooksRepository";
import AddBooksPresenter from "../Books/AddBooksPresenter";
import BookListPresenter from "../Books/BookListPresenter";
import GetPublicBooksStub from "./GetPublicBooksStub";
import Observable from "../Shared/Observable";

export default class BookAdderTestHarness {
  async init(callback) {
    const httpGateway = {};
    booksRepository.gateway = httpGateway;
    booksRepository.booksPm = new Observable([]);
    httpGateway.post = jest.fn();
    httpGateway.get = jest.fn(() => Promise.resolve(GetPublicBooksStub()));
    const bookListPresenter = new BookListPresenter();
    await bookListPresenter.load(callback);
  }

  async addBook() {
    jest.clearAllMocks();
    booksRepository.gateway.post = jest.fn();
    const getStubData = GetPublicBooksStub();
    booksRepository.gateway.get = jest.fn(() => Promise.resolve(getStubData));
    getStubData.result.push(getStubData.result[2]);
    const addBooksPresenter = new AddBooksPresenter();
    await addBooksPresenter.addBook("BookTitle", "Author");
  }
}
