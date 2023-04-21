import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";
import StatsPresenter from "./StatsPresenter";

describe("stats", () => {
  it("should show last added book and book count", async () => {
    let viewModel = null;
    const testHarness = new BookAdderTestHarness();
    const presenter = new StatsPresenter();
    await testHarness.init((_) => {});

    // anchor
    await presenter.load((gm) => (viewModel = gm));
    expect(viewModel.lastBook).toBe("");

    await testHarness.addBook();
    expect(viewModel.lastBook).toBe("BookTitle");
    expect(viewModel.totalBookCount).toBe(4);
  });
});
