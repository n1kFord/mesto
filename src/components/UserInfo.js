export default class UserInfo {
  constructor({ nameSelector, aboutSelector, imageSelector }) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._imageSelector = imageSelector;
    this._nameElement = document.querySelector(this._nameSelector);
    this._aboutElement = document.querySelector(this._aboutSelector);
    this._imageElement = document.querySelector(this._imageSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameElement.textContent;
    userInfo.about = this._aboutElement.textContent;
    userInfo.image = this._imageElement.src;
    return userInfo;
  }

  setUserInfo({ name, about, image}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._imageElement.src = image;
  }
}
