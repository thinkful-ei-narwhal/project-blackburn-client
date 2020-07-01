import React, { Component } from "react";
import Button from "../../Components/Button/Button";
class StartRoute extends Component {
  //static contextType = BlackburnContext
  //const stories = this.context.stories
  state = {
    storyid: "null",
    difficulty: "",
  };

  handleStorySubmit = (e) => {
    e.preventDefault();
    console.log(e.target.select_difficulty.value, e.target.);
  };

  renderStories() {
    const dummyStories = [
      { storyid: "detective", synopsis: "whodunnit? butler probz" },
      { storyid: "batman", synopsis: "joker? i hardly know her" },
      { storyid: "sultry tales", synopsis: "don't type...too fast" },
      { storyid: "drones", synopsis: "'murica" },
      {
        storyid: "monster hunter",
        synopsis:
          "with three red bulls and a dream, seek to take down an industry",
      },
    ];
    return (
      <div className="story-list">
        <h2>Select a Story</h2>
        {dummyStories.map((x) => (
          <label key={x.storyid} className="story-label" htmlFor={x.storyid}>
            <div className="story_panel" id="story_panel">
              <h4>{x.storyid}</h4>
              <p>{x.synopsis}</p>
              <input
                type="radio"
                name="story_select"
                id={x.storyid}
                value={x.storyid}
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
