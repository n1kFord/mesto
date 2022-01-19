import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupProfileEdit = document.querySelector(".profile-edit-popup");
export const imagePopup = document.querySelector(".element-popup");
const popupCardAdd = document.querySelector(".card-add-popup");
export const imagePopupImage = document.querySelector(".element-popup__image");
export const imagePopupText = document.querySelector(".element-popup__text");
const editButton = document.querySelector(".profile__edit-button");
const closeIcons = document.querySelectorAll(".popup__close-icon");
const profileEditForm = document.querySelector(".popup__form_type_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");
const cardAddForm = document.querySelector(".popup__form_type_card-add");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_card-link");
const userName = document.querySelector(".profile__name");
const userAbout = document.querySelector(".profile__about");
const cardAddButton = document.querySelector(".profile__button");

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
/* включение валидации форм */
const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "popup__button_type_inactive",
};

const editFormValidator = new FormValidator(profileEditForm, config);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(cardAddForm, config);
cardFormValidator.enableValidation();

/* -------------- */

const cardContainer = document.querySelector(".elements");

function renderCard(text, img, cardSelector) {
  const card = new Card(text, img, cardSelector);
  const createdCard = card.generateCard();
  return createdCard;
}

function pushCard(newCard) {
  cardContainer.prepend(newCard);
}

initialCards.forEach((item) => {
  pushCard(renderCard(item.name, item.link, "element"));
}); /* первичное добавление 6-ти карточек */

cardAddButton.addEventListener("click", function () {
  openPopup(popupCardAdd);
});

export function openPopup(overlay) {
  overlay.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(overlay) {
  overlay.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

editButton.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
  editFormValidator.resetError();
  editFormValidator.enableSubmitButton();
  /* багфикс появления ошибки после перезахода в оверлей + активная кнопка, если при заходе в оверлей все инпуты валидны */

  openPopup(popupProfileEdit);
});

for (const closeIcon of closeIcons) {
  closeIcon.addEventListener("click", function () {
    const closestPopup = closeIcon.closest(".popup");
    closePopup(closestPopup);
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = aboutInput.value;
  userName.textContent = name;
  userAbout.textContent = about;
  closePopup(popupProfileEdit);
}

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  pushCard(renderCard(cardName, cardLink, "element"));
  cardAddForm.reset();
  /* добавление состоянии неактивности кнопки до закрытия попапа */
  cardFormValidator.disableSubmitButton();
  closePopup(popupCardAdd);
  /* -------------------- */
}

cardAddForm.addEventListener("submit", handleCardFormSubmit);

/* ------закрытие любого оверлея по нажатию за его пределами / по нажатию esc -------*/
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("popup")) {
      return;
    } else {
      closePopup(popup);
    }
  });
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
} /* ------- */
