export default class UserInfo {
  constructor({ nameSelector, aboutSelector, imageSelector, id }) {
    this._id = id;
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._imageSelector = imageSelector;
    this._nameElement = document.querySelector(this._nameSelector);
    this._aboutElement = document.querySelector(this._aboutSelector);
    this._imageElement = document.querySelector(this._imageSelector);
    this._user = document.querySelector('.profile');
    
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameElement.textContent;
    userInfo.about = this._aboutElement.textContent;
    userInfo.image = this._imageElement.src;
    userInfo.id = this._id;
    return userInfo;
  }

  showId(){
    return this._id;
  }

  setUserInfo({ name, about, image, id}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._imageElement.src = image;
    this._id = id;
    this._user.id = id;
  }
}
