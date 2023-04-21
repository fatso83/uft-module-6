import StatsPresenter from "./StatsPresenter";
import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";

describe("stats", () => {
  it("should show last added book", async () => {
    let viewModel = null;
    const testHarness = new BookAdderTestHarness();
    const presenter = new StatsPresenter();
    await testHarness.init((_) => {});

    // anchor
    await presenter.load((gm) => (viewModel = gm));
    expect(viewModel).toBe("");

    await testHarness.addBook();
    expect(viewModel).toBe("BookTitle");
  });
});
