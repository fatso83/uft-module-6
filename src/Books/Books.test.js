import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";
import BookResetterPresenter from "./BookResetterPresenter";
import SortBooksPresenter from "./SortBooksPresenter";
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

  it("should load and reload books unsorted by default", async () => {
    let viewModel = null;
    const testHarness = new BookAdderTestHarness();
    await testHarness.init((generatedViewModel) => {
      viewModel = generatedViewModel;
    });

    // anchor
    expect(viewModel.length).toBe(3);
    expect(viewModel[0].name).toBe("Wind in the willows");
    expect(viewModel[1].name).toBe("I, Robot");
    expect(viewModel[2].name).toBe("The Hobbit");

    // pivot
    await testHarness.addBook("foo", "ar");
    expect(booksRepository.gateway.get).toHaveBeenCalledWith("/books");
    expect(viewModel.length).toBe(3 + 1);
    expect(viewModel[3].name).toBe("The Hobbit");
  });
});

describe("resetting", () => {
  it("should reset the books list", async () => {
    let viewModel = null;
    const testHarness = new BookAdderTestHarness();
    await testHarness.init((generatedViewModel) => {
      viewModel = generatedViewModel;
    });

    // anchor
    expect(viewModel.length).toBe(3);

    const gatewayGetStub = (booksRepository.gateway.get = jest.fn(
      async (path) => {
        if (path === "/reset") return;
        return { result: [] };
      },
    ));

    const resetPresenter = new BookResetterPresenter();
    await resetPresenter.reset();
    expect(gatewayGetStub).toHaveBeenCalledWith("/reset");
    expect(gatewayGetStub).toHaveBeenCalledWith("/books");
    expect(viewModel.length).toBe(0);
  });
});

describe("sorting", () => {
  it("should sort ascending when asked", async () => {
    let viewModel = null;
    const testHarness = new BookAdderTestHarness();
    await testHarness.init((generatedViewModel) => {
      viewModel = generatedViewModel;
    });

    // anchor
    expect(viewModel.length).toBe(3);
    expect(viewModel[0].name).toBe("Wind in the willows");
    expect(viewModel[2].name).toBe("The Hobbit");

    const sortPresenter = new SortBooksPresenter();
    sortPresenter.setSortOrder("ASC");

    expect(viewModel[0].name).toBe("I, Robot");
    expect(viewModel[2].name).toBe("Wind in the willows");
  });

  it("should sort desscending when asked", async () => {
    let viewModel = null;
    const testHarness = new BookAdderTestHarness();
    await testHarness.init((generatedViewModel) => {
      viewModel = generatedViewModel;
    });

    // anchor
    expect(viewModel.length).toBe(3);
    expect(viewModel[0].name).toBe("Wind in the willows");
    expect(viewModel[2].name).toBe("The Hobbit");

    const sortPresenter = new SortBooksPresenter();
    sortPresenter.setSortOrder("DESC");

    expect(viewModel[0].name).toBe("Wind in the willows");
    expect(viewModel[2].name).toBe("I, Robot");
  });
});
