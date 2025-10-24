import booksRepository from "../Books/BooksRepository";

export default class StatsPresenter {
  load = async (callback) => {
    multiSubscribe(
      [
        [booksRepository.subscribeToLastAddedBook, ""],
        [booksRepository.subscribeToBookCount, 0],
      ],
      (results) => {
        const viewModel = {};
        viewModel.lastBook = results[0];
        viewModel.totalBookCount = results[1];
        callback(viewModel);
      },
    );
  };
}

/**
 * A tuple to hold a callback receiving observer function and a default value
 * @typedef {[() => Promise, number|Object|null]} SubWithDefault
 *
 * @example [loadMyData, {foo: null, bar: 0}]
 */

/**
 * @param {SubWithDefault[]} subsWithDefaults
 * @param {Function} callback receives a list of results, a mix of default values and actual values
 * @returns Promise this will resolve when every subscription has initially loaded
 */
function multiSubscribe(subsWithDefaults, singleCallback) {
  const results = subsWithDefaults.map((tuple) => tuple[1]); // ensures we have a valid default state
  const initialLoads = [];
  subsWithDefaults.forEach((tuple, index) => {
    const observerFunction = tuple[0];
    initialLoads.push(
      observerFunction((val) => {
        results[index] = val;
        singleCallback(results);
      }),
    );
  });
  return Promise.all(initialLoads);
}
