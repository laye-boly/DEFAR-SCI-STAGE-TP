const username = document.getElementById("username")
const saveScoreBtn = document.getElementById("saveScoreBtn")
const finalScore = document.getElementById("finalScore")
let players = []
saveScoreBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if(username.value !== ""){
        let player = {
            name: username.value.trim(),
            score: localStorage.getItem("score")
        }
        savePlayer(player)
        location.href ="./index.html"
    }
})

function getPlayers(){
    let players = null
    if(localStorage.getItem("players") !== null){
        players = JSON.parse(localStorage.getItem("players"))
    }
    return players
}

function isPlayerExist(name){
    let players = getPlayers(), available = false
    if(players == null){
        return available;
    }
    for (let i = 0; i < players.length; i++) {
        if(players[i].name === name){
            available =  true
            break
        }      
    }
   
    return available
}
function savePlayer(newPlayer){
   
    let players = getPlayers()
    if(players == null){
        let players = []
        players.push(newPlayer)
        players = JSON.stringify(players)
        localStorage.setItem("players", players)
                
    }else if(isPlayerExist(newPlayer.name)){
        for (let i = 0; i < players.length; i++) {
            if(players[i].name === newPlayer.name){
                players[i].score = newPlayer.score
                players = JSON.stringify(players)
                localStorage.setItem("players", players)
                break
            }      
        }
    }else if(!isPlayerExist(newPlayer.name)){
        players.push(newPlayer)
        players = JSON.stringify(players)
        localStorage.setItem("players", players)
    }
}

finalScore.innerHTML = localStorage.getItem("score")

