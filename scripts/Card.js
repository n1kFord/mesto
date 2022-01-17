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

    this._cardImage = this._element.querySelector(".element__image");
    this._cardImage.src = this._img;
    this._cardImage.alt = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        openPopup(imagePopup);
        imagePopupImage.src = this._img;
        imagePopupImage.alt = this._text;
        imagePopupText.textContent = this._text;
      });

    this._buttonLike = this._element.querySelector(".element__like");

    this._buttonLike.addEventListener("click", () => {
      this._buttonLike.classList.toggle("element__like_type_active");
    });

    this._element
      .querySelector(".element__delete-icon")
      .addEventListener("click", () => {
        this._element.remove();
        this._element = null;
      });
  }
}
