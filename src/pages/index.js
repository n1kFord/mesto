import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import {
  editButton,
  profileEditForm,
  nameInput,
  aboutInput,
  cardAddForm,
  cardNameInput,
  cardLinkInput,
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

const cardDeletePopup = new PopupWithSubmit(".card-delete-popup", {
  submitFunction: () => {
    api
      .deleteCard(cardDeletePopup.returnId())
      .then(() => {
        cardDeletePopup.closePopup();
      })
      .catch((err) => {
        console.log(err);
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

function createCard(name, link, id, ownerId, userId) {
  const card = new Card(name, link, id, ownerId, userId, "element", {
    handleCardClick: () => {
      popupWithImage.openPopup(name, link);
    },
    handleDeleteCardClick: (callback) => {
      cardDeletePopup.openPopup(
        id,
        callback
      ); /* так-же баг: карточку нельзя удалить после создания, только после перезагрузки */
    },
    handleLikeEvent: () => {
      api
        .likeCard(id)
        .then(() => {
          card.addLikes(1);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleDislikeEvent: () => {
      api
        .unlikeCard(id)
        .then(() => {
          card.subtractLikes(1);
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
      const card = createCard(item.name, item.link, item._id, item.owner._id);
      cardList.addItem(card);
    },
  },
  ".elements"
);

api
  .getInitialCards()
  .then((cards) => {
    api
      .getInfoAboutUser()
      .then((res) => {
        cards.forEach((card) => {
          const newCard = createCard(
            card.name,
            card.link,
            card._id,
            card.owner._id,
            res._id
          );
          newCard.querySelector(".element__counter").textContent =
            card.likes.length;
          cardList.addItem(
            newCard
          ); /* все это сделано только для возможности получения айди пользователя в this в Card, а позже проверять на isOwner */
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  }); /* первоначальное добавление карточек */
/* формы и api_________________________________________________*/
const cardAddFormPopup = new PopupWithForm(".card-add-popup", {
  formSubmit: (data) => {
    const newCard = createCard(data.cardname, data.link);
    cardList.addItem(newCard);
    cardAddFormPopup.renderLoader(true);
    api
      .addNewCard(
        data
      ) /* так-же баг, лайкнуть вновь создавшуюся карточку нельзя, только при перезагрузке */
      .then(() => {
        cardFormValidator.disableSubmitButton();
        cardAddFormPopup.renderLoader(false);
        cardAddFormPopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  },
});

cardAddFormPopup.setEventListeners();

/*          /\/\/\/\/\             */

const user = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  imageSelector: ".profile__image",
});

api
  .getInfoAboutUser()
  .then((info) => {
    user.setUserInfo({
      name: info.name,
      about: info.about,
      image: info.avatar,
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  }); /* изменение информации пользователя в следствии прихода данных с сервера */

const editFormPopup = new PopupWithForm(".profile-edit-popup", {
  formSubmit: (data) => {
    const userinfoATM =
      user.getUserInfo(); /* информация о пользователе в данный момент */
    user.setUserInfo({
      name: data.fullname,
      about: data.about,
      image: userinfoATM.image,
    });
    editFormPopup.renderLoader(true);
    api
      .setInfoAboutUser(data)
      .then(() => {
        editFormPopup.renderLoader(false);
        editFormPopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  },
});

editFormPopup.setEventListeners();

const newAvatarFormPopup = new PopupWithForm(".new-avatar-popup", {
  formSubmit: (data) => {
    const userinfoATM =
      user.getUserInfo(); /* информация о пользователе в данный момент */
    user.setUserInfo({
      name: userinfoATM.name,
      about: userinfoATM.about,
      image: data.avatarlink,
    });
    newAvatarFormPopup.renderLoader(true);
    api
      .uploadNewAvatar(data.avatarlink)
      .then(() => {
        newAvatarFormPopup.renderLoader(false);
        newAvatarFormPopup.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  },
});

newAvatarFormPopup.setEventListeners();

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
