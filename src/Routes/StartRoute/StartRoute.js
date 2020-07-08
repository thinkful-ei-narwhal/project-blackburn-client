import React, { Component } from "react";
import Button from "../../Components/Button/Button";
import storyService from "../../Services/story-api-service";
import BlackburnContext from "../../Context/BlackburnContext";
import { Link, Redirect } from "react-router-dom";
import { Input, Label } from "./../../Components/Form/Form";
import "./StartRoute.css";
import { Container, Row, Col } from "react-grid-system";

class StartRoute extends Component {
  static contextType = BlackburnContext;
  constructor(props) {
    super(props);
    this.state = {
      story_id: 1,
      difficulty_setting: "medium",
      stories: [],
      redirect: false,
    };
    this.handleStorySubmit = this.handleStorySubmit.bind(this);
  }

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
    this.context.setStoryState(
      this.state.story_id,
      this.state.difficulty_setting
    );
    this.setState({ redirect: true });
  };

  renderStories() {
    return (
      //youre figuring out how to select a radio button
      //change img on line 37 to back ground of line 36 if we wish
      <div className="story-list">
        {this.state.stories.map((story) => (
          <label key={story.id} className="story-label" htmlFor={`${story.id}`}>
            <div className="story_panel" id={`story_panel ${story.id}`}>
              <img src={story.story_thumbnail} width="100px" />
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
      <>
        {this.state.redirect ? (
          <Redirect to={"/storypage"} />
        ) : (
          <>
            <Link to="/dashboard">
              <Button className="back-btn"> &#8592; </Button>
            </Link>
            <h2 className="start-header">Select a Story</h2>
            <div className="startpage-main">
              <form
                className="start-page-form"
                id="story_form"
                onSubmit={(e) => this.handleStorySubmit(e)}
              >
                <Container>
                  <Col>
                    <Row>{this.renderStories()}</Row>
                  </Col>
                </Container>
                <Container>
                  <Row>
                    <Col>
                      <label
                        className="difficulty-label"
                        htmlFor="select_difficulty"
                      >
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
                    </Col>
                  </Row>
                </Container>
              </form>
            </div>
          </>
        )}
      </>
    );
  }
}
export default StartRoute;
