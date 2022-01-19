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

  _hasInvalidInput(inputs) {
    return Array.from(inputs).some((el) => !el.validity.valid);
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonError(inputs) {
    if (this._hasInvalidInput(inputs)) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  _checkIfInputValid(form, input, inputErrorClass) {
    if (!input.validity.valid) {
      this._showError(form, input, input.validationMessage, inputErrorClass);
    } else {
      this._hideError(form, input, inputErrorClass);
    }
  }

  _setInputListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkIfInputValid(this._form, input, this._inputErrorClass);
        this._toggleButtonError(this._inputs);
      });
    });
  }

  enableValidation() {
    this._setInputListeners(this._form);
  }
}
