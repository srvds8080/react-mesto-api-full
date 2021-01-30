class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getCard() {
    return fetch(`${this.baseUrl}cards`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
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
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
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
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
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
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
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
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
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
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
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
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
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
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.statusText));
      });
  }
}

// const baseUrl = 'https://api.srvds.students.nomoredomains.monster/';
const baseUrl = 'http://localhost:3000/';
const api = new Api(baseUrl);
export default api;
