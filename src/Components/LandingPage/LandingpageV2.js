import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import { Spring } from 'react-spring/renderprops'
import './LandingPage.css'
import LeaderBoard from '../../Assets/Icons/Untitled.png'

export default class App extends React.Component {
  render() {
    return (
      <Parallax ref={ref => (this.parallax = ref)} pages={3}>
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

        <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundColor: '#302B28'  }} />

        <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
          
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src='https://img.icons8.com/metro/26/000000/fraud.png' alt = 'fraud main' style={{ display: 'block', width: '10%', marginLeft: '55%' }} />
        </ParallaxLayer> 

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src='https://img.icons8.com/metro/26/000000/fraud.png' alt = 'fraud main' style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src='https://img.icons8.com/metro/26/000000/fraud.png' alt = 'fraud main' style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src='https://img.icons8.com/metro/26/000000/fraud.png' alt = 'fraud main' style={{ display: 'block', width: '10%', marginLeft: '85%' }} />
          <img src='https://img.icons8.com/metro/26/000000/fraud.png' alt = 'fraud main' style={{ display: 'block', width: '10%', marginLeft: '5%' }} />
          <img src='https://img.icons8.com/metro/26/000000/fraud.png' alt = 'fraud main' style={{ display: 'block', width: '10%', marginLeft: '30%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img src='https://img.icons8.com/metro/26/000000/fraud.png' alt = 'fraud main' style={{ display: 'block', width: '10%', marginLeft: '75%' }} />
          <img src='https://img.icons8.com/metro/26/000000/fraud.png' alt = 'fraud main' style={{ display: 'block', width: '10%', marginLeft: '65%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        </ParallaxLayer>

        <ParallaxLayer
          offset={-0.1}
          speed={0.1}
          onClick={() => this.parallax.scrollTo(1)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1> Project <br /> Blackburn</h1>
          <br />
          <div style = {{fontSize: 20, margin: 5, borderBottom: '1px solid grey'}}>Click Anywhere To Read More About The Game</div>

        </ParallaxLayer>
        <ParallaxLayer offset = {.6} speed = {.2}>
            <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            delay={1000}
            trail={1000}
            >
            {(props) => (
                <nav className="landing-page-nav" style={{...props}}>
                <Link to={"/login"} className="login-signup">
                    {" "}
                    Login{" "}
                </Link>
                <Link to={"/registration"} className="login-signup">
                    {" "}
                    Sign Up{" "}
                </Link>
                </nav>
            )}
            </Spring>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => this.parallax.scrollTo(2)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className = 'landingText'>
            Whether to increase your typing accuracy or speed, everyone could
            benefit from a typing tutor. The trouble is that practicing typing
            the conventional way is boring, and most typing games forget that
            they should be games first and typing tutors second.
            <br />
            That's why we built Project Blackburn, 
            A typing tutor that knows how
            to make learning fun! Project Blackburn hosts a collection of
            campaigns from your to choose from that help you increase your
            typing skill. Each campaign can be played on multiple difficulty
            settings, and your runs are recorded to track your progress over
            time. Project Blackburn also has a leaderboard so you can compete to
            be the fastest typer!{" "}
          </p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => this.parallax.scrollTo(0)}>
              <img src = {LeaderBoard} />
        </ParallaxLayer>
        <ParallaxLayer
          offset={1.55}
          speed={-0}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => this.parallax.scrollTo(0)}>
              <h4 style = {{color: 'white'}}> Compete with others around the World!</h4>
        </ParallaxLayer>
      </Parallax>
    )
  }
}