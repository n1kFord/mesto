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
    this._renderedItems = [];
    let possibleTemplates = this._container.querySelectorAll(".template");
    this._container.innerHTML = ''; /* очищаем контейнер */
    possibleTemplates.forEach((item) => {
      this.addItem(item);
    }) /* возвращаем возможные template, ибо по моему мнению у классов Section - чаще всего должен быть template */
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
