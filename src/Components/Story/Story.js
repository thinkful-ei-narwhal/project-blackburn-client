import React, { Component } from "react";
import { animated, Transition, Spring } from "react-spring/renderprops";
import StoryApiService from "../../Services/story-api-service";
import ScoreboardApiService from "../../Services/scoreboard-api-service";
import "./Story.css";
import BlackBurnContext from "../../Context/BlackburnContext";
import { Link } from "react-router-dom";
import Typist from 'react-typist';

//component did mount -> if(context is null redirect to dashboard)


export default class Story extends Component {
  // CLICK START --> Render the First Checkpoint (the story page)
  state = {
    story_text: '',
    story_art: "https://source.unsplash.com/random",
    story_name: "",
    showStory: false,
    index: 0
  };

  static contextType = BlackBurnContext;

    timer() {
        let split = this.state.story_text.split(".").length;
        this.t1 = setInterval(() => {
            let newState = this.state.index
            newState++
            if(this.state.index === split - 1) {
                clearInterval(this.t1)
            }        
            return this.setState({index: newState})}, 2000)
  }

   async componentDidMount() {
    this.context.setMyBestScore();
    const story_id = this.context.story_id;
    const difficulty_setting = this.context.difficulty_setting;
    await StoryApiService.getStory(story_id, difficulty_setting).then((res) => {
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

    if(this.state.story_text.length < 599) {
        this.timer()
    }
  }

  renderTyping = () => {
    if(this.state.story_text && this.state.story_text.length > 600) {
        return (
            <div className = 'story-type-text'>  
                <Typist avgTypingDelay = {35}>
                    {this.state.story_text}
                </Typist>
                <div className = 'after-timer'>
                <Spring delay = {25000} from = {{opacity: 0, height: 0}} to = {{opacity: 1, height: 'auto'}}>
                        {props => <Link style = {props} className = 'start-challenge' to={"/challenge"}> Start The Challenge &#x2192;</Link>}
                </Spring>
                </div>
            </div>
            )
    }
    else if (this.state.story_text && this.state.story_text.length < 599) {
        let split = this.state.story_text.split(".");
        split = split.map((x, index) => {
        return { text: x, key: index };
        });
        const animatedTextDiv = split.map(text => style => (<animated.div style={{ ...style }}>{text.text}</animated.div>))
        let arrLength = animatedTextDiv.length
        return (
            <div>
               {(this.state.index === arrLength) && 
                <div className = 'after-timer'> 
                    {
                    <Spring from = {{opacity: 0, height: 0}} to = {{opacity: 1, height: 'auto'}}>
                        {props => <Link style = {props} className = 'start-challenge' to={"/challenge"}> Start The Challenge &#x2192;</Link>}
                    </Spring>
                    }
                    <Spring from = {{opacity: 0, height: 0}} to = {{opacity: 1, height: 'auto'}}>
                        {props => <div style = {props} className = 'story'>{this.state.story_text}</div>}
                    </Spring>  
                </div>}
                    <Transition
                        items={this.state.index} keys={item => item.key}
                        from={{ opacity: 0 }}
                        enter={{ opacity: 1 }}
                        leave={{ opacity: 0  }}>
                            {index => animatedTextDiv[index]}
                    </Transition>
            </div>
        )
    }
  }


  componentWillUnmount() {
    clearInterval(this.t1);
  }

  render() {
    let split = this.state.story_text.split(".");
    split = split.map((x, index) => {
      return { text: x, key: index };
    });
    const animatedTextDiv = split.map(text => style => (<animated.div style={{ ...style }}>{text.text}</animated.div>))
    let arrLength = animatedTextDiv.length
    return (
      <div className="story-container">
            <div className = 'skip'>
        { 
            (this.state.index !== arrLength ) &&
            <Link to={"/challenge"}> Skip Story &#x2192;</Link>
        }        
            </div>
        <h2 className="story-name">{this.state.story_name}</h2>
        <div className = 'story'>
            {this.renderTyping()}
        </div>
      </div>
    );
  }
}
