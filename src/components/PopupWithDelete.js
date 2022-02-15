import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(selector, { submitFunction }) {
    super(selector);
    this._submitButton = this._popupElement.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
    this._form = this._popupElement.querySelector(".popup__form");
    this._id = "";
    this._item = null;
    this._submitFunction = submitFunction;
  }

  openPopup(id, item) {
    this._id = id;
    this._item = item;
    super.openPopup();
  }

  returnId() {
    return this._id;
  }

  returnItem() {
    return this._item;
  }

  renderLoader(isTrue) {
    if (isTrue) {
      this._submitButton.textContent = "Удаление...";
      this._submitButton.disabled = true;
    } else if (!isTrue) {
      this._submitButton.textContent = this._submitButtonText;
      this._submitButton.disabled = false;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction();
    });
  }
}
