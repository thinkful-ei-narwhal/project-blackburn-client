import React, { Component } from 'react'
import { Trail } from 'react-spring/renderprops'
import StoryApiService from '../../Services/story-api-service'
import './Story.css'
export default class Story extends Component {

// CLICK START --> Render the First Checikpoint (the story page) 
    state = {
        story_text: '',
        story_art:'https://source.unsplash.com/random',
        story_name: ''
    }

    componentDidMount() {
        const story_id = this.props.story_id
        const difficulty_setting = this.props.difficulty_setting
        const checkpoint_id = this.props.checkpoint_id
        console.log(checkpoint_id, difficulty_setting, story_id)
        StoryApiService.getStory(1, 'easy', 1)
        .then(res =>  {
            console.log(res)
           return this.setState({ 
                story_text: res[0].story_text,
                story_name: res[0].story_name,
                story_art: res[0].story_art
            })
        })
    }


    render() {
        let split = this.state.story_text.split('.')
        split = split.map((x, index) => {
            return {x: x, key: index}
        })
        console.log(split)
        return (
            <div className = 'story-container'>
                <h2 className = 'story-name'>{this.state.story_name}</h2>
                <img className = 'story-img' src="https://loremflickr.com/320/240" alt = 'coolpic' />
                <Trail delay = {1000} items={split} keys={item => item.key} from={{opacity: 0}} to={{opacity: 1}}>
                    {item => props => <span className = 'story-text' style={props}>{item.x}</span>}
                </Trail>            
            </div>
        )
    }
}