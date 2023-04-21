import "./styles.css";

import AddBooksComponent from "./Books/AddBooksComponent";
import BookListComponent from "./Books/BookListComponent";
import BookResetterComponent from "./Books/BookResetterComponent";
import React from "react";
import ReactDOM from "react-dom";
import SortComponent from "./Books/SortComponent";
import StatsComponent from "./Stats/StatsComponent";

function App() {
  return (
    <>
      <div className="flex-row-container">
        <div className="flex-row-item">
          <AddBooksComponent />
          <BookResetterComponent />
        </div>
        <div className="flex-row-item">
          <StatsComponent />
        </div>
        <div className="flex-row-item">
          <BookListComponent />
        </div>
        <div className="flex-row-item">
          <SortComponent />
        </div>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
