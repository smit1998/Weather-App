function getAuthToken() {
  const authToken = sessionStorage.getItem('_auth');
  return authToken ? `Token ${authToken}` : '';
}

export default class API {
  static getUsers() {
    return fetch('/api/user/', {
        method: 'GET',
        headers: {
          'Authorization': getAuthToken(),
        }
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static login(username, password) {
    return fetch('/auth/token/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': username,
          'password': password
        }),
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static signUp(username, password) {
    return fetch('/auth/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': username,
          'password': password
        }),
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  static logout(username, password) {
    return fetch('/auth/token/logout', {
        method: 'POST',
        headers: {
          'Authorization': getAuthToken(),
          'Content-Type': 'application/json',
        }
      })
      .then(res => ({ status: res.status }));
  }

  static addToFavourite(location) {
    return fetch('api/favourites/', {
      method: 'POST',
      headers: {
        'Authorization': getAuthToken(),
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ 'location': location })
    })
    .then(res => res.json()
      .then(data => ({ status: res.status, body: data}))
    );
  }
}
