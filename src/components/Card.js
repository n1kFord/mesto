export default class Card {
  constructor(text, img, cardSelector, { handleCardClick }) {
    this._text = text;
    this._img = img;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("element__image")) { /* багфикс открытия попапа при нажатии на карточку за пределами изображения */
        this._handleCardClick();
      }
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
