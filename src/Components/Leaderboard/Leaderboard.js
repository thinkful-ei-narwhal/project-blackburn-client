import React from 'react'
import './Leaderboard.Module.css'
import { Trail } from 'react-spring/renderprops'
import BlackBurnContext from '../../Context/BlackburnContext'
import { FaCrown } from 'react-icons/fa'

export default class Leaderboard extends React.Component {
  static contextType = BlackBurnContext;

  constructor(props) {
    super(props)
    this.state = {
      overall: true,
      byStory: false,
      story: 'monsters',
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }
  
  handleOverallState = () => {
    if (!this.state.overall) {
      this.setState({ overall: true, byStory: false });
    }
  };

  handleByStoryState = () => {
    if (!this.state.byStory) {
      this.setState({ overall: false, byStory: true });
    }
  };

  componentDidMount() {
    this.context.getTopTenScores();
    this.context.getMyScores();

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

    renderLeaderBoard = () => {
        if(this.state.overall) {
            return this.context.topTenScores.sort((a,b) => b - a).slice(0, 10).map((score, index) => {
                return(
                <>
                 <Trail items = {score} from = {{opacity: 0}} to = {{opacity: 1}}  key = {index}>   
                   { 
                    score => props => 
                    <div>
                        <li key = {index} className = 'leaderboard-list' style = {{
                            ...props}}> 
                            <span className = 'username'> 
                                {index + 1} 
                                {(index + 1 === 1) ? <FaCrown style = {{margin: 6}} /> : null}
                            </span> 
                            {this.state.width > 800 && <div className = 'avatar'> <img src = {this.context.user.avatar} alt = {`Avatar ${this.context.user.avatar}`} /> </div>}
                            <span className = 'username' 
                                style = {(this.context.user.username === score.username) ? {color:'red'} : {color: 'black'}}> 
                                {score.username}
                            </span> 
                            {/* <span className = 'score'> {(this.context.user.username === score.username) ? <FaCrown /> : null }</span> */}
                            <span className = 'score'> {score.score} </span> 
                        </li>
                    </div>
                    }
                </Trail>
                </>
                )
            })
        }
    }


  handleOption = (e) => {
    this.setState({
      story: e.target.value,
    });
  };

  render() {
    console.log(this.state.width)
    const myScoreArr = this.context.myScores.map((score) => score.score);
    const maxMyScore = Math.max(...myScoreArr);
    return (
      <div className="leaderboard">
        {/* <div className = 'leaderboard-buttons'>
                    <Button onClick = {() => this.handleOverallState()}> Overall </Button>
                    <Button onClick = {() => this.handleByStoryState()}> By Story </Button>
                </div> */}
        {/* {(this.state.byStory) 
                    ? <div className = 'select-story'>
                        <Label htmlFor = 'stories' > Select a Story   </Label>
                        <select name = 'stories' onChange = {(e) => this.handleOption(e)}>
                            <option value = 'monsters'>Monsters</option>
                            <option value = 'detective'>Detective</option>
                        </select>
                    </div> 
                    : <></>} */}
                <div className = 'leaderboard-header'>
                    <h2> Leader Board </h2>
                </div>
                <ul className = 'list-container'>
                    <li key = {'topscore'} className = 'leaderboard-list' style = {{margiBottom: '10px'}}>  
                        <span className = 'username'> Your Top Score </span> 
                        {this.state.width > 800 && <div className = 'avatar'> <img src = {this.context.user.avatar}/> </div>}
                        <span className = 'username'> {this.context.user.username} </span> 
                        <span className = 'score'> {(maxMyScore === '-Infinity') ? maxMyScore : 'No Scores'} </span>  
                    </li>
                    {    
                       this.renderLeaderBoard()
                    }   
                   
                </ul>
      </div>
    );
  }
}
