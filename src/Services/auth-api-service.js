import config from '../config';
import TokenService from './token-service';

const ApiService = {
  getUser(id) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((err) => Promise.reject(err)) : res.json()
    );
  },
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((err) => Promise.reject(err)) : res.json()
    );
  },
  editUser(user) {
    return fetch(`${config.API_ENDPOINT}/users/edit`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((err) => Promise.reject(err)) : res.json()
    );
  },
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((res) =>
      !res.ok ? res.json().then((err) => Promise.reject(err)) : res.json()
    );
  },
};

export default ApiService;
