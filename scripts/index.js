let popup = document.querySelector(".popup");
let popupOpened = document.querySelector(".popup_opened");
let editButton = document.querySelector(".profile__edit-button");
let closeIcon = document.querySelector(".popup__close-icon");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let aboutInput = document.querySelector(".popup__input_type_about");
let userName = document.querySelector(".profile__name");
let userAbout = document.querySelector(".profile__about");

function openPopup() {
  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}
editButton.addEventListener("click", openPopup);

closeIcon.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let about = aboutInput.value;
  userName.textContent = name;
  userAbout.textContent = about;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
