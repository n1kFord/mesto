export default class FormValidator {
  constructor(form, data) {
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
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

  hasInvalidInput(inputs) {
    return Array.from(inputs).some((el) => !el.validity.valid);
  }

  disableSubmitButton(form) {
    const submitButton = form.querySelector(this._submitButtonSelector);
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }

  toggleButtonError(inputs, button, inactiveButtonClass) {
    if (this.hasInvalidInput(inputs)) {
      button.classList.add(inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(inactiveButtonClass);
      button.disabled = false;
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
    const inputs = this._form.querySelectorAll(this._inputSelector);
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkIfInputValid(this._form, input, this._inputErrorClass);
        this.toggleButtonError(inputs, submitButton, this._inactiveButtonClass);
      });
    });
  }

  enableValidation() {
    this._setInputListeners(this._form);
  }
}
