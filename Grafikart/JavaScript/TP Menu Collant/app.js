(function(){
    // Cet fonction retourne le nombre de pixel scrollé verticalement sur la fenetre 
    let scrollY = function(){
        var supportPageOffset = window.pageXOffset !== undefined
        isCSS1Compat = ((document.compatMode || "") === "CSS1Compat")
        var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
        return y
    }
    var elementsCollants = document.querySelectorAll("*[data-fixed]");
    for (let i = 0; i < elementsCollants.length; i++) {
        (function(elementCollant){
            
            /*On va récupérer la position de notre elementCollant par rapport à la zone d'affichage  avec la 
            méthode Element.getBoundingClientRect()  qui retourne un objet DOMRect 
            fournissant des informations sur la taille d'un élément et 
            sa position relative par rapport à la zone d'affichage. */
            let rect =  elementCollant.getBoundingClientRect()
            let topZone = rect.top 
            let top = topZone + scrollY()
            /* Qauand on scrolle et que elementCollant passe en fixe tous les élements qui le suivait ne garde plus la meme distance 
            avant cela. Pour garder toujours la meme distance, on cree une fausse div qui la meme hauteur et largeur que 
            que elementCollant et que l'on supprimera des que elementCollant nest plus en fixed */
            let fake = document.createElement("div")
            fake.style.width = rect.width + "px"
            fake.style.height = rect.height + "px"

            // Fonctions
            let onScroll = function(){
                let hasScrollClass = elementCollant.classList.contains("fixed")
                if(scrollY() > top && !hasScrollClass){
                    elementCollant.classList.add("fixed")
                    // En mettant elementCollant à fixed il perd sa largeur initiale, donc on réaffecte cette largeur initiale
                    elementCollant.style.width = rect.width + "px";
                    elementCollant.parentNode.insertBefore(fake, elementCollant)
                    
                }else if(scrollY() <  top && hasScrollClass){
                    elementCollant.classList.remove("fixed")
                    elementCollant.parentNode.removeChild(fake)
                }elementCollant
            }
            // Quand on redimension l'écran, notre menu qui est position fixed perd aussi sa longeur, donc il faut corriger
            // cela 
            let onResize = function(){
                elementCollant.style.width = "auto"
                elementCollant.classList.remove("fixed")
                fake.style.display = "none"
                rect = elementCollant.getBoundingClientRect();
                top = rect.top + scrollY()
                fake.style.width = rect.width + "px"
                fake.style.height = rect.height + "px"
                fake.style.display = "block"
                onScroll()

            }
            window.addEventListener("scroll", onScroll)
            window.addEventListener("resize", onResize) 

        })(elementsCollants[i])
        
    }
})()       
        
       
         


