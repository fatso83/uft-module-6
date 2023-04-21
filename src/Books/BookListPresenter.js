import booksRepository from "./BooksRepository.js";

export default class BookListPresenter {
  load = async (callback) => {
    await booksRepository.subscribeToBooks((booksPm) => {
      const booksVm = booksPm.map((bookPm) => {
        return { name: bookPm.name, author: bookPm.author };
      });
      callback(booksVm);
    });
  };
}
