import React, { Component } from 'react'
import { render } from '@testing-library/react'

const BlackBurnContext = React.createContext({
    error: null,
    setError: () => {},
    clearError: () => {}
})

export default BlackBurnContext


export class BlackburnProvider extends Component {
    state = {
        error: null
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }


render() {
        const value = {
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError
        }
        return(
            <BlackBurnContext.Provider value = {value}>
                {this.props.children}
            </BlackBurnContext.Provider>
        )
    }
}