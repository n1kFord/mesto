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
    console.log(inputErrorClass);
  }

  _hideError(form, input, inputErrorClass) {
    const errorMessage = form.querySelector(`.${input.id}-error`);
    errorMessage.textContent = "";
    input.classList.remove(inputErrorClass);
  }

  _hasInvalidInput(inputs) {
    return Array.from(inputs).some((el) => !el.validity.valid);
  }

  _toggleButtonError(inputs, button, inactiveButtonClass) {
    if (this._hasInvalidInput(inputs)) {
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
      this._hideError(form, input, inputErrorClass);
    }
  }

  _setInputListeners() {
    const inputs = this._form.querySelectorAll(this._inputSelector);
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        console.log(input);
        this._checkIfInputValid(this._form, input, this._inputErrorClass);
        this._toggleButtonError(
          inputs,
          submitButton,
          this._inactiveButtonClass
        );
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setInputListeners(this._form);
  }
}
