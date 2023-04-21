export default class Observable {
  #_value = null;
  observers = [];
  parent = {};

  constructor(parent) {
    this.#_value = parent;
  }

  set value(newValue) {
    this.#_value = newValue;
    this.#notifyAll();
  }

  get value() {
    return this.#_value;
  }

  subscribe = (func) => {
    this.observers.push(func);
    this.#notify(func);
  };

  #notify = (observer) => {
    observer(this.#_value);
  };

  #notifyAll = () => {
    this.observers.forEach(this.#notify);
  };
}
