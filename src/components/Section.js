export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  updateItems(newItems) {
    this._renderedItems = newItems;
    this.renderItems();
  }

  clearItems() {
    this._renderItems = [];
    this._renderItems();
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
