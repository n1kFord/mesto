export default class FormValidator {
  constructor(form, data) {
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputs = this._form.querySelectorAll(this._inputSelector);
  }

  _showError(form, input, errorMessageText, inputErrorClass) {
    const errorMessage = form.querySelector(`.${input.id}-error`);
    errorMessage.textContent = errorMessageText;
    input.classList.add(inputErrorClass);
  }

  _hideError(form, input, inputErrorClass) {
    const errorMessage = form.querySelector(`.${input.id}-error`);
    errorMessage.textContent = "";
    input.classList.remove(inputErrorClass);
  }

  resetError() {
    this._inputs.forEach((input) => {
      this._hideError(this._form, input, this._inputErrorClass);
    });
  }

  _hasInvalidInput() {
    return Array.from(this._inputs).some((el) => !el.validity.valid);
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonError() {
    if (this._hasInvalidInput(this._inputs)) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  _checkIfInputValid(input) {
    if (!input.validity.valid) {
      this._showError(
        this._form,
        input,
        input.validationMessage,
        this._inputErrorClass
      );
    } else {
      this._hideError(this._form, input, this._inputErrorClass);
    }
  }

  _setInputListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkIfInputValid(input);
        this._toggleButtonError(this._inputs);
      });
    });
  }

  enableValidation() {
    this._setInputListeners();
  }
}
