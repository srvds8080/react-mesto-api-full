class ApiAuth {
  constructor(baseUrl, contentType) {
    this.headers = { 'Content-Type': contentType };
    this.baseUrl = baseUrl;
  }

  registration(data) {
    return fetch(`${this.baseUrl}sign-up`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => res);
  }

  authentication(data) {
    return fetch(`${this.baseUrl}sign-in`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => res);
  }

  tokenCheck(jwt) {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => res);
  }
}

// const baseUrl = 'https://auth.nomoreparties.co/';
const baseUrl = 'http://localhost:3000/';
const contentType = 'application/json';
const Auth = new ApiAuth(baseUrl, contentType);
export default Auth;
