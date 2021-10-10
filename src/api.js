function getAuthToken() {
  const authToken = sessionStorage.getItem('_auth');
  return authToken ? `Token ${authToken}` : '';
}

  // Fetch req to get all users
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

  // Fetch req to login an existing user
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

  // Fetc req to signup a new user
  static signUp(username, password, email) {
    return fetch('/auth/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': username,
          'password': password,
          'email': email,
        }),
      })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  // Fetch req to logout current user
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

  // Fetch req to get user's profile
  static myProfile() {
    return fetch('/api/user/me', {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      }
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  // Fetch req to update the current user's profile
  static updateUserProfile(email) {
    return fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken(),
      },
      body: JSON.stringify({
        'email': email,
      }),
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  // fetch req to add a location to favourites
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

  // fetch req to remove the location from favourites
  static removeFromFavourite(location) {
    return fetch('api/favourites/remove', {
      method: 'POST',
      headers: {
        'Authorization': getAuthToken(),
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ 'location': location })
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  // fetch req to get all the favourite locations of the current user
  static getAllFavourite() {
    return fetch('api/favourites/all', {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
      },
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }

  // Fetch req to check is a particular location is in favourites 
  static checkInFavourite(location) {
    return fetch('api/favourites/check', {
      method: 'POST',
      headers: {
        'Authorization': getAuthToken(),
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ 'location': location })
    })
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data }))
      );
  }
}
