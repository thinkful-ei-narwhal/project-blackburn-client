import config from '../config';
import TokenService from './token-service';

const scoreboardService = {
  getScoresByUser(userId) {
    fetch(
      `${config.API_ENDPOINT}/scoreboard?request=myscores&userid=${userId}`,
      {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      }
    ).then((res) => {
      if(res.ok) {
        return res.json()
      }
      else return 
    });
  },

  getAllScores(request) {
    return fetch(`${config.API_ENDPOINT}/scoreboard?request=${request}`, {
      authorization: `Bearer ${TokenService.getAuthToken()}`,
    }).then((res) => {
      if(res.ok) {
        return res.json()
      }
      else return 
    });
    // .then(res => console.log('res', res))
  },

  getMyScores(userId, request) {
    return fetch(
      `${config.API_ENDPOINT}/scoreboard?userid=${userId}&request=${request}`,
      {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      }
    ).then((res) => {
      if(res.ok) {
        return res.json()
      }
      else return 
    });
  },

  getSortedScores(userId, request) {
    return fetch(
      `${config.API_ENDPOINT}/scoreboard?userid=${userId}&request=${request}`,
      {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      }
    ).then((res) => {
      if(res.ok) {
        return res.json()
      }
      else return 
    });
  },
  postScore(data) {
    return fetch(`${config.API_ENDPOINT}/scoreboard`, {
      method: 'POST',
      authorization: `Bearer ${TokenService.getAuthToken()}`,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify( data ),
    }).then((res) => {
      if(res.ok) {
        return res.json()
      }
      else return 
    });
  },
};

export default scoreboardService;
