import React from 'react'
import {  VictoryChart, VictoryTheme, VictoryLine} from 'victory';


export default class LineChart extends React.Component {

    render() {
        const wpmData = this.props.myScores.map(data => {
            return { x: data.date, y: data.wpm }
        })
        const scoreData = this.props.myScores.map(data => {
            return { x: data.date, y: data.score }
        })
        return(
            <>
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
            </>
        )
    }
}