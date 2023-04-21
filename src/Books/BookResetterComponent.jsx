import BookResetterPresenter from "./BookResetterPresenter";
import React from "react";
export default function BookResetterComponent() {
  const presenter = new BookResetterPresenter();

  return (
    <div>
      <button onClick={presenter.reset}>Reset books</button>
    </div>
  );
}
