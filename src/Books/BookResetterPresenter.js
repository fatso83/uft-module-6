import booksRepository from "./BooksRepository";
export default class BookResetterPresenter {
  reset = async () => {
    await booksRepository.reset();
  };
}
