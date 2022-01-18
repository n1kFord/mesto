export default class FormValidator {
  constructor(form, data) {
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showError(form, input, errorMessageText, inputErrorClass) {
    const errorMessage = form.querySelector(`.${input.id}-error`);
    errorMessage.textContent = errorMessageText;
    input.classList.add(inputErrorClass);
  }

  hideError(form, input, inputErrorClass) {
    const errorMessage = form.querySelector(`.${input.id}-error`);
    errorMessage.textContent = "";
    input.classList.remove(inputErrorClass);
  }

  resetError(inputs) {
    inputs.forEach((input) => {
      this.hideError(this._form, input, this._inputErrorClass);
    });
  }

  hasInvalidInput(inputs) {
    return Array.from(inputs).some((el) => !el.validity.valid);
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  findFormInputs() {
    return this._form.querySelectorAll(this._inputSelector);
  }

  toggleButtonError(inputs) {
    if (this.hasInvalidInput(inputs)) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _checkIfInputValid(form, input, inputErrorClass) {
    if (!input.validity.valid) {
      this._showError(form, input, input.validationMessage, inputErrorClass);
    } else {
      this.hideError(form, input, inputErrorClass);
    }
  }

  _setInputListeners() {
    const inputs = this.findFormInputs();

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkIfInputValid(this._form, input, this._inputErrorClass);
        this.toggleButtonError(inputs);
      });
    });
  }

  enableValidation() {
    this._setInputListeners(this._form);
  }
}
