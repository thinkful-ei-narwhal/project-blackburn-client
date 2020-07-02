import React, { Component } from 'react'
import { render } from '@testing-library/react'
import ScoreboardApiService from '../Services/scoreboard-api-service'
const BlackBurnContext = React.createContext({
    error: null,
    setError: () => {},
    clearError: () => {},
    getAllScoresContext: () => {}
})

export default BlackBurnContext


export class BlackburnProvider extends Component {
    state = {
        error: null,
        data: []
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    getAllScoresContext = () => {
        return ScoreboardApiService.getAllScores('all')
            .then(res => console.log(res))
    }

    render() {
        const value = {
            error: this.state.error,
            data: this.state.data,
            setError: this.setError,
            clearError: this.clearError,
            getAllScoresContext: this.getAllScoresContext
        }
        return(
            <BlackBurnContext.Provider value = {value}>
                {this.props.children}
            </BlackBurnContext.Provider>
        )
    }
}