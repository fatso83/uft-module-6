import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";
import booksRepository from "./BooksRepository";

describe("add book", () => {
  it("should call api", async () => {
    const testHarness = new BookAdderTestHarness();
    await testHarness.init(() => {});
    await testHarness.addBook();
    expect(booksRepository.gateway.post).toHaveBeenCalledWith("/books", {
      author: "Author",
      name: "BookTitle",
      ownerId: "carlerik@gmail.com",
    });
  });

  it("should load and reload books", async () => {
    let viewModel = null;
    const testHarness = new BookAdderTestHarness();
    await testHarness.init((generatedViewModel) => {
      viewModel = generatedViewModel;
    });

    // anchor
    expect(viewModel.length).toBe(5);
    expect(viewModel[0].name).toBe("Moby Dick");
    expect(viewModel[4].name).toBe("The Hobbit");

    // pivot
    await testHarness.addBook("foo", "ar");
    expect(booksRepository.gateway.get).toHaveBeenCalledWith("/books");
    expect(viewModel.length).toBe(6);
    expect(viewModel[5].name).toBe("Wind in the willows");
  });
});
