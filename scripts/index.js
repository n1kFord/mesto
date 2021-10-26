const popupProfileEdit = document.querySelector(".profile-edit-popup");
const popupElement = document.querySelector(".element-popup");
const popupCardAdd = document.querySelector(".card-add-popup");
const elementPopupImage = document.querySelector(".element-popup__image");
const elementPopupText = document.querySelector(".element-popup__text");
const editButton = document.querySelector(".profile__edit-button");
const closeIcons = document.querySelectorAll(".popup__close-icon");
const profileEditForm = document.querySelector(".popup__form_type_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");
const cardPopupForm = document.querySelector(".popup__form_type_card-add");
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

const cardTemplate = document.querySelector("#element").content;
const cardContainer = document.querySelector(".elements");
function createCard(text, img) {
  const card = cardTemplate.querySelector(".element").cloneNode(true);

  const cardText = card.querySelector(".element__text");
  const cardImage = card.querySelector(".element__image");
  const cardLike = card.querySelector(".element__like");
  const cardDeleteIcon = card.querySelector(".element__delete-icon");
  cardText.textContent = text;
  cardImage.src = img;
  cardImage.alt = text;

  cardImage.addEventListener("click", function () {
    openPopup(popupElement);
    elementPopupImage.src = cardImage.src;
    elementPopupText.textContent = cardText.textContent;
  });

  cardLike.addEventListener("click", function () {
    cardLike.classList.toggle("element__like_type_active");
  });

  cardDeleteIcon.addEventListener("click", function () {
    const fullElement = cardDeleteIcon.closest(".element");
    fullElement.remove();
  });
  return card;
} /* функция создания карточки*/

function renderCard(text, img) {
  const createdCard = createCard(text, img);
  cardContainer.prepend(createdCard);
} /* функция добавления карточки в контейнер*/

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
}); /* первичное добавление 6-ти карточек */

cardAddButton.addEventListener("click", function () {
  openPopup(popupCardAdd);
});

function openPopup(overlay) {
  overlay.classList.add("popup_opened");
}

function closePopup(overlay) {
  overlay.classList.remove("popup_opened");
}

editButton.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
  openPopup(popupProfileEdit);
});

for (const closeIcon of closeIcons) {
  closeIcon.addEventListener("click", function () {
    const closestPopup = closeIcon.closest(".popup");
    closePopup(closestPopup);
  });
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = aboutInput.value;
  userName.textContent = name;
  userAbout.textContent = about;
  closePopup(popupProfileEdit);
}

profileEditForm.addEventListener("submit", profileFormSubmitHandler);

function cardPopupFormSubmit(evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  renderCard(cardName, cardLink);
  cardNameInput.value = "";
  cardLinkInput.value = "";
  closePopup(popupCardAdd);
}

cardPopupForm.addEventListener("submit", cardPopupFormSubmit);
