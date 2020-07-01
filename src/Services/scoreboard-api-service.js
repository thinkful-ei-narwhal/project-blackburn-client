import config from "../config";
import TokenService from "./token-service";

const ScoreboardApiService = {
  getScoreboard(userId, request, storyid) {
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
};

export default ScoreboardApiService;
