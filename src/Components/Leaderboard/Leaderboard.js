import React from 'react'
import './Leaderboard.Module.css'
import Button from '../Button/Button'
import { Input, Label } from '../Form/Form'
export default class Leaderboard extends React.Component {


    render() {

            
        return (
            <div className = 'leaderboard'>
                <div className = 'leaderboard-buttons'>
                    <Button> Overall </Button>
                    <Button> By Story </Button>
                    <Label htmlFor = 'search'></Label>
                    <Input name = 'search' placeholder = 'Search User'/>
                </div>

               <ul className = 'list-container'>
                   <li className = 'leaderboard-list'> 1 <div className = 'avatar'></div> Ishikon - 100000000000</li>
                   <li className = 'leaderboard-list'> 2<div className = 'avatar'></div> Nick - 99999999</li>
                   <li className = 'leaderboard-list' > 3 <div className = 'avatar'></div>Ren - 9954641</li>
                   <li className = 'leaderboard-list'> 4 <div className = 'avatar'></div> Tyler - 15454121</li>
                   <li className = 'leaderboard-list'> 5<div className = 'avatar'></div> Jacob - 1 </li>
               </ul>
            </div>
        )
    }
}