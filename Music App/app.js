window.addEventListener("load", (e) => {
    // Récupération de tous les sons à jouer
    const sounds = document.querySelectorAll(".sound")
    // recuperations des container des sons
    const soundsContainer = document.querySelectorAll(".pads [class^='pad']") 
    // console.log(soundsContainer)

    // On récpure la div qui permet de montrer des bulles correspond au couleurs
    // du contenuer du son quand ce dernier est joué
    const visual = document.querySelector(".visual")
    
    // On joue un son quand on clique sur un soundCountainer
    soundsContainer.forEach(soundContainer => {
        
        soundContainer.addEventListener("click", () => {
            let soundContainerName = soundContainer.getAttribute("name")
            // On récupre le son a jouer
            let sound = document.querySelector("."+soundContainerName+" audio")
            // On arrete le dernier son qui était en train d'etre jouer
            sound.currentTime = 0
            // on joue le son actuel
            sound.play()
            // on récupere le background color de soundContainer et on le passe à notre fonction createBubbles
            let color = window.getComputedStyle(soundContainer, null).getPropertyValue("background-color");
            createBubbles(color)
            
        })
    })

    // creations des bulles à chaque fois qu'un song est joué
    function createBubbles(color){
        let bubble = document.createElement("div")
        bubble.style.background = color
        visual.appendChild(bubble)
        bubble.style.animation = "jump 1s ease"
        // Pour ne pas polluer notre DOM, on supprime chaque bulles crée desla fin de son animation
        bubble.addEventListener("animationend", function(){
            visual.removeChild(bubble)
        })
    }
})