export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    this._closeIcon = this._popupElement.querySelector(".popup__close-icon");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close-icon")
      ) {
        this.closePopup();
      }
    });
  }
}
