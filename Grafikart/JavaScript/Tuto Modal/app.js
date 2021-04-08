let modal = null
const focusableSelector = "button, a, input, textarea"
let focusables = []
const openModal = async function(e){
    e.preventDefault()
    const target = e.target.getAttribute('href')
    if(target.startsWith("#")){
        modal = document.querySelector(target)
    }
    else{
        modal = await loadModal(target)
    }
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    
}

const closeModal = function(e){
    e.preventDefault()
    if(modal === null){
        return
    }
    window.setTimeout(function(){
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.removeAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
}

const focusInModal = function(e){
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if(e.shiftKey === true){
        index--
    }else{
        index++
    }
    if(index >= focusables.length){
        index = 0
    }

    if(index < 0){
        index = focusables.length - 1
    }
    focusables[index].focus()
}

const stopPropagation = function(e){
    e.stopPropagation()
}

const loadModal = async function(url){
    const target = "#" + url.split("#")[1]
    const existingModal = document.querySelector(target)
    if(existingModal !== null){
        return existingModal
    }
    const html = await fetch(url).then(response => response.text())
    const element = document.createRange().createContextualFragment(html).querySelector(target)
    if(element == null){
        throw(`L'élément ${target} n'a pas été trouvé dans la page ${url}`)
    }
    document.body.append(element)
    console.log(html)
    return element
    
}
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function(e){
    if(e.key === "Escape" || e.key === "Esc"){
        closeModal(e)
    }
    if(e.key === "Tab" && modal != null){
        focusInModal(e)
    }
})

