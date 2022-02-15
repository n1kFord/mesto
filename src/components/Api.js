export default class Api {
  constructor(options) {
    this._adress = options.baseUrl;
    this._token = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInfoAboutUser() {
    return fetch(`${this._adress}/users/me`, {
      headers: {
        authorization: `${this._token}`,
      },
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  setInfoAboutUser(info) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${info.fullname}`,
        about: `${info.about}`,
      }),
    }).then(this._checkResponse);
  }

  uploadNewAvatar(link) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `${link}`,
      }),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: `${this._token}`,
      },
    })
      .then(this._checkResponse)
      .then((data) => {
        return data.reverse(); /* теперь карточки выводятся в начале */
      });
  }

  addNewCard(info) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${info.cardname}`,
        link: `${info.link}`,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}
