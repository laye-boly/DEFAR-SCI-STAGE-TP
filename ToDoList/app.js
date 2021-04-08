const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
let trashBtns = document.querySelectorAll(".trash-btn")
let completeBtns = document.querySelectorAll(".complete-btn")
const select = document.querySelector(".filter")

const submitForm = function(e){
    e.preventDefault()
    let todo = {
        name: todoInput.value
    }
    if(saveTodo(todo)){
        createToDoElement(todoInput.value)
    }
    todoInput.value = ""
    todoInput.focus()
    
}

const deleteTodoHTMLElement = function(){
    let todoElement = this.parentNode
    let todoList = todoElement.parentNode
    todoElement.classList.add("fall")
    let todoName = this.id
  
    todoElement.addEventListener("transitionend", function(){
        deleteTodo(todoName) // Suppression du Todo du localstorage
        todoList.removeChild(todoElement) // suppression du todo element du DOM
        
    })
    
}

const competeTodo = function(e){
    this.parentNode.classList.toggle("completed")
    filterTodo()
}
const createToDoElement = function(todoInputValue){
    let div = document.createElement("div")
    div.classList.add("todo")
    let li = document.createElement("li")
    li.innerHTML = todoInputValue
    li.classList.add("todo-item")
    div.appendChild(li)
    let completedButton = document.createElement("button")
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    div.appendChild(completedButton)
    let trashButton = document.createElement("button")
    trashButton.id = todoInputValue
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    div.appendChild(trashButton)

    todoList.appendChild(div)

    trashBtns = document.querySelectorAll(".trash-btn")
    trashBtns.forEach(trashBtn => {
        trashBtn.addEventListener("click", deleteTodoHTMLElement)
    })
    completeBtns = document.querySelectorAll(".complete-btn")
    completeBtns.forEach(completeBtn => {
        completeBtn.addEventListener("click", competeTodo)
    })
    
}
let arryHiddenCompleteTodo = []
let arryHiddenUncompleteTodo = []
const filterTodo = function(){
    const choice = document.querySelector(".filter").value
    console.log(choice)
    const todos = document.querySelectorAll(".todo")
    todos.forEach(todo => {
        
        if(!todo.classList.contains("completed") && choice === "completed"){
            todo.classList.add("hidden-todo")
            arryHiddenUncompleteTodo.push(todo)
            arryHiddenCompleteTodo.forEach(completeTodo => completeTodo.classList.remove("hidden-todo"))
            arryHiddenCompleteTodo = []
        }
        if(todo.classList.contains("completed") && choice === "uncompleted"){
            todo.classList.add("hidden-todo")
            arryHiddenCompleteTodo.push(todo)
            arryHiddenUncompleteTodo.forEach(completeTodo => completeTodo.classList.remove("hidden-todo"))
            arryHiddenUncompleteTodo = []
        }
        if(choice === "all"){
            todo.classList.remove("hidden-todo")
        }
    })
    
}

// beginning Saving todos in localstorage
function getTodos(){
    let todos = null
    if(localStorage.getItem("todos") !== null){
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}

function saveTodo(newTodo){
    if(!isTodoAvailable(newTodo)){
       
        let alertTodo = document.createElement("button")
        alertTodo.type ="button"
        alertTodo.id = "isbn-alert"
        alertTodo.classList = "btn btn-warning"
        alertTodo.style.display = "block"
        alertTodo.style.width = "100%"
        alertTodo.style.marginTop = "5px"
        alertTodo.innerHTML = `Le nom ${newTodo.name} est non disponible et est déja dans la base de données`
        document.querySelector("form").insertBefore(alertTodo, document.querySelector(".select"))
        return false
    }
    let todos = getTodos()
    if(todos !== null){
        todos.push(newTodo)
        todos = JSON.stringify(todos)
        localStorage.setItem("todos", todos)
    }else{
        let todos = []
        todos.push(newTodo)
        todos = JSON.stringify(todos)
        localStorage.setItem("todos", todos)
            
    }
    return true
}

function isTodoAvailable(newTodo){
    let todos = getTodos(), available = true
    if(todos == null){
        return available;
    }
    for (let i = 0; i < todos.length; i++) {
        if(todos[i].name == newTodo.name){
            available =  false
            break
        }      
    }
   
    return available
}

function deleteTodo(name){
    let todos = getTodos()
    let todosTosave = todos.filter(todo => {
        todo.name !== name   
    })

    todosTosave = JSON.stringify(todosTosave)
    localStorage.setItem("todos", todosTosave)
}
// end Saving todos in localstorage

// begin add todos to todo-list
function addTodosToList(todos) {
    if(todos != null){
        todos.forEach(todo => {
            createToDoElement(todo.name)
        })
    }  
    
}
// end add todos to todo- list


// Events
todoButton.addEventListener("click", submitForm)
trashBtns.forEach(trashBtn => {
    trashBtn.addEventListener("click", deleteTodoHTMLElement)
})

completeBtns.forEach(completeBtn => {
    completeBtn.addEventListener("click", competeTodo)
})

select.addEventListener("change", filterTodo)

addTodosToList(getTodos())// On ajoute au chargement de la page tous les todos qui sont déja stockés sur localStorage
