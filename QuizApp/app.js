const abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const responsesWrapper = document.getElementById("game")
const loader = document.getElementById("loader")
let indexDisplayedQuestions = []
const maxQuestionNumber = 3;
let numberOfDisplayedQuestion = 1
let score = 0
const displayQuestion = (questions) => {
    
    if(maxQuestionNumber >= numberOfDisplayedQuestion){
        // console.log("diplayed")
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
                loader.style.display = "block"
                getAPIQuestion() 
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
                // On affiche le loader avant que les données ne soient pas disponible
                loader.style.display = "block"
                getAPIQuestion()
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
const getAPIQuestion = () => {
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").
    then(response => response.json()).
    then(APIResponse => {
        questions = questionsContructor(APIResponse.results)
        loader.style.display = "none"
        displayQuestion(questions)
    })
}
const questionsContructor = (datas) =>{
    let questions = []
    console.log(" constructor "+datas[0].category)
    datas.forEach(data => {
        let question = {
            question: data.question,
            responses: [
                {
                    name: data.correct_answer,
                    valid: "true"
                }
            ]
        }
        data.incorrect_answers.forEach(in_correct => {
            let incorrect_answer = {
                name: in_correct,
                valid: "false"
            }
            question.responses.push(incorrect_answer)
        })
        questions.push(question)
    })
    return questions
}
// const updateHeadGame = () => function(numberOfDisplayedQuestion, score){
//     let questionCounterHTMLElement = document.getElementById("questionCounter")
//     debugger
//     questionCounterHTMLElement.innerHTML = `${numberOfDisplayedQuestion}/${maxQuestionNumber}`
//     let scoreHTMLElement = document.getElementById("score")
//     console.log("hi updategame")
//     scoreHTMLElement.innerHTML = score
// }
getAPIQuestion()
