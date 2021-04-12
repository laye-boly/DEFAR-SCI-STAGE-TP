class PortofolioGrille{
    constructor(selector){
        const projects = document.querySelectorAll(`.${selector} .project`)
        const portofolio = document.querySelector(`.${selector}`)
        projects.forEach(project => {
            project.addEventListener("click", (e) => {
                e.preventDefault()
           
               // const portofolio = document.querySelector(`.${selector}`)
                // On regarde s'il y a deja un un project body qui est affiche
                const visibleProjectBody = document.querySelector(".clone-body")
                // S'il n y en a pas, on clone le project body du projet actuel, on l'ajoute au portofolio et on l'affiche
                if(visibleProjectBody == null){
                   
                    this.createProjectBody(project, portofolio)
                    console.log(1)
                }
                // S'il n y en a ,  et que le project body ne correspond au project body du project actuellement clique
                // on le supprime d'abord du portofoloi puis on clone le project body du projet actuel, on l'ajoute au portofolio et on l'affiche
                else if(visibleProjectBody !== null && (project.nextElementSibling == null || !project.nextElementSibling.classList.contains("project-body"))){
                    this.slideUp(visibleProjectBody)
                    this.createProjectBody(project, portofolio)
                    console.log(2)

                }
                // S'il n y en a ,  et que le project body correspond au project body du project actuellement on ne fait rien
                else if(visibleProjectBody !== null && project.nextElementSibling.classList.contains("project-body")){
                    this.slideUp(visibleProjectBody)
                    return
                }
                
            })
        })

        // On affiche le project-body si on detect un hash correspond a l'id  du projet
        const hash = window.location.href       
        if(hash){
            const projectFromHash = document.getElementById(hash.substring(hash.indexOf("#")+1))
            this.createProjectBody(projectFromHash, portofolio)
        }
       
    }
    // Clone le project body du project actuellment cliqué et l'insere dans le portofolio
    createProjectBody(project, portofolio){
        // Si on recupere le project avec le hash, on s'assure quil est un enfant du portofolio en grille avant de continuer
        if(!portofolio.contains(project)) return false
        const projectBody = project.querySelector(".project-body")
        const projectBodyClone = projectBody.cloneNode(true)
        projectBodyClone.classList.add("clone-body")
        projectBodyClone.style.display = "block"
        // Si on est sur le dernier projet de du portofolio
        if(project.nextElementSibling == null){
            portofolio.appendChild(projectBodyClone)
        }else{
            portofolio.insertBefore(projectBodyClone, project.nextElementSibling)
        }
        
        this.slideDown(projectBodyClone)
    }
    // Permet une transition sur la hauteur du projectBodyClone quand il est ajoute au DOM
    slideDown(projectBodyClone){
        const height = projectBodyClone.offsetHeight
        projectBodyClone.style.height = "0px"
        projectBodyClone.style.transition = "height 0.5s"
        projectBodyClone.offsetHeight // Force le recalcul
        projectBodyClone.style.height = `${height}px`
        window.setTimeout(function(){
            projectBodyClone.style.height = null
           
        }, 500)
    }

     // Permet une transition sur la hauteur du projectBodyClone quand il est retiré du DOM
     slideUp(projectBodyClone){
        const height = projectBodyClone.offsetHeight
        projectBodyClone.style.height = height + "px"
        projectBodyClone.offsetHeight // Force le repaint
        projectBodyClone.style.height = "0px"
        window.setTimeout(function(){
            projectBodyClone.parentNode.removeChild(projectBodyClone)
           
        }, 500)
    }
}

class PortofolioFlex extends PortofolioGrille{
    createProjectBody(project, portofolio){
        const projectBody = project.querySelector(".project-body")
        const projectBodyClone = projectBody.cloneNode(true)
        projectBodyClone.classList.add("clone-body")
        projectBodyClone.style.display = "block"
        // Si on est sur le dernier projet de du portofolio
        if(project.nextElementSibling == null){
            portofolio.appendChild(projectBodyClone)
        }else{
            const lastProjectSameLevel = this.getTheLastElementOnSameLevel(project)
            portofolio.insertBefore(projectBodyClone, lastProjectSameLevel.nextElementSibling)
        }
        
        this.slideDown(projectBodyClone)
    }
    getTheLastElementOnSameLevel(project){
        const projects = Array.prototype.slice.call(document.querySelectorAll(".portofolio-flex .project"))
        const projectIndex = projects.findIndex(p => p === project)
        //Si le project est recupéré à travers le hash, on s'assure que le project est dans le portofolio en flexbox
        if(projectIndex == -1 ) return false
      
        for (let index = projectIndex; index < projects.length; index++) {
            let testt=  projects[index]
            if(project.offsetTop != projects[index].offsetTop){
                console.log("getlast")
                return projects[index-1]
            }
            
        }
        
    }
    
}

new PortofolioGrille("portofolio-grille")

new PortofolioFlex("portofolio-flex")