import React from 'react'
import { VictoryChart, VictoryTheme, VictoryLine} from 'victory';
import BlackBurnContext from '../../Context/BlackburnContext';
import './LineChart.css'

export default class LineChart extends React.Component {

    static contextType = BlackBurnContext

    render() {
        const formatData = this.props.myScores.map(data => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            const newDate = new Date(data.date).toLocaleDateString('en-US', options)
            return { date: newDate, score: data.score, wpm: data.wpm }
        })
        const wpmData = formatData.map(data => {
            return { x: data.date, y: data.wpm }
        })
        const scoreData = formatData.map(data => {
            return { x: data.date, y: data.score }
        })
        return(
            <div className = 'graphs'>
                <div className = 'score-graph'>
                    <h3> Score Over Time </h3>
                    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                        <VictoryLine 
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc" }
                        }}
                            data = {scoreData}
                        />
                    </VictoryChart>
                </div>
               <div className = 'wpm-graph'>
                    <h3> WPM Over Time </h3>
                    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                        <VictoryLine 
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc" }
                        }}
                            data = {wpmData}
                        />
                    </VictoryChart>
                </div>
            </div>
        )
    }
}