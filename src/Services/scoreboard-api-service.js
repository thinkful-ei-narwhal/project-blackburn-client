import config from "../config";
import TokenService from "./token-service";

const ScoreboardApiService = {
  getScoreboardByUser(userId, request, storyid) {
    return fetch(
      `${config.API_ENDPOINT}/scoreboard?userid=${userId}&request=${request}&storyid=${storyid}`,
      {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }
    ).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getAllScores(request) {
    return fetch(`${config.API_ENDPOINT}/scoreboard?request=${request}`, {
      'authorization': `Bearer ${config.temporaryToken}`
    })
    .then(res => res.json())
    .then(res => console.log('res', res))
  }

};

export default ScoreboardApiService;
