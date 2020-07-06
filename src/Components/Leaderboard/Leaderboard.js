import React from 'react'
import './Leaderboard.Module.css'
import Button from '../Button/Button'
import { Trail } from 'react-spring/renderprops'
import { Label } from '../Form/Form'
import BlackBurnContext from '../../Context/BlackburnContext'
export default class Leaderboard extends React.Component {

    static contextType = BlackBurnContext

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

    componentDidMount() {
        this.context.getTopTenScores()
        this.context.getMyScores()
    }

    renderLeaderBoard = () => {
        if(this.state.overall) {
            return this.context.topTenScores.sort((a,b) => b - a).slice(0, 10).map((score, index) => {
                return(
                 <Trail items = {score} from = {{opacity: 0}} to = {{opacity: 1}}  key = {index}>   
                   {
                       // if logged in user == leaderboard user 
                       // render the list item differently 
                    score => props => 
                    <div>
                        
                        <li className = 'leaderboard-list' style = {props}> 
                            <span className = 'username'> {index + 1} </span> 
                            <div className = 'avatar'> {this.context.user.avatar} </div>
                            <span className = 'username'> {score.username} </span> 
                            <span className = 'score'> {score.score} </span> 
                        </li>
                    </div>
                    }
                </Trail>
                )
            })
        }
        // else if(this.state.byStory && this.state.story === 'monsters') {
        //     return this.props.allScores.filter(data => data.storyId === 'monster').sort((a,b) => b - a).map((score, index) => {
        //         return(
        //         <li className = 'leaderboard-list' key = {index} > 
        //             <span className = 'username'> {index + 1} </span> 
        //             <div className = 'avatar'></div>
        //             <span className = 'username'> {score.username} </span> 
        //             <span className = 'score'> {score.score} </span> 
        //         </li>
        //         )
        //     })
        // }
        // else if(this.state.byStory && this.state.story === 'detective') {
        //     return this.props.allScores.filter(data => data.storyId === 'detective').sort((a,b) => b - a).map((score, index) => {
        //         return(
        //         <li className = 'leaderboard-list' key = {index} > 
        //             <span className = 'username'> {index + 1} </span> 
        //             <div className = 'avatar'></div>
        //             <span className = 'username'> {score.username} </span> 
        //             <span className = 'score'> {score.score} </span> 
        //         </li>
        //         )
        //     })
        // }
    }

    handleOption = (e) => {
        this.setState({
            story: e.target.value
        })
    }

    render() {
        const myScoreArr = this.context.myScores.map(score => score.score)
        const maxMyScore = Math.max(...myScoreArr)
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
                    <li className = 'leaderboard-list' style = {{marginTop: '10px'}}>  
                        <span className = 'username'> Your Top Score </span> 
                        <div className = 'avatar'> {this.context.user.avatar} </div>
                        <span className = 'username'> {this.context.user.username} </span> 
                        <span className = 'score'> {maxMyScore} </span>  
                    </li>
                </ul>
            </div>
        )
    }
}