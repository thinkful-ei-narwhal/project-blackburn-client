import React, { Component } from 'react';
import Button from '../../Components/Button/Button';
import storyService from '../../Services/story-api-service';
//import './StartRoute.Module.css';

class StartRoute extends Component {
  //static contextType = BlackburnContext
  //const stories = this.context.stories
  state = {
    story_id: 'null',
    difficulty_setting: '',
    stories: [],
  };

  componentDidMount() {
    storyService.getAllStories().then((stories) => {
      this.setState({ stories: stories });
    });
  }

  handleDifficulty = (e) => {
    this.setState({ difficulty_setting: e.target.value });
  };

  handleInputSelect = (e) => {
    this.setState({ story_id: e.target.value });
  };

  handleStorySubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    //grab checkpoint ID and pass to story component
  };

  renderStories() {
    return (
      //youre figuring out how to select a radio button
      //change img on line 37 to back ground of line 36 if we wish
      <div className="story-list" onChange={(e) => this.handleStorySubmit(e)}>
        <h2>Select a Story</h2>
        {this.state.stories.map((story) => (
          <label key={story.id} className="story-label" htmlFor={`${story.id}`}>
            <div className="story_panel" id={`story_panel ${story.id}`}>
              <img src={story.story_thumbnail} />
              <h4>{story.story_name}</h4>
              <p>{story.story_synopsis}</p>
              <input
                className="inputform"
                type="radio"
                name="story_select"
                id={story.story_name}
                value={story.id}
                onChange={this.handleInputSelect}
                selected={this.state.story_id === `${story.id}`}
              />
            </div>
          </label>
        ))}
      </div>
    );
  }
  render() {
    return (
      <div className="startpage-main">
        <form
          className="start-page-form"
          id="story_form"
          onSubmit={this.handleStorySubmit}
        >
          {this.renderStories()}
          <label className="difficulty-label" htmlFor="select_difficulty">
            Difficulty
          </label>
          <select
            className="select-difficulty"
            id="select_difficulty"
            defaultValue="medium"
            onChange={this.handleDifficulty}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <Button className="difficulty-btn" type="submit">
            Start
          </Button>
        </form>
      </div>
    );
  }
}
export default StartRoute;
