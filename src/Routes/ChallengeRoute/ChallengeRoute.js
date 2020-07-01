import React, { Component } from "react";
import TypeHandler from "./../../Components/TypeHandler/TypeHandler";
import Healthbar from "./../../Components/Healthbar/Healthbar";
import Score from "./../../Components/Score/Score";
import Wpm from "./../../Components/Wpm/Wpm";
import Word from "./../../Components/Word/Word";
import GameplayScreen from "./../../Components/GameplayScreen/GameplayScreen";
import { uniqueNamesGenerator, animals } from "unique-names-generator";
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

  manageWords(addWordObj = null) {
    //removes all words that are expired
    const newWordArray = this.state.words.filter(
      (wordObj) => wordObj.expired === false
    );

    //adds a new word if it's updated
    if (addWordObj !== null) newWordArray.push(addWordObj);
    this.setState({ words: newWordArray });
  }

  generateWord(wordTimeout, maxWords) {
    if (this.state.words.length < maxWords) {
      const randomWord = uniqueNamesGenerator({
        dictionaries: [animals],
        length: 1,
      });

      const newWord = {
        word: <Word word={randomWord} timer={wordTimeout} />,
        expired: false,
        timeout: setTimeout(() => {
          newWord.expired = true;
          this.manageWords();
        }, wordTimeout),
      };

      this.manageWords(newWord);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { typeInput } = event.target;
    console.log("TESTING I DID SOMETHING ", typeInput.value);
    //check the submitted word against all values in state
    //flush
    //score and remove if correct etc
  }

  componentDidMount() {
    this.intervalGenerator = setInterval(
      () => this.generateWord(5000, 5),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalGenerator);
  }

  //todos:
  //Research how to make word components appear at different places on the screen
  //screen shake > part of typeHandler, if it's correct or incorrect
  //controlled state on the typehandler

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
        <TypeHandler handleSubmit={this.handleSubmit} />
        <ul>
          {this.state.words.map((wordObj, index) => (
            <li key={index}>{wordObj.word}</li>
          ))}
        </ul>
        <GameplayScreen />
      </div>
    );
  }
}

export default ChallengeRoute;
