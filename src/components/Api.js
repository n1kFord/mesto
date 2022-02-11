export default class Api {
  constructor(options) {
    this._adress = options.baseUrl;
    this._token = options.headers.authorization;
  }

  getInfoAboutUser() {
    return fetch(`${this._adress}/users/me`, {
      headers: {
        authorization: `${this._token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
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
    });
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
    });
  }

  getInitialCards() {
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: `${this._token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  getUserId() {
    this.getInfoAboutUser()
      .then((res) => {
        console.log("res.id: " + res._id);
        return res._id;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
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
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    });
  }

  likeCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    });
  }

  unlikeCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    });
  }
}
