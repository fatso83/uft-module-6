import React, { useEffect, useState } from "react";

import BookListPresenter from "./BookListPresenter";

export default function BookListComponent() {
  const booksPresenter = React.useMemo(() => new BookListPresenter(), []);
  const [stateViewModel, copyViewModelToStateViewModel] = useState([]);

  useEffect(() => {
    booksPresenter.load((generatedViewModel) => {
      copyViewModelToStateViewModel(generatedViewModel);
    });
  }, [booksPresenter]);

  return (
    <div>
      <h5 className="book-list-title">Book List (api)</h5>
      <div>
        {stateViewModel.map((book, i) => {
          return <div key={i}>{book.name}</div>;
        })}
      </div>
    </div>
  );
}
