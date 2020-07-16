import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TypeHandler from "./../../Components/TypeHandler/TypeHandler";
import Healthbar from "./../../Components/Healthbar/Healthbar";
import UIStats from "../../Components/UIStats/UIStats";
import Word from "./../../Components/Word/Word";
import BlackBurnContext from "../../Context/BlackburnContext";
import { uniqueNamesGenerator, animals } from "unique-names-generator";
import detective from "./../../Dictionaries/detective";
import monster from "./../../Dictionaries/monster";
import drone from "./../../Dictionaries/drone";
import WinLosePage from "../../Components/WinLosePage/WinLosePage";
import { Spring, animated, Trail } from "react-spring/renderprops.cjs";
import "./ChallengeRoute.css";
import bellTone from "../../Assets/Sounds/zapsplat_bell_small_hand_single_ring_ping_very_high_pitched_49175.mp3";
import healthLoss from "../../Assets/Sounds/leisure_retro_arcade_game_incorrect_error_tone.mp3";
import TimerContent from "../../Components/TimerContent/TimerContent";

const dictMapper = {
  animals: animals,
  detective: detective,
  monster: monster,
  drone: drone,
};

const audioPromiseContainer = {
  hit: null,
  correct: null,
};

class ChallengeRoute extends Component {
  static contextType = BlackBurnContext;
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      // expiredBuffer: [],
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
      audio: "",
      timer: false,
      gameplay_art: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  createAudio() {
    this.setState({ audio: new Audio(this.context.audio) });
  }

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
    } else if (this.state.typedWordsTotal === 0) {
      this.setState({ accuracy: 100 });
    } else {
      this.setState({ accuracy });
    }
  }

  triggerLevelEnd() {
    console.log(
      this.state.playerHealth,
      this.state.levelTimer,
      this.state.levelEnded,
      this.state.isWin
    );

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
      if (this.state.levelEnded === true && this.state.isWin === true) {
        this.context.incrementCheckpointIndex();
      }
    }
  }

  clearTimers() {
    clearInterval(this.intervalGenerator);
    clearInterval(this.levelTimeout);
    clearInterval(this.checkWinInterval);
    clearInterval(this.calcRuntimeStats);
    clearInterval(this.generateWordOnEmpty);
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

    // const expiredBuffer = this.state.expiredBuffer.filter(
    //   (expiredWordObj) => expiredWordObj.bufferExpired === false
    // );

    //adds a new word if it's updated
    if (addWordObj !== null) newWordArray.push(addWordObj);
    this.setState({ words: newWordArray }); //, expiredBuffer
  }

  generateWord(word_expiration_timer, max_screen_words, dictionary_string) {
    if (this.state.words.length < max_screen_words) {
      let dictionary = dictMapper[dictionary_string];
      const randomWord = uniqueNamesGenerator({
        dictionaries: [dictionary],
        length: 1,
      });

      const newWord = {
        word: randomWord,
        expired: false,
        timeout: setTimeout(() => {
          newWord.expired = true;
          // const expiredBuffer = this.state.expiredBuffer;

          // const expiredWord = {
          //   word: randomWord,
          //   bufferExpired: false,
          //   timeout: setTimeout(() => {
          //     expiredWord.bufferExpired = true;
          //     clearTimeout(expiredWord.timeout);
          //     return;
          //   }, 1000),
          // };

          // expiredBuffer.push(expiredWord);

          this.setState({
            playerHealth: this.state.playerHealth - 0.5,
          }); //           expiredBuffer,
          this.manageWords();
          let hit = new Audio(healthLoss);
          audioPromiseContainer.hit = hit;
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

    // const expiredBufferWords = state.expiredBuffer;

    let takeDamage = true;
    // expiredBufferWords.forEach((expiredWord) => {
    //   if (expiredWord.word.toLowerCase() === userInput.toLowerCase()) {
    //     takeDamage = false;
    //     typedWords++;
    //   }
    //   return;
    // });

    if (takeDamage === true) {
      newWords.forEach((wordObj) => {
        if (wordObj.word.toLowerCase() === userInput.toLowerCase()) {
          takeDamage = false;
          wordObj.expired = true;
          playerScore += 10;
          typedWords++;
          clearTimeout(wordObj.timeout);
          let correct = new Audio(bellTone);
          audioPromiseContainer.correct = correct;
          correct.play();
        }
        return;
      });
    }

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

  startTimer = () => {
    return new Promise((resolve) => setTimeout(resolve, 6500));
  };

  async componentDidMount() {
    if (this.context.checkpoint_ids.checkpointArray.length === 0) {
      const backupArray = JSON.parse(localStorage.getItem("checkpointArray"));
      await this.context.setCheckpointIds(backupArray);
    }
    const contextObj = this.context.getCheckpointIds();
    let storyCheckpoints = contextObj.checkpointArray;
    let i = contextObj.currentIndex || 0;
    this.gameplay_art = storyCheckpoints[i].gameplay_art;
    this.setState({
      gameplay_art: this.gameplay_art,
    });
    await this.startTimer()
      .then(() => this.setState({ timer: false }))
      .then(() => {
        this.createAudio();
        const contextObj = this.context.getCheckpointIds();
        let storyCheckpoints = contextObj.checkpointArray;
        let i = contextObj.currentIndex || 0;
        this.winText = storyCheckpoints[i].win_text;
        this.loseText = storyCheckpoints[i].lose_text;
        const playerScore = this.context.getScore();
        const playerBestStored = this.context.getMyBestScore();
        const checkpointData =
          contextObj.checkpointArray[contextObj.currentIndex];
        this.levelTimerStaticTotal = checkpointData.level_timer;
        this.levelTimeout = setInterval(() => this.updateLevelTimer(), 1000);
        this.checkWinInterval = setInterval(() => this.triggerLevelEnd(), 250);
        this.calcRuntimeStats = setInterval(() => {
          this.calcWPM();
          this.calcAccuracy();
          return;
        }, 200);
        this.intervalGenerator = setInterval(
          () => {
            this.generateWord(
              checkpointData.word_expiration_timer * 1000,
              checkpointData.max_screen_words,
              checkpointData.dictionary_string
            );
            return;
          },
          Math.random() * (3000 - 500) + 500 //random spawn between 500 and 3000
        );
        this.staticWordTimer = checkpointData.word_expiration_timer * 1000;
        this.setState({
          levelTimer: 2,//checkpointData.level_timer,
          levelTimerTotal: 2, //checkpointData.level_timer,
          playerScore: playerScore,
          playerBest: playerBestStored,
          playerBestStored: playerBestStored,
          initialized: true,
        });
        this.generateWordOnEmpty = setInterval(
          () => {
            if (this.state.words.length === 0) {
              this.generateWord(
                checkpointData.word_expiration_timer * 1000,
                checkpointData.max_screen_words,
                checkpointData.dictionary_string
              );
            }
            return;
          },
          100 //random spawn between 1000 and 5000
        );
        this.state.audio.play();
      })
      .catch((error) => this.context.setError(error));
    this.state.audio.play();
  }

  renderTimer = () => {
    const hintsArray = [
      "Remember to hit enter after your type a word",
      "You lose more health mistyping a word than letting it go by!",
      "Remember to look at the word timers! They go by quick!",
      "Try and beat the highscore! You'll be the best typer in the world!",
      "Don't forget to stretch!",
    ];
    const getRandomHint =
      hintsArray[Math.floor(Math.random() * hintsArray.length)];

    return (
      <div
        className="game-container"
        style={{ backgroundImage: `url(${this.state.gameplay_art})` }}
      >
        <TimerContent>
          {(props) => (
            <>
              <animated.div
                style={{
                  fontSize: "100px",
                  height: "auto",
                  width: 'auto',
                  position: 'absolute',
                  top: 100,
                  ...props,
                }}
              >
                {Math.floor(props.value)}
              </animated.div>
              <div className="hint-container">
                <div className="hint">
                  Barbara Blackburn Says:
                  <br /> {getRandomHint}
                </div>
              </div>
            </>
          )}
        </TimerContent>
      </div>
    );
  };

  getRandomInt = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  componentWillUnmount() {
    this.clearTimers();
    this.state.audio.pause();
  }

  renderGameplay() {
    //for animation and music
    const colors = ["blue", "red", "orange", "violet", "black", "green"];

    return (
      <>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {(props) => (
            <div className="challenge-div" style={props}>
              {" "}
              {!this.state.levelEnded && (
                <Spring
                  from={{ width: "100%", background: "rgba(217, 193, 170, 1)" }}
                  to={{ width: "0%", background: "white" }}
                  config={{ duration: this.levelTimerStaticTotal * 1000 }}
                >
                  {(props) => (
                    <animated.div className="bg" style={props}>
                      <UIStats
                        style = {{marginTop: 5}}
                        textBefore={"Time Remaining"}
                        metric={
                          this.state.levelTimer >= 0 ? this.state.levelTimer : 0
                        }
                      />
                    </animated.div>
                  )}
                </Spring>
              )}
              {!this.state.levelEnded && (
                <Healthbar health={this.state.playerHealth} />
              )}
              <div className="stats-container">
                <div className="stat">
                  <UIStats
                    textBefore={"Personal best:"}
                    metric={this.state.playerBest}
                  />
                </div>
                <div className="stat">
                  <UIStats
                    textBefore={"Score:"}
                    metric={this.state.playerScore}
                  />
                </div>
                <div className="stat">
                  <UIStats
                    textBefore={"Words Per Minute:"}
                    metric={this.state.wpm}
                  />
                </div>
                <div className="stat">
                  <UIStats
                    textBefore={"Accuracy:"}
                    metric={this.state.accuracy}
                    textAfter={"%"}
                  />
                </div>
              </div>
              <div className="type-input">
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
                    <li className="word-li" key={index}>
                      {this.state.levelTimer < 10 && <Spring
                        from={{ color: colors[Math.floor(Math.random() * colors.length)], overflow: "hidden", height: 0, width: 0 }}
                        to={{  color: colors[Math.floor(Math.random() * colors.length)], height: "auto", width: "auto" }}
                      >
                        {(props) => (
                          <animated.div className="wordTimer" style={props}>
                            <Word word={wordObj.word} />
                          </animated.div>
                        )}
                      </Spring>}
                      {this.state.levelTimer >= 10 && <Spring
                        from={{ overflow: "hidden", height: 0, width: 0 }}
                        to={{  height: "auto", width: "auto" }}
                      >
                        {(props) => (
                          <animated.div className="wordTimer" style={props}>
                            <Word word={wordObj.word} />
                          </animated.div>
                        )}
                      </Spring>}
                      <div className="timer">
                        {wordObj.getTimeRemaining() >= 0
                          ? wordObj.getTimeRemaining()
                          : 0}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {this.state.levelEnded &&
                this.state.levelTimer <= 0 &&
                this.context.getCurrentCheckpointIndex() !== null && (
                  <div className="winlose-div">
                    {this.state.audio.pause()}{" "}
                    <WinLosePage
                      text={this.winText}
                      condition={"checkpoint"}
                      autoSave={false}
                    />
                  </div>
                )}
              {this.state.levelEnded &&
                this.state.levelTimer <= 0 &&
                this.context.getCurrentCheckpointIndex() === null && (
                  <div className="winlose-div">
                    {this.state.audio.pause()}{" "}
                    <WinLosePage
                      text={this.winText}
                      condition={"level_beaten"}
                      autoSave={true}
                    />
                  </div>
                )}
              {this.state.levelEnded && this.state.playerHealth <= 0 && (
                <div className="winlose-div">
                  {this.state.audio.pause()}{" "}
                  <WinLosePage
                    text={this.loseText}
                    condition={"lose"}
                    autoSave={true}
                  />
                </div>
              )}
            </div>
          )}
        </Spring>
      </>
    );
  }

  render() {
    return (
      <div
        className="game-container"
        style={{
          backgroundImage: `url(${this.state.gameplay_art})`,
          backgroundSize: "cover",
          position: "fixed",
        }}
      >
        {this.context.error === null ? (
          <>
            {!this.state.timer && this.state.initialized
              ? this.renderGameplay()
              : this.renderTimer()}
          </>
        ) : (
          <Redirect to={"/start"} />
        )}
      </div>
    );
  }
}

export default ChallengeRoute;
