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

class ChallengeRoute extends Component {
  state = {
    words: [],
    playerHealth: 5,
    playerScore: 0,
    playerBest: 0,
    playerBestStored: 0,
    typedWords: 0,
    // wpmAvgs: [],
    // wpmCalc: 0,
    levelTimer: 60, //1 minute
    levelTimerTotal: 120,
    initialized: false,
  };

  //smaller Todos:
  //Research how to make word components appear at different places on the screen
  //screen shake > part of typeHandler, if it's correct or incorrect
  //need to get timers for each word appearing

  //Todo get the WPM tracker working
  // pushWpmValue(state) {
  //   let typedWords = state.typedWords;
  //   const wpmAvgs = state.wpmAvgs;
  //   const currentWPM = typedWords / (state.levelTimerTotal / 60);
  //   if (currentWPM !== wpmAvgs[wpmAvgs.length - 1]) {
  //     wpmAvgs.push(currentWPM);
  //   }
  //   else {
  //     wpmAvgs.push(0);
  //   }

  //   let totalWPM = 0;
  //   for (let i = 0; i < wpmAvgs.length; i++) {
  //     totalWPM += wpmAvgs[i];
  //   }
  //   const wpmCalc = totalWPM / wpmAvgs.length;

  //   this.setState({ wpmAvgs, wpmCalc });
  // }

  // updateLevelTimer() {
  //   let levelTimer = this.state.levelTimer;
  //   levelTimer--;
  //   this.setState({ levelTimer });
  // }

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
          this.setState({ playerHealth: this.state.playerHealth - 0.5 });
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
    let playerBest = state.playerBest;
    let playerBestStored = state.playerBestStored;
    let typedWords = state.typedWords;

    let takeDamage = true;
    newWords.forEach((wordObj) => {
      if (wordObj.word.toLowerCase() === userInput.toLowerCase()) {
        takeDamage = false;
        wordObj.expired = true;
        playerScore += 10;
        typedWords++;
        clearTimeout(wordObj.timeout);
      }
      return;
    });

    //if the player is incorrect he takes damage and losses score
    if (takeDamage) playerHealth--;
    if (takeDamage) playerScore -= 5;

    //handle player record calculation
    if (playerBest <= playerScore) playerBest = playerScore; //css should turn green when it surpasses old score
    if (playerBest > playerScore) playerBest = playerBestStored; //css should return to black if it dips back below old score

    this.setState({
      words: newWords,
      playerHealth,
      playerScore,
      playerBest,
      typedWords,
    });
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

    this.levelTimeout = setInterval(() => this.updateLevelTimer(), 1000);
    this.intervalGenerator = setInterval(
      () => this.generateWord(20000, 5),
      2000
    );
    this.wpmAvgCalculator = setInterval(
      () => this.pushWpmValue(this.state),
      1000
    );
    this.setState({ initialized: true });
  }

  componentWillUnmount() {
    clearInterval(this.intervalGenerator);
    clearInterval(this.levelTimeout);
    clearInterval(this.wpmAvgCalculator);
  }

  renderGameplay() {
    return (
      <div>
        <p>
          Time Remaining:{" "}
          {this.state.levelTimer >= 0 ? this.state.levelTimer : 0}
        </p>
        <Healthbar health={this.state.playerHealth} />
        <div>
          <span>Personal best: </span>
          <Score score={this.state.playerBest} />
        </div>
        <div>
          <span>Score: </span>
          <Score score={this.state.playerScore} />
        </div>
        <span>Words Per Minute: </span>
        <Wpm wpm={this.state.wpmCalc} />
        <TypeHandler handleSubmit={(e) => this.handleSubmit(e, this.state)} />
        <ul>
          {this.state.words.map((wordObj, index) => (
            <li key={index}>
              <Word word={wordObj.word} />
            </li>
          ))}
        </ul>
        <GameplayScreen />
      </div>
    );
  }

  render() {
    return this.state.initialized ? this.renderGameplay() : null;
  }
}

export default ChallengeRoute;
