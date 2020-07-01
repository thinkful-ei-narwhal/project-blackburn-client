import React, { Component } from "react";
import TypeHandler from "./../../Components/TypeHandler/TypeHandler";
import Healthbar from "./../../Components/Healthbar/Healthbar";
import Score from "./../../Components/Score/Score";
import Wpm from "./../../Components/Wpm/Wpm";
import Word from "./../../Components/Word/Word";
import GameplayScreen from "./../../Components/GameplayScreen/GameplayScreen";
import ScoreboardApiService from "./../../Services/scoreboard-api-service";
import { uniqueNamesGenerator, animals } from "unique-names-generator";
import "./ChallengeRoute.module.css";
import WinLosePage from "../../Components/WinLosePage/WinLosePage";

class ChallengeRoute extends Component {
  state = {
    words: [],
    playerHealth: 3,
    playerScore: 0,
    initialized: false,
    levelTimer: 60,
    correctWordsSubmitted: 0,
  };

  //-player's health based is a static 3 health

  //-Derive from fetch story:
  //>>>>>Which dictionaries

  //-Derive from fetch difficulty:
  //>>>>>Timer speed for generating words
  //>>>>>Word length (need to figure out how this is done, if possible)
  //>>>>>Max words on screen
  //>>>>>Expiration timers on the words
  //>>>>>Timer for when game finishes

  //smaller Todos:
  //call win/fail state at end of timer
  //Research how to make word components appear at different places on the screen
  //screen shake > part of typeHandler, if it's correct or incorrect
  //need to get timers for each word appearing

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
        word: randomWord,
        expired: false,
        timeout: setTimeout(() => {
          newWord.expired = true;
          this.setState({ playerHealth: this.state.playerHealth - 1 });
          this.manageWords();
        }, wordTimeout),
      };

      this.manageWords(newWord);
    }
  }

  handleSubmit(event, state) {
    event.preventDefault();
    const userInput = event.target.typeInput.value;
    event.target.typeInput.value = "";

    const newWords = state.words;
    let playerHealth = state.playerHealth;
    let playerScore = state.playerScore;
    let correctWordsSubmitted = state.correctWordsSubmitted;
    //  wordsSubmitted++;
    //  score = accuracy = -- or accuracy = ++;
    //  accuracy influences SCORE, decriment when you get something wrong
    //  timer for WPM,

    let takeDamage = true;
    newWords.forEach((wordObj) => {
      if (wordObj.word.toLowerCase() === userInput.toLowerCase()) {
        takeDamage = false;
        wordObj.expired = true;
        playerScore += 10;
      }
      return;
    });
    if (takeDamage) playerHealth--;
    this.setState({ words: newWords, playerHealth, playerScore });
    this.manageWords();
  }

  componentDidMount() {
    //todo get all of the data you need and set contexts!
    // ScoreboardApiService.getScoreboard(3,"story",1).then(res => {
    //   console.log('TESTING ', res);
    // });
    //Values this route will eventually need to get on start:
    //So in componentDidMount we need:
    //>>story, difficulty, player's high score

    this.intervalGenerator = setInterval(
      () => this.generateWord(20000, 5),
      2000
    );
    this.setState({ initialized: true });
  }

  componentWillUnmount() {
    clearInterval(this.intervalGenerator);
  }

  renderGameplay() {
    return (
      <div>
        <Healthbar health={this.state.playerHealth} />
        <div>
          <span>Personal best: </span>
          <Score score={10} />
        </div>
        <div>
          <span>Score: </span>
          <Score score={this.state.playerScore} />
        </div>
        <span>Words Per Minute: </span>
        <Wpm wpm={10} />
        <TypeHandler handleSubmit={(e) => this.handleSubmit(e, this.state)} />
        <ul>
          {this.state.words.map((wordObj, index) => (
            <li key={index}>
              <Word word={wordObj.word} />
            </li>
          ))}
        </ul>
        <GameplayScreen />
        <WinLosePage />
      </div>
    );
  }

  render() {
    return this.state.initialized ? this.renderGameplay() : null;
  }
}

export default ChallengeRoute;
