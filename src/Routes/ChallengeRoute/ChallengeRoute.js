import React, { Component } from "react";
import TypeHandler from "./../../Components/TypeHandler/TypeHandler";
import Healthbar from "./../../Components/Healthbar/Healthbar";
import Score from "./../../Components/Score/Score";
import Wpm from "./../../Components/Wpm/Wpm";
import Word from "./../../Components/Word/Word";
import GameplayScreen from "./../../Components/GameplayScreen/GameplayScreen";
import { uniqueNamesGenerator, animals } from "unique-names-generator";
import uuid from "react-uuid";
import "./ChallengeRoute.module.css";

class ChallengeRoute extends Component {
  state = {
    words: [],
  };

  //Values this route will eventually need to get on start:
  //-player's health based on difficulty
  //-Timer speed for generating words
  //-Word length (need to figure out how this is done, if possible)
  //-Which dictionaries
  //-Max words on screen
  //-Expiration times on the words themselves

  //Note: can recycle this for when a player gets something right
  removeWord(uniqueId, state) {
    const newArray = state.words.filter(
      (wordObj) => wordObj.uniqueId !== uniqueId
    );
    this.setState({ newArray });
  }

  generateWord(state, wordTimeout, maxWords) {
    if (state.words.length < maxWords) {
      const newWordArray = [...state.words];
      const newWord = uniqueNamesGenerator({
        dictionaries: [animals],
        length: 1,
      });
      const uniqueId = uuid();
      newWordArray.push({
        uniqueId: uniqueId,
        word: (
          <Word
            word={newWord}
            timeout={wordTimeout}
            removeWord={() => this.removeWord(state, uniqueId)}
          />
        ),
      });
      this.setState({ words: newWordArray });
    }
  }

  componentDidMount() {
    setInterval(() => this.generateWord(this.state, 4, 5), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //todos:
  //Research how to make word components appear at different places on the screen
  //screen shake > part of typeHandler, if it's correct or incorrect

  render() {
    return (
      <div>
        <Healthbar />
        <div>
          <span>Personal best: </span>
          <Score />
        </div>
        <div>
          <span>Score: </span>
          <Score />
        </div>
        <span>Words Per Minute: </span>
        <Wpm wpm={10} />
        <ul>
          {this.state.words.map((wordObj, index) => (
            <li key={index}>{wordObj.word}</li>
          ))}
        </ul>
        <GameplayScreen />
        <TypeHandler />
      </div>
    );
  }
}

export default ChallengeRoute;
