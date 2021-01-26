export class Api {
  constructor(baseUrl, authorization, contentType) {
    this.headers = { authorization, 'Content-Type': contentType };
    this.baseUrl = baseUrl;
  }

  getCard() {
    return fetch(`${this.baseUrl}cards`, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.statusText));
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.statusText));
      });
  }

  setUserInfo(data) {
    return fetch(`${this.baseUrl}users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.statusText));
      });
  }

  setUserAvatar(data) {
    return fetch(`${this.baseUrl}users/me/avatar`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ avatar: data }),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.statusText));
      });
  }

  addCard(data) {
    return fetch(`${this.baseUrl}cards`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.statusText));
      });
  }

  deleteCard(idCard) {
    return fetch(`${this.baseUrl}cards/${idCard}`,
      {
        method: 'DELETE',
        headers: this.headers,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.statusText));
      });
  }

  changeLikeCardStatus(idCard, value) {
    if (value) {
      return fetch(`${this.baseUrl}cards/likes/${idCard}`,
        {
          method: 'PUT',
          headers: this.headers,
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(res.statusText));
        });
    }
    return fetch(`${this.baseUrl}cards/likes/${idCard}`,
      {
        method: 'DELETE',
        headers: this.headers,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.statusText));
      });
  }
}

const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-16/';
const authorization = '0227e00e-2fc2-48f1-b527-44b2f5fab9ba';
const contentType = 'application/json';
const api = new Api(baseUrl, authorization, contentType);
export default api;
