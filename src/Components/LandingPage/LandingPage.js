import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import Button from '../Button/Button'
export default class LandingPage extends React.Component {

    state = {
        moreInfoExpanded: true
    }

    // handleExpand = () => {
    //     if(!this.state.moreInfoExpanded) {
    //         this.setState({ moreInfoExpanded: true})
    //     }
    //     else {
    //         this.setState({ moreInfoExpanded: false})
    //     }
    // }

    render() {
        return (
            <div className = 'landing-page-container'>
                <div>
                    <h1 className = 'landing-page-h1'> Project <br /> Blackburn </h1>
                    <h2> </h2>
                </div>
                {/* <Button onClick = {() => this.handleExpand()} className = 'more-info'> 
                    {(this.state.moreInfoExpanded) ? 'Less Info' : 'More Info'}
                </Button> */}
                <div className = {(this.state.moreInfoExpanded) ? 'info-expanded' : 'info'}>
                    <p>
                        Welcome to Project Blackburn <br />
                        A classified and interactive typing game <br />
                        Track your progress and compete with typers around the world <br />
                        Create an account or login to begin
                    </p>
                </div>
                <nav className = 'landing-page-nav'>
                    <Link to = {'/login'} className = 'login-signup'> Login </Link>
                    <Link to = {'/registration'} className = 'login-signup'> Sign Up </Link>
                </nav>
            </div>
        )
    }
}