export default class Card {
  constructor(
    text,
    img,
    id,
    likes,
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
    this._likes = likes;
    this._cardOwnerId = cardId;
    this._userId = userId;
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

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__text").textContent = this._text;
    this._likesCounter = this._element.querySelector(".element__counter");
    this._cardImage = this._element.querySelector(".element__image");
    this._buttonLike = this._element.querySelector(".element__like");
    this._cardImage.src = this._img;
    this._cardImage.alt = this._text;
    this._setEventListeners();
    this._setLikes();
    this._renderUserLikes();
    return this._element;
  }

  isOwner() {
    if (this._cardOwnerId === this._userId) {
      return true;
    }
    return false;
  }

  _setLikes() {
    this._likesCounter.textContent = this._likes.length;
  }

  toggleLikeState() {
    this._buttonLike.classList.toggle("element__like_type_active");
  }

  updateLikes(num) {
    this._likesCounter.textContent = num;
  }

  showCard() {
    return this._element;
  }

  _renderUserLikes() { /* рендерим цвет лайков понравившихся карточек после перезагрузки */
    this._likes.forEach((userLike) => {
      if (userLike._id === this._userId) {
        this.toggleLikeState();
      }
    });
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.classList.contains("element__like_type_active")) {
        this._handleDislikeEvent();
      } else {
        this._handleLikeEvent();
      }
    });

    if (!this.isOwner()) {
      /* проверка на авторство */
      let deleteIcon = this._element.querySelector(".element__delete-icon");
      deleteIcon.remove();
      deleteIcon = null;
    } else {
      this._element
        .querySelector(".element__delete-icon")
        .addEventListener("click", () => {
          this._handleDeleteCardClick();
        });
    }
  }
}
