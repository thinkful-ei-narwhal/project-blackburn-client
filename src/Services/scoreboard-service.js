import config from '../config'
import TokenService from './token-service'

const scoreboardService = {

    getScoresByUser(userId) {
        fetch(`${config.API_ENDPOINT}/scoreboard?request=myscores&userid=${userId}`, {
            'authorization': `Bearer ${TokenService.getAuthToken}`
        })
        .then(res => res.json())
    }
}


export default scoreboardService