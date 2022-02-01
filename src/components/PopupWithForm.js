import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, { formSubmit }) {
    super(selector);
    this._formSubmit = formSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
