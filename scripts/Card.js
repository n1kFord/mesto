import {
  openPopup,
  imagePopup,
  imagePopupImage,
  imagePopupText,
} from "./index.js";
export default class Card {
  constructor(text, img, cardSelector) {
    this._text = text;
    this._img = img;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._cardSelector}`)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__text").textContent = this._text;

    this._element.querySelector(".element__image").src = this._img;
    this._element.querySelector(".element__image").alt = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        openPopup(imagePopup);
        imagePopupImage.src =
          this._element.querySelector(".element__image").src;
        imagePopupImage.alt =
          this._element.querySelector(".element__text").textContent;
        imagePopupText.textContent =
          this._element.querySelector(".element__text").textContent;
      });

    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._element
          .querySelector(".element__like")
          .classList.toggle("element__like_type_active");
      });

    this._element
      .querySelector(".element__delete-icon")
      .addEventListener("click", () => {
        this._element.remove();
      });
  }
}
