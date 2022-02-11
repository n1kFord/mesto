export default class Card {
  constructor(
    text,
    img,
    id,
    cardId,
    userId,
    cardSelector,
    {
      handleCardClick,
      handleDeleteCardClick,
      handleLikeEvent,
      handleDislikeEvent,
    }
  ) {
    this._text = text;
    this._img = img;
    this._id = id;
    this._cardOwnerId = cardId;
    this._userId = userId;
    this._likesCounter = undefined;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeEvent = handleLikeEvent;
    this._handleDislikeEvent = handleDislikeEvent;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._cardSelector}`)
      .content.querySelector(".element")
      .cloneNode(true);

    this._likesCounter = cardElement.querySelector('.element__counter');

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

  isOwner() {
    if (this._cardOwnerId === this._userId) {
      return true;
    }

    return false;
  }

  addLikes(num) {
    let value = parseInt(this._likesCounter.textContent, 10);
    value += num;
    this._likesCounter.textContent = value;
  }

  subtractLikes(num) {
    let value = parseInt(this._likesCounter.textContent, 10);
    value -= num;
    this._likesCounter.textContent = value;
  }

  _setEventListeners() {
    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("element__image")) {
        /* багфикс открытия попапа при нажатии на карточку за пределами изображения */
        this._handleCardClick();
      }
    });

    this._buttonLike = this._element.querySelector(".element__like");

    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.classList.contains("element__like_type_active")) {
        this._buttonLike.classList.remove("element__like_type_active");
        this._handleDislikeEvent(); /* нашел недоработку, дизлайк работает только до перезапуска. если лайкнуть и перезагрузить страницу - 
        то по первому нажатию сначало будет лайк. не знаю как проверять наличие моего лайка через сервер. */
      } else {
        this._buttonLike.classList.add("element__like_type_active");
        this._handleLikeEvent();
      }
    });

    if (!this.isOwner()) { /* проверка на авторство */
      let deleteIcon = this._element.querySelector(".element__delete-icon");
      deleteIcon.remove();
      deleteIcon = null;
    } else {
      this._element
        .querySelector(".element__delete-icon")
        .addEventListener("click", () => {
          const callback = () => {
            this._element.remove();
            this._element = null;
          };
          this._handleDeleteCardClick(callback);
        });
    }
  }
}
