import React, { Component } from "react";
import { animated, Transition, Trail } from "react-spring/renderprops";
import StoryApiService from "../../Services/story-api-service";
import ScoreboardApiService from "../../Services/scoreboard-api-service";
import "./Story.css";
import BlackBurnContext from "../../Context/BlackburnContext";
import { Link } from "react-router-dom";



export default class Story extends Component {
  // CLICK START --> Render the First Checikpoint (the story page)
  state = {
    story_text: "",
    story_art: "https://source.unsplash.com/random",
    story_name: "",
  };

  static contextType = BlackBurnContext;

  componentDidMount() {
    this.context.setMyBestScore();
    const story_id = this.context.story_id;
    const difficulty_setting = this.context.difficulty_setting;
    StoryApiService.getStory(story_id, difficulty_setting).then((res) => {
      if (this.context.getCheckpointIds() === null) {
        const checkpoints = res.map((checkpoint) => checkpoint);
        this.context.setCheckpointIds(checkpoints, 0);
      }

      return this.setState({
        story_text: res[0].story_text,
        story_name: res[0].story_name,
        story_art: res[0].story_art,
      });
    });
  }

  render() {
    let split = this.state.story_text.split(".");
    split = split.map((x, index) => {
      return { x: x, key: index };
    });
    const items = split
    return (
      <div className="story-container">
        <h2 className="story-name">{this.state.story_name}</h2>
        <img
          className="story-img"
          src="https://loremflickr.com/320/240"
          alt="coolpic"
        />
        <Trail
         items={items} keys={item => item.key}
         from={{ opacity: 0, x: -100 }}
         to={{ opacity: 1, x: 100 }}
        >
             {item => ({ x, opacity }) => (
            <animated.div
              className="box"
              style={{
                opacity,
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
              }}
            />
          )}
        </Trail>
        <Link to={"/challenge"}> Start The Challenge </Link>
      </div>
    );
  }
}
