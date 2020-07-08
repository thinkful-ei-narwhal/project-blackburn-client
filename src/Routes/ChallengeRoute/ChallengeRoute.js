
import React, { Component } from "react";
import TypeHandler from "./../../Components/TypeHandler/TypeHandler";
import Healthbar from "./../../Components/Healthbar/Healthbar";
import UIStats from "../../Components/UIStats/UIStats";
import Word from "./../../Components/Word/Word";
import GameplayScreen from "./../../Components/GameplayScreen/GameplayScreen";
import BlackBurnContext from "../../Context/BlackburnContext";
import { uniqueNamesGenerator, animals } from "unique-names-generator";
import WinLosePage from "../../Components/WinLosePage/WinLosePage";
import { Spring, animated } from "react-spring/renderprops";
import { TimingAnimation, Easing } from "react-spring/renderprops-addons";
import "./ChallengeRoute.css";
import bellTone from '../../Assets/Sounds/zapsplat_bell_small_hand_single_ring_ping_very_high_pitched_49175.mp3';
import healthLoss from '../../Assets/Sounds/leisure_retro_arcade_game_incorrect_error_tone.mp3';
import duel from '../../Assets/Sounds/bensound-theduel.mp3';
import bad from '../../Assets/Sounds/bensound-badass.mp3';
import eni from '../../Assets/Sounds/bensound-enigmatic.mp3';

class ChallengeRoute extends Component {
  static contextType = BlackBurnContext;
  constructor(props) {
    super(props);
    this.state = {
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
      value: "",
      color: "green",
      isWin: null,
      levelEnded: false,
      initialized: false,
      audio: '',

    };

    this.handleChange = this.handleChange.bind(this);
  }
  createAudio() {
    const theduel = duel;
    const enigmatic = eni;
    const badass = bad;
    this.setState({ audio: new Audio(eval(this.context.audio)) });
  }
  //Todos: Use animations to make words appear at different places

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
      this.setState({ words: [] });
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
          let hit = new Audio(healthLoss);
          hit.play();
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
    this.setState({ value: "" });
    
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
        let correct = new Audio(bellTone);
        correct.play();
      }
      return;
    });

    //if the player is incorrect he takes damage and loses score
    if (takeDamage) {
      let hit = new Audio(healthLoss);
      hit.play();
      playerHealth--;
    }
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

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });

    let isMatching = false;
    this.state.words.forEach((wordObj) => {
      if (wordObj.word.includes(value)) isMatching = true;
    });

    isMatching
      ? this.setState({ color: "green" })
      : this.setState({ color: "red" });
  }

  componentDidMount() {
    this.createAudio();
    const contextObj = this.context.getCheckpointIds();
    const playerScore = this.context.getScore();
    const playerBestStored = this.context.getMyBestScore();
    const checkpointData = contextObj.checkpointArray[contextObj.currentIndex];
    this.levelTimerStaticTotal = checkpointData.level_timer;
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
    this.staticWordTimer = checkpointData.word_expiration_timer * 1000;
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
  };

  componentWillUnmount() {
    this.clearTimers();
  }

  renderGameplay() {

    const colors = ['blue', 'red', 'orange', 'violet', 'black', 'green']
    this.state.audio.play();

    return (
      <>
      <div className = 'game-container'>
         {!this.state.levelEnded && (
              <Spring
                from={{ width: "100%", background: "gray" }}
                to={{ width: "0%", background: "white" }}
                config={{ duration: this.levelTimerStaticTotal * 1000 }}
              >
                {(props) => (
                  <animated.div className="bg" style={props}>
                    <UIStats textBefore = {'Time Remaining'} 
                     metric={this.state.levelTimer >= 0 ? this.state.levelTimer : 0}
                    />
                  </animated.div>
                )}
              </Spring>
            )}
          {!this.state.levelEnded && (
            <Healthbar health={this.state.playerHealth} />
          )}
        <div className = 'stats-container'>
          <div className = 'stat'>
            <UIStats
              textBefore={'Personal best:'}
              metric={this.state.playerBest}
            />

          </div >
          <div className = 'stat'>
            <UIStats textBefore={"Score:"} metric={this.state.playerScore} />
          </div>
          <div className = 'stat'>
            <UIStats textBefore={"Words Per Minute:"} metric={this.state.wpm} />
          </div>
          <div className = 'stat'>
            <UIStats
              textBefore={'Accuracy:'}
              metric={this.state.accuracy}
              textAfter={'%'}
            />
          </div>
        </div>
        <div className = 'type-input'>
          {!this.state.levelEnded && (
            <TypeHandler
              handleSubmit={(e) => this.handleSubmit(e, this.state)}
              value={this.state.value}
              handleChange={this.handleChange}
              color={this.state.color}
            />
          )}
        </div>
        {!this.state.levelEnded && (
          <ul className="word-ul">
            {this.state.words.map((wordObj, index) => (
              <li className="word-li" key={index} style={{}}>
                <Spring 
                  from={{
                    transform: "translate3d(200px,0,0) scale(2) rotateX(90deg)",
                    // backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                  }}
                  to={{
                    transform: "translate3d(0px,0,0) scale(1) rotateX(0deg)",
                    // backgroundColor:colors[Math.floor(Math.random() * colors.length)],

                  }}
                  // config={{ duration: 2000 }}
                >
                  {(props) => (
                    <span className="wordTimer" style={props}>
                      <Word word={wordObj.word} />
                    </span>
                  )}
                </Spring>
                {wordObj.getTimeRemaining()}
              </li>
            ))}
          </ul>
        )}
        <GameplayScreen />
          {this.state.levelEnded &&
            this.state.levelTimer < 0 &&
            this.context.getCurrentCheckpointIndex() !== null && (
            <div>
              {this.state.audio.pause()}{' '}
              <WinLosePage condition={'checkpoint'} autoSave={false} />
            </div>
            )}
          {this.state.levelEnded &&
            this.state.levelTimer < 0 &&
            this.context.getCurrentCheckpointIndex() === null && (
            <div>
              {this.state.audio.pause()}{' '}
              <WinLosePage condition={"level_beaten"} autoSave={true} />
            </div>
            )}
          {this.state.levelEnded && this.state.playerHealth <= 0 && (
            <div>
              {this.state.audio.pause()}{' '}
              <WinLosePage condition={"lose"} autoSave={true} />
            </div>           
          )}
        </div>

        </>
    );
  }

  render() {
    return (
        this.state.initialized ? this.renderGameplay() : null
    );
  }
}

export default ChallengeRoute;
