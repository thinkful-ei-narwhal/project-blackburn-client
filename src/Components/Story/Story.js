import React, { Component } from "react";
import { animated, Transition, Spring } from "react-spring/renderprops.cjs";
import StoryApiService from "../../Services/story-api-service";
import BlackBurnContext from "../../Context/BlackburnContext";
import { Link, Redirect } from "react-router-dom";
import Typist from "react-typist";
import "./Story.css";

//component did mount -> if(context is null redirect to dashboard)

export default class Story extends Component {
  state = {
    story_text: "",
    story_art: "",
    story_name: "",
    audio: "",
    showStory: false,
    index: 0,
  };

  static contextType = BlackBurnContext;

  timer() {
    let split = this.state.story_text.split(".").length;
    this.t1 = setInterval(() => {
      let newState = this.state.index;
      newState++;
      if (this.state.index === split - 1) {
        clearInterval(this.t1);
      }
      return this.setState({ index: newState });
    }, 2000);
  }

  async componentDidMount() {
    this.context.clearError();
    this.context.setMyBestScore();
    const story_id = this.context.story_id;
    const difficulty_setting = this.context.difficulty_setting;
    await StoryApiService.getStory(story_id, difficulty_setting)
      .then((res) => {
        const checkpoints = res.map((checkpoint) => checkpoint);
        if (this.context.getCheckpointIds().checkpointArray.length === 0) {
          this.context.setCheckpointIds(checkpoints);
        }
        this.context.setAudio(
          res[this.context.getCurrentCheckpointIndex()].music
        );
        return this.setState({
          story_text: res[this.context.getCurrentCheckpointIndex()].story_text,
          story_name: res[this.context.getCurrentCheckpointIndex()].story_name,
          story_art: res[this.context.getCurrentCheckpointIndex()].story_art,
          dictionary:
            res[this.context.getCurrentCheckpointIndex()].dictionary_string,
        });
      })
      .catch((err) => this.context.setError(err));

    if (this.state.story_text.length < 599) {
      this.timer();
    }
  }

  renderTyping = () => {
    let split = this.state.story_text.split("<br/>");
    let lines = split.map((x, index) => {
      return { text: x, key: index };
    });
    if (this.state.story_text && this.state.story_text.length > 600) {
      return (
        <div className="story-type-text">
          <Typist avgTypingDelay={10}>
            {lines.map((line) => (
              <div key={line.key}>{line.text}</div>
            ))}
          </Typist>
          <div className="after-timer">
            <Spring
              delay={25000}
              from={{ opacity: 0, height: 0 }}
              to={{ opacity: 1, height: "auto" }}
            >
              {(props) => (
                <Link
                  style={props}
                  className="start-challenge"
                  to={"/challenge"}
                >
                  {" "}
                  Start The Challenge &#x2192;
                </Link>
              )}
            </Spring>
          </div>
        </div>
      );
    } else if (this.state.story_text && this.state.story_text.length < 599) {
      let presplit = this.state.story_text.split(".");
      let split = presplit.map((sentence) =>
        sentence.replace("<br /><br />", "")
      );
      console.log(split);
      split = split.map((x, index) => {
        return { text: x, key: index };
      });
      const animatedTextDiv = split.map((text) => (style) => (
        <animated.div
          style={{ ...style }}
          dangerouslySetInnerHTML={{ __html: text.text }}
        >
          {}
        </animated.div>
      ));
      let arrLength = animatedTextDiv.length;
      return (
        <div className="story-type-text">
          {this.state.index === arrLength && (
            <div className="after-timer">
              {
                <Spring
                  from={{ opacity: 0, height: 0 }}
                  to={{ opacity: 1, height: "auto" }}
                >
                  {(props) => (
                    <Link
                      style={props}
                      className="start-challenge"
                      to={"/challenge"}
                    >
                      {" "}
                      Start The Challenge &#x2192;
                    </Link>
                  )}
                </Spring>
              }
              <Spring
                from={{ opacity: 0, height: 0 }}
                to={{ opacity: 1, height: "auto" }}
              >
                {(props) => (
                  <div
                    style={props}
                    className="story"
                    dangerouslySetInnerHTML={{ __html: this.state.story_text }}
                  >
                    {}
                  </div>
                )}
              </Spring>
            </div>
          )}
          <Transition
            items={this.state.index}
            keys={(item) => item.key}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {(index) => animatedTextDiv[index]}
          </Transition>
        </div>
      );
    }
  };

  componentWillUnmount() {
    clearInterval(this.t1);
  }

  render() {
    let split = this.state.story_text.split(".");
    split = split.map((x, index) => {
      return { text: x, key: index };
    });

    const animatedTextDiv = split.map((text) => (style) => (
      <animated.div
        style={{ ...style }}
        dangerouslySetInnerHTML={{ __html: text.text }}
      >
        {}
      </animated.div>
    ));
    let arrLength = animatedTextDiv.length;

    return (
      <div className="story-container">
        {this.context.error === null ? (
          <>
            {this.state.index !== arrLength && (
              <div className="skip">
                <Link to={"/challenge"}> Skip Story &#x2192;</Link>
              </div>
            )}
            <h2 className="story-name">{this.state.story_name}</h2>
            <img
              src={this.state.story_art}
              alt="Art for the story"
              width="300"
              height="200"
            />
            <div className="story">{this.renderTyping()}</div>
          </>
        ) : (
          <Redirect to={"/start"} />
        )}
      </div>
    );
  }
}
