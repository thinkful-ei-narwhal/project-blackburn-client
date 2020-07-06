import React, { Component } from "react";
import TypeHandler from "./../../Components/TypeHandler/TypeHandler";
import Healthbar from "./../../Components/Healthbar/Healthbar";
import Score from "./../../Components/Score/Score";
import Word from "./../../Components/Word/Word";
import GameplayScreen from "./../../Components/GameplayScreen/GameplayScreen";
import BlackBurnContext from "../../Context/BlackburnContext";
import { uniqueNamesGenerator, animals } from "unique-names-generator";
import "./ChallengeRoute.module.css";
import WinLosePage from "../../Components/WinLosePage/WinLosePage";

class ChallengeRoute extends Component {
  static contextType = BlackBurnContext;

  state = {
    words: [],
    playerHealth: 5,
    playerScore: 0,
    playerBest: 0,
    playerBestStored: 0, // need to figure out how to get this data
    typedWords: 0,
    levelTimer: 0,
    levelTimerTotal: 0,
    wpm: 0,
    isWin: null,
    initialized: false,
  };

  //Todos:
  //Get Player Best Score appearing
  //Need to get timers for each word appearing visible on screen
  //Use animations to make words appear at different places
  //screen shake > part of typeHandler, if it's correct or incorrect
  //css

  calcWPM() {
    const timePassed = this.state.levelTimerTotal - this.state.levelTimer;
    const wpm = Math.floor((this.state.typedWords / timePassed) * 100);
    this.setState({ wpm });
  }

  triggerLevelEnd() {
    if (this.state.playerHealth <= 0 || this.state.levelTimer === 0) {
      this.clearTimers();
      this.context.setScore(this.state.playerScore);
      this.context.setWpm(this.state.wpm);
      if (this.context.getBestScore() < this.state.playerBest)
        this.context.setBestScore(this.state.playerBest);
      this.state.levelTimer <= 0
        ? this.setState({ isWin: true })
        : this.setState({ isWin: false });
    }
  }

  clearTimers() {
    clearInterval(this.intervalGenerator);
    clearInterval(this.levelTimeout);
    clearInterval(this.checkWinInterval);
    clearInterval(this.calcWpmInterval);
    this.state.words.forEach((wordObj) => wordObj.clearTimeout());
  }

  updateLevelTimer() {
    let levelTimer = this.state.levelTimer;
    levelTimer--;
    this.setState({ levelTimer });
  }

  manageWords(addWordObj = null) {
    //clear timeouts for each word that was already typed
    this.state.words.forEach((wordObj) => {
      if (wordObj.expired) wordObj.clearTimeout();
    });

    //filters out all expired words from state
    const newWordArray = this.state.words.filter(
      (wordObj) => wordObj.expired === false
    );

    //adds a new word if it's updated
    if (addWordObj !== null) newWordArray.push(addWordObj);
    this.setState({ words: newWordArray });
  }

  timer(callback, delay) {
    let id,
      started,
      remaining = delay,
      running;

    this.start = function () {
      running = true;
      started = new Date();
      id = setTimeout(callback, remaining);
    };

    this.pause = function () {
      running = false;
      clearTimeout(id);
      remaining -= new Date() - started;
    };

    this.getTimeLeft = function () {
      if (running) {
        this.pause();
        this.start();
      }

      return remaining;
    };

    this.getStateRunning = function () {
      return running;
    };

    this.start();
  }

  generateWord(word_expiration_timer, max_screen_words) {
    if (this.state.words.length < max_screen_words) {
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
        }, word_expiration_timer),
        clearTimeout: () => clearTimeout(newWord.timeout),
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
    if (takeDamage && playerScore > 0) playerScore -= 5;

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
    const contextObj = this.context.getCheckpointIds();
    const playerScore = this.context.getScore();
    const playerBestStored = this.context.getBestScore();
    const checkpointData = contextObj.checkpointArray[contextObj.currentIndex];

    this.levelTimeout = setInterval(() => this.updateLevelTimer(), 1000);
    this.checkWinInterval = setInterval(() => this.triggerLevelEnd(), 250);
    this.calcWpmInterval = setInterval(() => this.calcWPM(), 200);
    this.intervalGenerator = setInterval(
      () =>
        this.generateWord(
          checkpointData.word_expiration_timer * 1000,
          checkpointData.max_screen_words
        ),
      1000 //this value might have to become more interesting later
    );
    this.setState({
      levelTimer: checkpointData.level_timer,
      levelTimerTotal: checkpointData.level_timer,
      playerScore: playerScore,
      playerBest: playerBestStored,
      playerBestStored: playerBestStored,
      initialized: true,
    });
  }

  componentWillUnmount() {
    this.clearTimers();
  }

  renderGameplay() {
    return (
      <div>
        <p>
          Time Remaining:{" "}
          {this.state.levelTimer >= 0 ? this.state.levelTimer : 0}
        </p>
        {this.state.isWin === null && (
          <Healthbar health={this.state.playerHealth} />
        )}
        <div>
          {/* do a get request for personal best, which finds highest score */}
          <span>Personal best: </span>
          <Score score={this.state.playerBest} />
        </div>
        <div>
          <span>Score: </span>
          <Score score={this.state.playerScore} />
        </div>
        <span>Words Per Minute: </span>
        <Score score={this.state.wpm} />
        <TypeHandler handleSubmit={(e) => this.handleSubmit(e, this.state)} />
        <ul>
          {this.state.words.map((wordObj, index) => (
            <li key={index}>
              <Word word={wordObj.word} />
              {/* <span>{wordObj.getTimeLeft()}</span> - NEED TO FIGURE OUT */}
            </li>
          ))}
        </ul>
        <GameplayScreen />

        {this.state.levelTimer < 0 &&
          this.context.getCurrentCheckpointIndex() !== null && (
            <WinLosePage condition={"checkpoint"} autoSave={false} />
          )}
        {this.state.levelTimer < 0 &&
          this.context.getCurrentCheckpointIndex() === null && (
            <WinLosePage condition={"level_beaten"} autoSave={true} />
          )}
        {this.state.playerHealth <= 0 && (
          <WinLosePage condition={"lose"} autoSave={true} />
        )}
      </div>
    );
  }

  render() {
    return this.state.initialized ? this.renderGameplay() : null;
  }
}

export default ChallengeRoute;
