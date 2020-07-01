import config from '../config'

const AuthApiService = {
 //to login an already registered user
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  //to create a new user 
  postUser(user) {
      return fetch(`${config.API_ENDPOINT}/users`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(user)
      })
      .then(res => (!res.ok)
       ? res.json().then(e => Promise.reject(e))
       : res.json())
  }
}

export default AuthApiService