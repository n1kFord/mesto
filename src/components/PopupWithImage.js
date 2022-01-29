import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popupElement.querySelector(
      ".element-popup__image"
    );
    this._popupText = this._popupElement.querySelector(".element-popup__text");
  }

  openPopup(text, img) {
    super.openPopup();
    this._popupText.textContent = text;
    this._popupImage.src = img;
    this._popupImage.alt = text;
  }
}
