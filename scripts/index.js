let popup = document.querySelector('.popup');
let popupOpened = document.querySelector('.popup_opened');
let editButton = document.querySelector('.profile__info__edit-button');
let closeIcon = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__container__input-name');
let aboutInput = document.querySelector('.popup__container__input-about');

let userName = document.querySelector('.profile__info__title');
let userAbout = document.querySelector('.profile__info__subtitle');

editButton.addEventListener('click', function(){
    popup.classList.add('popup_opened');
})

closeIcon.addEventListener('click', function(){
    popup.classList.remove('popup_opened'); /* подумывал о закрытии через нажатие по самому оверлею или по крестику. */ 
})

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let name = nameInput.value;
    let about = aboutInput.value;
    userName.textContent = name;
    userAbout.textContent = about;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
let elementLikes = document.querySelectorAll('.elements__card__like');
for (let elementLike of elementLikes) {
    elementLike.addEventListener('click', function(){
        let realSrc = elementLike.getAttribute('src');
        if (realSrc !== "images/elements__card__like_active.svg"){
            elementLike.setAttribute('src', 'images/elements__card__like_active.svg');
        } else{
            elementLike.setAttribute('src', 'images/elements__card__like.svg');
        }
    });
  };
