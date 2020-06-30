import React from 'react'
import { VictoryLegend, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLine} from 'victory';


export default class LineChart extends React.Component {

    render() {
        const data1 = [
            {y: 12020, x: '01/02/2020'},
            {y: 244442, x: '01/03/2020'},
            {y: 1115, x: '01/05/2020'},
            {y: 424, x: '02/02/2020'},
            {y: 111245, x: '03/02/2020'},
        ]

        const data2 = [
            {wpm: 10, date: '01/02/2020'},
            {wpm: 20, date: '01/03/2020'},
            {wpm: 30, date: '01/05/2020'},
            {wpm: 10, date: '02/02/2020'},
            {wpm: 50, date: '03/02/2020'},
        ]

        return(
            <>
                <h3> Words Per Minute </h3>
                <VictoryChart theme={VictoryTheme.material}  domainPadding={20}>
                    <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6]}/>
                    <VictoryAxis dependentAxis  tickValues={[10, 20, 30, 40, 50, 60]}/>
                    <VictoryBar data = {data2} x = 'date' y = 'wpm'/>
                </VictoryChart>
                <h3> Average Score </h3>
                <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                        <VictoryLine 
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc"}
                        }}
                        data = {data1}
                        />
                </VictoryChart>
            </>
        )
    }
}