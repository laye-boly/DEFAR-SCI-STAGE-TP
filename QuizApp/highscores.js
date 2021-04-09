let numberHighScorePlayed = 3
const players = getPlayers()
if(players !== null){
    const nbrePlayers = players.length
    if(nbrePlayers.length < numberHighScorePlayed){
        numberHighScorePlayed = nbrePlayers
    }
    rangePlayersByScoreDesc(players)
    let highScoresList = document.getElementById("highScoresList")
    for (let index = 0; index < numberHighScorePlayed; index++) {
        let li = document.createElement("li")
        li.classList.add("high-score")
        li.innerHTML = `${players[index].name} - ${players[index].score}`
        highScoresList.appendChild(li)
    }
}
function getPlayers(){
    let players = null
    if(localStorage.getItem("players") !== null){
        players = JSON.parse(localStorage.getItem("players"))
    }
    return players
}


function rangePlayersByScoreDesc(players){
    players.sort(function (a, b) {
            return parseInt(b.score) - parseInt(a.score);
    });
    
}
rangePlayersByScoreDesc(getPlayers())