(function(){
    function afficherContent(ongletAactive, animation){
    if(animation === undefined){
        animation = true
    }
    if(ongletAactive.classList.contains("active")){
        return;
    }

    /** On regarde les div qui sont actifs  et le lien activé */
    let contenuActif = document.querySelector("div.visible")
     // On selection l'attribut href du lien cliqué qui pointe vers l'id de la div a afficher
     let href = ongletAactive.getAttribute("href")
     // On selectionne la div a afficher
     let contenuAafficher = document.querySelector(href);
    
    console.log(contenuActif) 
     
    if(contenuActif !== null){
        if(animation){
            var transionend = function(){
                contenuActif.classList.remove("fade")
                contenuActif.classList.remove("visible")
                contenuAafficher.classList.add("visible")
                contenuAafficher.classList.add("fade")
                contenuAafficher.offsetWidth
                contenuAafficher.classList.add("in")
                ongletAactive.classList.add("active")
                contenuActif.removeEventListener("transitionend", transionend)
            }
            contenuActif.classList.add("fade")
            contenuActif.classList.remove("in") 
            let ongletActif = document.querySelector("a[href='#"+contenuActif.id+"']")
            ongletActif.classList.remove("active")
            contenuActif.addEventListener('transitionend', transionend)
        }else{
            let ongletActif = document.querySelector("a[href='#"+contenuActif.id+"']")
            ongletActif.classList.remove("active")
            contenuActif.classList.remove("visible")
            contenuAafficher.classList.add("visible")
            ongletAactive.classList.add("active")
        }
        
        
    }else{
        if(animation){
            contenuAafficher.classList.add("visible")
            contenuAafficher.classList.add("fade")
            contenuAafficher.offsetWidth
            contenuAafficher.classList.add("in")
            ongletAactive.classList.add("active")
        }else {
            contenuAafficher.classList.add("visible")
            ongletAactive.classList.add("active")
        }
        
    }
    
   
    }

    var links = document.querySelectorAll(".links")
    for(let i = 0; i < links.length; i++){
        link = links[i]
        link.addEventListener("click", function(e){
            afficherContent(this)
        })
        
    }
    //code exécuté quand actualise la page et que l'on est sur on onglet
    let href = window.location.hash;

    let a = document.querySelector("a[href='"+href+"']")

    if(a !== null && !a.classList.contains("active")){
        afficherContent(a, false)
    }

    /* cODE effectué quand le hash change en cliquant sur les fleche suivant et précédent du navigateur */
    window.addEventListener("hashchange", function(){
        let href = window.location.hash;

        let a = document.querySelector("a[href='"+href+"']")

        if(a !== null && !a.classList.contains("active")){
            afficherContent(a, false)
        }
    })

}());
 
