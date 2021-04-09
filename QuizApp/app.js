const questions = [
    {
        question: "Quel est le doctype d'un document HTML5 ?",
        responses: [
            {
                name: "&lt;!DOCTYPE html5&gt;",
                valid: "true"
            },
            {
                name: "&lt;!DOCTYPE html&gt;",
                valid: "false"
            },
            {
                name: '&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML5.0 Strict//EN"&gt;',
                valid: "false"
            }
        ]
    },

    {
        question: "Quelle est la syntaxe pour déclarer l'encodage des caractères du document en UTF-8 ?",
        responses: [
            {
                name: '&lt;meta encoding="text/html; charset=utf-8"&gt;',
                valid: "false"
            },
            {
                name: '&lt;meta charset="text/html; UTF-8"&gt;',
                valid: "false"
            },
            {
                name: '&lt;meta charset="utf-8"&gt;',
                valid: "true"
            }
        ]
    },
    {
        question: "Quelle nouvelle balise de section permet de regrouper un contenu tangentiel au contenu principal du document ?",
        responses: [
            {
                name: '&lt;section id="sidebar"&gt;',
                valid: "false"
            },
            {
                name: '&lt;sidebar&gt;',
                valid: "false"
            },
            {
                name: '&lt;aside&gt;',
                valid: "true"
            },
            {
                name: '&lt;details&gt;',
                valid: "false"
            }
        ]
    }
]
const abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const responsesWrapper = document.getElementById("game")
let indexDisplayedQuestions = []
const maxQuestionNumber = 3;
let numberOfDisplayedQuestion = 1
let score = 0
const displayQuestion = (questions) => {
    if(maxQuestionNumber >= numberOfDisplayedQuestion){
        console.log("diplayed")
        const questionIndex = Math.floor(Math.random() * questions.length)
        indexDisplayedQuestions.push(questionIndex)
        const questionToDisplay = questions[questionIndex]
        let questionHTMLElement = document.createElement("h2")
        questionHTMLElement.id = "question"
        questionHTMLElement.innerHTML = questionToDisplay.question
        responsesWrapper.appendChild(questionHTMLElement)
        createResponsesElements(questionToDisplay.responses)
        const choices = document.querySelectorAll(".choice-container")
        handleResponseChoices(choices)
    }
    
    
}
const createResponsesElements = (responses) =>{
    responses.forEach((response, index) => {
        // On créé la div qui contient les choix de reponse et leur ordre 
        let responseContainer = document.createElement("div")
        responseContainer.classList.add("choice-container")
        responseContainer.setAttribute("is-correct", response.valid)
        // On cree la le paragraphe qui contient le préfix de la reponse
        let responsePrefix = document.createElement("p")
        responsePrefix.classList.add("choice-prefix")
        responsePrefix.innerHTML = abc[index]
        // on cree le paragraphe qui contient le texte de la réponse
        let responseText = document.createElement("p")
        responseText.classList.add("choice-text")
        responseText.innerHTML = response.name
        // On les ajoute au DOM
        responseContainer.appendChild(responsePrefix)
        responseContainer.appendChild(responseText)
        responsesWrapper.appendChild(responseContainer)
    });
    
}


const handleResponseChoices = (choices) => {
    choices.forEach(choice =>{
        choice.addEventListener("click", function(){
            if(numberOfDisplayedQuestion == maxQuestionNumber){
                location.href ="./end.html"
            }
            let hud = document.getElementById("hud").cloneNode(true);
            numberOfDisplayedQuestion = numberOfDisplayedQuestion + 1
           if(this.getAttribute("is-correct") === "true"){
               this.classList.add("correct")
               score += 5
               localStorage.setItem("score", score)
               setTimeout(() => {
                responsesWrapper.innerHTML = "" 
                responsesWrapper.appendChild(hud)
                displayQuestion(questions)  
                // On met a jour le score et le nbre de question affiché depuis le début du jeu
                let progressTextHTMLElement = document.getElementById("progressText")
                progressTextHTMLElement.innerHTML = `Question ${numberOfDisplayedQuestion}/${maxQuestionNumber}`
                let progressBarFullHTMLElement = document.getElementById("progressBarFull")
                let pourcentage = (numberOfDisplayedQuestion / maxQuestionNumber) * 100
                progressBarFullHTMLElement.value = `${pourcentage}`
                let scoreHTMLElement = document.getElementById("score")
                scoreHTMLElement.innerHTML = score
               }, 1000)
           }else{
               this.classList.add("incorrect")
               localStorage.setItem("score", score)
               setTimeout(() => {
                this.classList.remove("incorrect")
                responsesWrapper.innerHTML = "" 
                responsesWrapper.appendChild(hud)
                displayQuestion(questions) 
                // On met a jour le score et le nbre de question affiché depuis le début du jeu
                let progressTextHTMLElement = document.getElementById("progressText")
                progressTextHTMLElement.innerHTML = `Question ${numberOfDisplayedQuestion}/${maxQuestionNumber}`
                let progressBarFullHTMLElement = document.getElementById("progressBarFull")
                let pourcentage = (numberOfDisplayedQuestion / maxQuestionNumber) * 100
                progressBarFullHTMLElement.value = `${pourcentage}`
                let scoreHTMLElement = document.getElementById("score")
                scoreHTMLElement.innerHTML = score
               }, 1000)
           }
           
            
        })
    })
}
// const updateHeadGame = () => function(numberOfDisplayedQuestion, score){
//     let questionCounterHTMLElement = document.getElementById("questionCounter")
//     debugger
//     questionCounterHTMLElement.innerHTML = `${numberOfDisplayedQuestion}/${maxQuestionNumber}`
//     let scoreHTMLElement = document.getElementById("score")
//     console.log("hi updategame")
//     scoreHTMLElement.innerHTML = score
// }
displayQuestion(questions)
