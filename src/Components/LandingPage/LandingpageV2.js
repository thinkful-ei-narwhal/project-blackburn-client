import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import { Spring } from 'react-spring/renderprops'
import './LandingPage.css'
import LeaderBoard from '../../Assets/Icons/Untitled.png'

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
const Pink = ({ children }) => <span style={{ color: '#FF6AC1' }}>{children}</span>
const Yellow = ({ children }) => <span style={{ color: '#EFF59B' }}>{children}</span>
const Lightblue = ({ children }) => <span style={{ color: '#9AEDFE' }}>{children}</span>
const Green = ({ children }) => <span style={{ color: '#57EE89' }}>{children}</span>
const Blue = ({ children }) => <span style={{ color: '#57C7FF' }}>{children}</span>
const Gray = ({ children }) => <span style={{ color: '#909090' }}>{children}</span>

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
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer> 

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        </ParallaxLayer>

        {/* <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: url('clients', true)
          }}
        /> */}

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => this.parallax.scrollTo(1)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* <img src = {LeaderBoard} /> */}
          <h1> Project <br /> Blackburn</h1>
          <br />
          <div style = {{fontSize: 20, margin: 5}}>Click To Read More About The Game</div>
        </ParallaxLayer>
        <ParallaxLayer offset = {.6} speed = {.2}>
            <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            delay={1000}
            trail={1000}
            >
            {(props) => (
                <nav className="landing-page-nav" style={props}>
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