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

  _resetFormErrors() {
    this._inputs.forEach((input) => {
      const errorMessage = this._form.querySelector(`.${input.id}-error`);
      errorMessage.textContent = "";
      input.classList.remove("popup__input_type_error");
    });
  } /* функция очистки от ошибок при закрытии попапа, сделал не через валидатор - ибо закрытие оверлея нужно реализовать в этом классе */

  closePopup() {
    super.closePopup();
    this._resetFormErrors();
    this._form.reset();
  }
}
