import AddBooksPresenter from "../Books/AddBooksPresenter";
import BookListPresenter from "../Books/BookListPresenter";
import { GetPrivateBooksStub } from "./GetPrivateBooksStub";
import GetPublicBooksStub from "./GetPublicBooksStub";
import Observable from "../Shared/Observable";
import SortBooksPresenter from "../Books/SortBooksPresenter";
import booksRepository from "../Books/BooksRepository";

export default class BookAdderTestHarness {
  async init(callback) {
    const httpGateway = {};
    httpGateway.post = jest.fn();
    httpGateway.get = jest.fn((path) =>
      path === "/allbooks" ? GetPublicBooksStub() : GetPrivateBooksStub()
    );
    booksRepository.gateway = httpGateway;
    booksRepository.booksPm = new Observable([]);
    const sortPresenter = new SortBooksPresenter();
    sortPresenter.setSortOrder(null);
    const bookListPresenter = new BookListPresenter();
    await bookListPresenter.load(callback);
  }

  async addBook() {
    jest.clearAllMocks();
    booksRepository.gateway.post = jest.fn();
    const getStubData = GetPrivateBooksStub();
    booksRepository.gateway.get = jest.fn(() => Promise.resolve(getStubData));
    getStubData.result.push(getStubData.result[2]);
    const addBooksPresenter = new AddBooksPresenter();
    await addBooksPresenter.addBook("BookTitle", "Author");
  }
}
