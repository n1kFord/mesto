import './styles/index.css';

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Popup from "./components/Popup.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
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
} from "./utils/constants.js";
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

/* -------------- */
const popupWithImage = new PopupWithImage(".element-popup");
popupWithImage.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, "element", {
        handleCardClick: () => {
          popupWithImage.openPopup(item.name, item.link);
        },
      });
      const createdCard = card.generateCard();
      cardList.addItem(createdCard);
    },
  },
  ".elements"
);

cardList.renderItems(); /* первоначальное добавление карточек */

/* формы _________________________________________________*/
const cardAddFormPopup = new PopupWithForm(".card-add-popup", {
  formSubmit: (evt) => {
    evt.preventDefault();
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    const card = new Card(cardName, cardLink, "element", {
      handleCardClick: () => {
        popupWithImage.openPopup(cardName, cardLink);
      },
    });

    const createdCard = card.generateCard();
    cardList.addItem(createdCard);
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
  formSubmit: (evt) => {
    evt.preventDefault();
    user.setUserInfo({
      name: nameInput.value,
      about: aboutInput.value,
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
  cardAddFormPopup.openPopup();
});

/*-----------------------------------*/
