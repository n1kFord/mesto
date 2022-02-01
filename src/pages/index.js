import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  editButton,
  profileEditForm,
  nameInput,
  aboutInput,
  cardAddForm,
  cardNameInput,
  cardLinkInput,
  cardAddButton,
  initialCards,
  config,
} from "../utils/constants.js";
/* включение валидации форм */

const editFormValidator = new FormValidator(profileEditForm, config);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(cardAddForm, config);
cardFormValidator.enableValidation();

/* -------------- */

/* -------------- */
const popupWithImage = new PopupWithImage(".element-popup");
popupWithImage.setEventListeners();

function createCard(name, link) {
  const card = new Card(name, link, "element", {
    handleCardClick: () => {
      popupWithImage.openPopup(name, link);
    },
  });
  const createdCard = card.generateCard();
  return createdCard;
} /* функция создания карточки */

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = createCard(item.name, item.link);
      cardList.addItem(newCard);
    },
  },
  ".elements"
); /* секция карточек */

cardList.renderItems(); /* первоначальное добавление карточек */

/* формы _________________________________________________*/
const cardAddFormPopup = new PopupWithForm(".card-add-popup", {
  formSubmit: (data) => {
    const newCard = createCard(data.cardname, data.link);
    cardList.addItem(newCard);
    cardFormValidator.disableSubmitButton();
    cardAddFormPopup.closePopup();
  },
});

cardAddFormPopup.setEventListeners();

/*          /\/\/\/\/\             */

const user = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

const editFormPopup = new PopupWithForm(".profile-edit-popup", {
  formSubmit: (data) => {
    user.setUserInfo({
      name: data.fullname,
      about: data.about,
    });
    editFormPopup.closePopup();
  },
});

editFormPopup.setEventListeners();

editButton.addEventListener("click", function () {
  const userObjectInfo = user.getUserInfo();
  nameInput.value = userObjectInfo.name;
  aboutInput.value = userObjectInfo.about;
  editFormValidator.resetError();
  editFormValidator.enableSubmitButton();
  editFormPopup.openPopup();
});

cardAddButton.addEventListener("click", function () {
  cardFormValidator.resetError();
  cardAddFormPopup.openPopup();
});

/*-----------------------------------*/
