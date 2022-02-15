import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import {
  editButton,
  profileEditForm,
  nameInput,
  aboutInput,
  cardAddForm,
  cardAddButton,
  avatarEditButton,
  newAvatarForm,
  config,
} from "../utils/constants.js";

/* включение валидации форм */

const editFormValidator = new FormValidator(profileEditForm, config);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(cardAddForm, config);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(newAvatarForm, config);
avatarFormValidator.enableValidation();
/* -------------- */

/* -------------- */
const popupWithImage = new PopupWithImage(".element-popup");
popupWithImage.setEventListeners();

const cardDeletePopup = new PopupWithDelete(".card-delete-popup", {
  submitFunction: () => {
    cardDeletePopup.renderLoader(true);
    api
      .deleteCard(cardDeletePopup.returnId())
      .then(() => {
        let card = cardDeletePopup.returnItem();
        card.remove();
        card = null;
        cardDeletePopup.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        cardDeletePopup.renderLoader(false);
      });
  },
});
cardDeletePopup.setEventListeners(); /* попап удаления карточки */

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-35",
  headers: {
    authorization: "21fda1be-d25d-4e26-98fa-e3e3d631dc10",
    "Content-Type": "application/json",
  },
}); /* api */

function createCard(name, link, id, likes, cardId, userId) {
  const card = new Card(name, link, id, likes, cardId, userId, "element", {
    handleCardClick: () => {
      popupWithImage.openPopup(name, link);
    },
    handleDeleteCardClick: () => {
      cardDeletePopup.openPopup(id, card.showCard());
    },
    handleLikeEvent: () => {
      api
        .likeCard(id)
        .then((data) => {
          card.toggleLikeState();
          card.updateLikes(data.likes.length);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleDislikeEvent: () => {
      api
        .unlikeCard(id)
        .then((data) => {
          card.toggleLikeState();
          card.updateLikes(data.likes.length);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });
  const createdCard = card.generateCard();
  return createdCard;
} /* функция создания карточки */

const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createCard(
        item.name,
        item.link,
        item._id,
        item.likes,
        item.owner._id,
        user.showId()
      );
      cardList.addItem(card);
    },
  },
  ".elements"
);

const user = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  imageSelector: ".profile__image",
  id: "",
});

Promise.all([api.getInfoAboutUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo({
      name: userData.name,
      about: userData.about,
      image: userData.avatar,
      id: userData._id,
    });
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  }); /* первоначальное добавление карточек и данных о пользователе */

/* формы и api_________________________________________________*/
const cardAddFormPopup = new PopupWithForm(".card-add-popup", {
  formSubmit: (data) => {
    cardAddFormPopup.renderLoader(true);

    api
      .addNewCard(data)
      .then((card) => {
        const newCard = createCard(
          card.name,
          card.link,
          card._id,
          card.likes,
          card.owner._id,
          user.showId()
        );
        cardList.addItem(newCard);
        cardFormValidator.disableSubmitButton();
        cardAddFormPopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        cardAddFormPopup.renderLoader(false);
      });
  },
});

cardAddFormPopup.setEventListeners();

const editFormPopup = new PopupWithForm(".profile-edit-popup", {
  formSubmit: (data) => {
    editFormPopup.renderLoader(true);
    api
      .setInfoAboutUser(data)
      .then((info) => {
        console.log(info);
        user.setUserInfo({
          name: info.name,
          about: info.about,
          image: info.avatar,
          id: info._id,
        });
        editFormPopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editFormPopup.renderLoader(false);
      });
  },
});

editFormPopup.setEventListeners();

const newAvatarFormPopup = new PopupWithForm(".new-avatar-popup", {
  formSubmit: (data) => {
    newAvatarFormPopup.renderLoader(true);
    api
      .uploadNewAvatar(data.avatarlink)
      .then((info) => {
        user.setUserInfo({
          name: info.name,
          about: info.about,
          image: info.avatar,
          id: info._id,
        });
        newAvatarFormPopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        newAvatarFormPopup.renderLoader(false);
      });
  },
});

newAvatarFormPopup.setEventListeners();
/*___________________________________*/

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

avatarEditButton.addEventListener("click", function () {
  avatarFormValidator.resetError();
  avatarFormValidator.disableSubmitButton();
  newAvatarFormPopup.openPopup();
});

/*-----------------------------------*/
