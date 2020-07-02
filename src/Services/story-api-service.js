import config from "../config";
import TokenService from "./token-service";

const storyService = {
  getAllStories() {
    return fetch(`${config.API_ENDPOINT}/story`, {
      authorization: `Bearer ${TokenService.getAuthToken}`,
    }).then((res) => res.json());
  },
  getStoryCheckpointDifficulty(story_id, difficulty_setting, checkpoint_id) {
    return fetch(
      `${config.API_ENDPOINT}/story/${story_id}?difficulty_setting=${difficulty_setting}&checkpoint_id=${checkpoint_id}`,
      {
        authorization: `Bearer ${TokenService.getAuthToken}`,
      }
    ).then((res) => {
      console.log("TESTING ", res);
      return !res.ok
        ? res.json().then((err) => Promise.reject(err))
        : res.json();
    });
  },
};

export default storyService;
