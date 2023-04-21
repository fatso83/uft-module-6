import React from "react";
import SortBooksPresenter from "./SortBooksPresenter";

const presenter = new SortBooksPresenter();
export default function SortComponent(props) {
  return (
    <div>
      <button onClick={() => presenter.setSortOrder("ASC")}>Ascending</button>
      <button onClick={() => presenter.setSortOrder("DESC")}>Descending</button>
    </div>
  );
}
