import React, { Component } from "react";
import TypeHandler from "./../../Components/TypeHandler/TypeHandler";
import Healthbar from "./../../Components/Healthbar/Healthbar";
import UIStats from "../../Components/UIStats/UIStats";
import Word from "./../../Components/Word/Word";
import GameplayScreen from "./../../Components/GameplayScreen/GameplayScreen";
import BlackBurnContext from "../../Context/BlackburnContext";
import { uniqueNamesGenerator, animals } from "unique-names-generator";
import "./ChallengeRoute.css";
import WinLosePage from "../../Components/WinLosePage/WinLosePage";
import { Spring, animated} from 'react-spring/renderprops'
import { TimingAnimation, Easing } from 'react-spring/renderprops-addons'

class ChallengeRoute extends Component {
  static contextType = BlackBurnContext;

  state = {
    words: [],
    playerHealth: 5,
    playerScore: 0,
    playerBest: 0,
    playerBestStored: 0, // need to figure out how to get this data
    typedWords: 0,
    typedWordsTotal: 0,
    accuracy: 100,
    levelTimer: 0,
    levelTimerTotal: 0,
    wpm: 0,
    isWin: null,
    levelEnded: false,
    initialized: false,
  };

  //Todos:
  //Use animations to make words appear at different places
  //screen shake > part of typeHandler, if it's correct or incorrect

  calcWPM() {
    const timePassed = this.state.levelTimerTotal - this.state.levelTimer;
    const wpm = Math.floor((this.state.typedWords / timePassed) * 100);
    if (Number.isNaN(wpm)) {
      this.setState({ wpm: 0 });
    } else {
      this.setState({ wpm });
    }
  }

  calcAccuracy() {
    const accuracy = Math.floor(
      (this.state.typedWords / this.state.typedWordsTotal) * 100
    );
    if (Number.isNaN(accuracy)) {
      this.setState({ accuracy: 100 });
    } else {
      this.setState({ accuracy });
    }
  }

  triggerLevelEnd() {
    if (this.state.playerHealth <= 0 || this.state.levelTimer === 0) {
      this.clearTimers();
      this.context.setScore(this.state.playerScore);
      this.context.setAccuracy(this.state.accuracy);
      this.context.setWpm(this.state.wpm);
      if (this.context.getMyBestScore() < this.state.playerBest)
        this.context.setNewBestScore(this.state.playerBest);
      this.state.levelTimer <= 0
        ? this.setState({ isWin: true, levelEnded: true })
        : this.setState({ isWin: false, levelEnded: true });
    }
  }

  clearTimers() {
    clearInterval(this.intervalGenerator);
    clearInterval(this.levelTimeout);
    clearInterval(this.checkWinInterval);
    clearInterval(this.calcRuntimeStats);
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
        endTime: word_expiration_timer + new Date().getTime(),
        clearTimeout: () => clearTimeout(newWord.timeout),
        getTimeRemaining: () => {
          const countDown = (newWord.endTime - new Date().getTime()) / 1000;
          return countDown.toFixed(2);
        },
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
    let typedWordsTotal = state.typedWordsTotal;

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

    //if the player is incorrect he takes damage and loses score
    if (takeDamage) playerHealth--;
    if (takeDamage && playerScore > 0) playerScore -= 5;

    //increase total words typed for accuracy
    typedWordsTotal++;

    //handle player record calculation
    if (playerBest <= playerScore) playerBest = playerScore; //css should turn green when it surpasses old score
    if (playerBest > playerScore) playerBest = playerBestStored; //css should return to black if it dips back below old score

    this.setState({
      words: newWords,
      playerHealth,
      playerScore,
      playerBest,
      typedWords,
      typedWordsTotal,
    });
    this.manageWords();
  }

