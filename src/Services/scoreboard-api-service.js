import config from "../config";
import TokenService from "./token-service";

const scoreboardService = {
  getScoresByUser(userId) {
    fetch(
      `${config.API_ENDPOINT}/scoreboard?request=myscores&userid=${userId}`,
      {
        authorization: `Bearer ${TokenService.getAuthToken}`,
      }
    ).then((res) => res.json());
  },

  getAllScores(request) {
    console.log(request)
    return fetch(`${config.API_ENDPOINT}/scoreboard?request=${request}`, {
      'authorization': `Bearer ${config.temporaryToken}`
    })
    .then(res => res.json())
    // .then(res => console.log('res', res))
  },

  getMyScores(userId, request) {
    return fetch(`${config.API_ENDPOINT}/scoreboard?userid=${userId}&request=${request}`, {
      'authorization': `Bearer ${config.temporaryToken}`
    })
    .then(res => res.json())
  }

};

export default scoreboardService;
