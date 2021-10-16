let popup = document.querySelector(".popup");
let elementPopup = document.querySelector(".element-popup");
let elementPopupImage = document.querySelector(".element-popup__image");
let elementPopupText = document.querySelector(".element-popup__text");
let editButton = document.querySelector(".profile__edit-button");
let closeIcon = document.querySelector(".popup__close-icon");
let elementPopupCloseIcon = document.querySelector(
  ".element-popup__close-icon"
);
let addCardPopup = document.querySelector(".popup-card-add");
let cardPopupCloseIcon = document.querySelector(".popup-card-add__close-icon");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let aboutInput = document.querySelector(".popup__input_type_about");
let cardPopupForm = document.querySelector(".popup-card-add__form");
let cardNameInput = document.querySelector(".popup__input_type_card-name");
let cardLinkInput = document.querySelector(".popup__input_type_card-link");
let userName = document.querySelector(".profile__name");
let userAbout = document.querySelector(".profile__about");
let cardAddButton = document.querySelector(".profile__button");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#element").content;
const cardContainer = document.querySelector(".elements");

function renderCard(text, img) {
  const card = cardTemplate.querySelector(".element").cloneNode(true);

  const cardText = card.querySelector(".element__text");
  const cardImage = card.querySelector(".element__image");

  cardText.textContent = text;
  cardImage.src = img;

  cardContainer.append(card);
} /* функция добавления карточки */

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
}); /* первичное добавление 6-ти карточек */

document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("element__like")) {
    event.target.classList.toggle("element__like_type_active");
  } else if (event.target.classList.contains("element__image")) {
    elementPopup.classList.toggle("element-popup_opened");
    elementPopupImage.src = event.target.src;

    let fullElement = event.target.closest(".element");

    let elementText = fullElement.querySelector(".element__text");

    elementPopupText.textContent = elementText.textContent;
  } else if (event.target.classList.contains("element__delete-icon")) {
    let fullElement = event.target.closest(".element");
    fullElement.remove();
  }
});

cardAddButton.addEventListener("click", function () {
  addCardPopup.classList.toggle("popup-card-add_opened");
});

cardPopupCloseIcon.addEventListener("click", function () {
  addCardPopup.classList.remove("popup-card-add_opened");
});
function openPopup() {
  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
  elementPopup.classList.remove("element-popup_opened");
}

editButton.addEventListener("click", openPopup);

closeIcon.addEventListener("click", closePopup);
elementPopupCloseIcon.addEventListener("click", closePopup);
function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let about = aboutInput.value;
  userName.textContent = name;
  userAbout.textContent = about;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

function cardPopupFormSubmit(evt) {
  evt.preventDefault();
  let cardName = cardNameInput.value;
  let cardLink = cardLinkInput.value;
  renderCard(cardName, cardLink);
  addCardPopup.classList.remove("popup-card-add_opened");
}

cardPopupForm.addEventListener("submit", cardPopupFormSubmit);