  componentDidMount() {
    const contextObj = this.context.getCheckpointIds();
    const playerScore = this.context.getScore();
    const playerBestStored = this.context.getMyBestScore();
    const checkpointData = contextObj.checkpointArray[contextObj.currentIndex];
    this.levelTimerStaticTotal = checkpointData.level_timer
    this.levelTimeout = setInterval(() => this.updateLevelTimer(), 1000);
    this.checkWinInterval = setInterval(() => this.triggerLevelEnd(), 250);
    this.calcRuntimeStats = setInterval(() => {
      this.calcWPM();
      this.calcAccuracy();
      return;
    }, 200);
    this.intervalGenerator = setInterval(
      () =>
        this.generateWord(
          checkpointData.word_expiration_timer * 1000,
          checkpointData.max_screen_words
        ),
      1000 //this value might have to become more interesting later
    );
    this.staticWordTimer = checkpointData.word_expiration_timer * 1000
    this.setState({
      levelTimer: checkpointData.level_timer,
      levelTimerTotal: checkpointData.level_timer,
      playerScore: playerScore,
      playerBest: playerBestStored,
      playerBestStored: playerBestStored,
      initialized: true,
    });
  }

  getRandomInt = (min, max) => {
    return Math.random() * (max - min) + min; 
   }

  componentWillUnmount() {
    this.clearTimers();
  }

  renderGameplay() {
    return (
      <div className = 'game-container'>
        <UIStats
          textBefore={"Time Remaining:"}
          metric={this.state.levelTimer >= 0 ? this.state.levelTimer : 0}
        />
        <Spring 
          from = {{width: '100%', background: 'black'}}
          to = {{width: '0%' , background: 'white'}}
          config = {{duration: this.levelTimerStaticTotal * 1000}}
        >
          {props => <animated.div className="bg" style={props} >  </animated.div>}
        </Spring>
      <div>
        {this.state.isWin === null && (
          <Healthbar health={this.state.playerHealth} />
        )}
        </div>
        <div>
       
          <UIStats
            textBefore={"Personal best:"}
            metric={this.state.playerBest}
          />
        </div>
        <div>
          <UIStats textBefore={"Score:"} metric={this.state.playerScore} />
        </div>
        <div>
          <UIStats textBefore={"Words Per Minute:"} metric={this.state.wpm} />
        </div>
        <div>
          <UIStats
            textBefore={"Accuracy:"}
            metric={this.state.accuracy}
            textAfter={"%"}
          />
        </div>
        <TypeHandler handleSubmit={(e) => this.handleSubmit(e, this.state)} />
        <ul className = 'word-ul'>
          {this.state.words.map((wordObj, index) => (
            <li className = 'word-li' key={index} 
              style = {{}}
            >
              <Spring
               from = {{transform:
                'translate3d(200px,0,0) scale(2) rotateX(90deg)', }}
               to = {{transform:
                'translate3d(0px,0,0) scale(1) rotateX(0deg)'}}
               config = {{duration: 2000}}
              >
                {props => <span className = 'wordTimer' style = {props}> <Word word={wordObj.word} />{wordObj.getTimeRemaining()}</span>}
              </Spring>
            </li>
          ))}
        </ul>
        <GameplayScreen />

        {this.state.levelEnded &&
          this.state.levelTimer < 0 &&
          this.context.getCurrentCheckpointIndex() !== null && (
            <WinLosePage condition={"checkpoint"} autoSave={false} />
          )}
        {this.state.levelEnded &&
          this.state.levelTimer < 0 &&
          this.context.getCurrentCheckpointIndex() === null && (
            <WinLosePage condition={"level_beaten"} autoSave={true} />
          )}
        {this.state.levelEnded && this.state.playerHealth <= 0 && (
          <WinLosePage condition={"lose"} autoSave={true} />
        )}
      </div>
    );
  }

  render() {
    return (
      <div className = 'game-container'> 
        {this.state.initialized ? this.renderGameplay() : null}
      </div>)
  }
}

export default ChallengeRoute;
