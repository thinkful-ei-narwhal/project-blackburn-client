import React from 'react'
import './Leaderboard.Module.css'
import Button from '../Button/Button'
import { Trail } from 'react-spring/renderprops'
import { Input, Label } from '../Form/Form'
export default class Leaderboard extends React.Component {

    state = {
        overall: true,
        byStory: false,
        story: 'monsters'
    }


    handleOverallState = () => {
        if(!this.state.overall) {
            this.setState({ overall: true, byStory: false})
        }
    }

    handleByStoryState = () => {
        if(!this.state.byStory) {
            this.setState({ overall: false, byStory: true})
        }
    }


    renderLeaderBoard = () => {
        if(this.state.overall) {
            return this.props.allScores.sort((a,b) => b - a).map((score, index) => {
                return(
                 <Trail items = {score} from = {{opacity: 0}} to = {{opacity: 1}}>   
                  {score => props =>  <li className = 'leaderboard-list' key = {index} style = {props}> 
                        <span className = 'username'> {index + 1} </span> 
                        <div className = 'avatar'></div>
                        <span className = 'username'> {score.username} </span> 
                        <span className = 'score'> {score.score} </span> 
                    </li>}
                </Trail>
                )
            })
        }
        else if(this.state.byStory && this.state.story === 'monsters') {
            return this.props.allScores.filter(data => data.storyId === 'monster').sort((a,b) => b - a).map((score, index) => {
                return(
                <li className = 'leaderboard-list' key = {index} > 
                    <span className = 'username'> {index + 1} </span> 
                    <div className = 'avatar'></div>
                    <span className = 'username'> {score.username} </span> 
                    <span className = 'score'> {score.score} </span> 
                </li>
                )
            })
        }
        else if(this.state.byStory && this.state.story === 'detective') {
            return this.props.allScores.filter(data => data.storyId === 'detective').sort((a,b) => b - a).map((score, index) => {
                return(
                <li className = 'leaderboard-list' key = {index} > 
                    <span className = 'username'> {index + 1} </span> 
                    <div className = 'avatar'></div>
                    <span className = 'username'> {score.username} </span> 
                    <span className = 'score'> {score.score} </span> 
                </li>
                )
            })
        }
    }

    handleOption = (e) => {
        this.setState({
            story: e.target.value
        })
    }

    render() {
        return (
            <div className = 'leaderboard'>
                <div className = 'leaderboard-buttons'>
                    <Button onClick = {() => this.handleOverallState()}> Overall </Button>
                    <Button onClick = {() => this.handleByStoryState()}> By Story </Button>
                </div>
                {(this.state.byStory) 
                    ? <div className = 'select-story'>
                        <Label htmlFor = 'stories' > Select a Story   </Label>
                        <select name = 'stories' onChange = {(e) => this.handleOption(e)}>
                            <option value = 'monsters'>Monsters</option>
                            <option value = 'detective'>Detective</option>
                        </select>
                    </div> 
                    : <></>}
                <ul className = 'list-container'>
                    {    
                       this.renderLeaderBoard()
                    }   
                </ul>
            </div>
        )
    }
}