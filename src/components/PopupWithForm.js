import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, { formSubmit }) {
    super(selector);
    this._formSubmit = formSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll("popup__input");
  }

  _getInputValues() {
    const object = {};
    this._inputs.forEach((input) => {
      object.input.name = input.value;
    });
    return object;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmit);
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
