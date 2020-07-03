import React, { Component } from "react";
import TypeHandler from "./../../Components/TypeHandler/TypeHandler";
import Healthbar from "./../../Components/Healthbar/Healthbar";
import Score from "./../../Components/Score/Score";
import Wpm from "./../../Components/Wpm/Wpm";
import Word from "./../../Components/Word/Word";
import GameplayScreen from "./../../Components/GameplayScreen/GameplayScreen";
import StoryApiService from "./../../Services/story-api-service";
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
    isWin: null,
    initialized: false,
  };

  //Todos:
  //Get data from context and clear on END

  //Get the values for level, checkpoint, and difficulty from context after the next route goes
  //Set score in black burn context so it persists between levels until you end win or lose
  //Set the win/lose pages to fire when timer runs out or health hits zero
  //get Best score working
  //Research how to make word components appear at different places on the screen
  //screen shake > part of typeHandler, if it's correct or incorrect
  //need to get timers for each word appearing
  //css

  clearTimers() {
    clearInterval(this.intervalGenerator);
    clearInterval(this.levelTimeout);
    clearInterval(this.wpmAvgCalculator);
    clearInterval(this.checkWinInterval);
  }

  updateLevelTimer() {
    let levelTimer = this.state.levelTimer;
    levelTimer--;
    this.setState({ levelTimer });
  }

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
    this.intervalGenerator = setInterval(
      () =>
        this.generateWord(
          checkpointData.word_expiration_timer * 100,
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

  triggerLevelEnd() {
    if (this.state.playerHealth <= 0 || this.state.levelTimer === 0) {
      this.clearTimers();
      this.context.setScore(this.state.playerScore);
      if (this.context.getBestScore() < this.state.playerBest)
        this.context.setBestScore(this.state.playerBest);
      this.state.levelTimer <= 0
        ? this.setState({ isWin: true })
        : this.setState({ isWin: false });
    }
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
          <span>Passing Score: </span>
          <Score score={this.state.passingScore} />
        </div>
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

        {/* Need to fill out the win/lose pages with different values */}
        {this.state.playerHealth <= 0 && <WinLosePage win={true} />}
        {this.state.levelTimer < 0 && <WinLosePage win={false} />}
      </div>
    );
  }

  render() {
    return this.state.initialized ? this.renderGameplay() : null;
  }
}

export default ChallengeRoute;
