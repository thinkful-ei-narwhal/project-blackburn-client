import React from 'react'
import LineChart from './LineChart'
export default class Analytics extends React.Component {


    render() {
        let arrWPM = this.props.myScores.map(data => {
            return data.wpm
        })
        let avgWPM = arrWPM.reduce((a, b) => a + b, 0) / arrWPM.length
        let scoreArr = this.props.myScores.map(data => {
            return data.score
        })
        let avgScore = scoreArr.reduce((a, b) => a + b, 0) / scoreArr.length
        return (
            <div className = 'analytics'>
                <LineChart myScores = {this.props.myScores} />
                <div> <h3>Average Words Per Minute </h3> {avgWPM}</div>
                <div> <h3>Average Score </h3> {avgScore}</div>

            </div>
        )
    }
}
