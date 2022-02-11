import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup { /* считаю создание нового класса хорошим решением */
  constructor(selector, { submitFunction }) {
    super(selector);
    this._submitButton = this._popupElement.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
    this._form = this._popupElement.querySelector(".popup__form");
    this._id = "";
    this._submitFunction = submitFunction;
    this._onSubmitCallback = () => {};
  }

  openPopup(id, callback) {
    this._id = id;
    this._onSubmitCallback = callback;
    super.openPopup();
  }

  returnId() {
    return this._id;
  }

  renderLoader(isTrue) {
    if (isTrue) {
      this._submitButton.textContent = "Сохранение...";
    } else if (!isTrue) {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction();
      this._onSubmitCallback();
    });
  }
}
