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
            /* Quand il s'agit de notre sidebar, on veut le placer à la valeur de son attribut data-offset par rapport
            au haut de l'écran */
            let offset = parseInt(elementCollant.getAttribute("data-offset") || 0, 10) // Permet dans le cas ou cest le menu de 
                                                                        // mettre le offset a 0 car on le décale pas par rapport au de la fenetre
            
            // Calcul de la contrainte pour l'element sidebar
            let constraint = null;
            if(elementCollant.getAttribute("data-constraint")){
                constraint = document.querySelector(elementCollant.getAttribute("data-constraint"))
            }else{
                constraint = document.body
            }

            let constraintRect = constraint.getBoundingClientRect()
            let constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height

            // Fonctions
            let onScroll = function(){
                let hasScrollClass = elementCollant.classList.contains("fixed")
                if(scrollY() > constraintBottom && elementCollant.style.position != "absolute"){
                    // elementCollant.classList.remove("fixed")
                    elementCollant.style.position = "absolute"
                    elementCollant.style.bottom = "0"
                    elementCollant.style.top ="auto"
                }else if(scrollY() > constraintBottom){

                }else if(scrollY() > top - offset && elementCollant.style.position != "fixed"){
                    elementCollant.classList.add("fixed")
                    elementCollant.style.position = "fixed"
                    elementCollant.style.bottom = "auto"
                    // En mettant elementCollant à fixed il perd sa largeur initiale, donc on réaffecte cette largeur initiale
                    elementCollant.style.width = rect.width + "px";
                    // On decale de offset px par rapport au haut de la fenetre
                    elementCollant.style.top = offset +"px"
                    elementCollant.parentNode.insertBefore(fake, elementCollant)
                    
                }else if(scrollY() <  top - offset && elementCollant.style.position != "static"){
                    elementCollant.classList.remove("fixed")
                    elementCollant.style.position = "static"
                    if(elementCollant.parentNode.contains(fake)){
                        elementCollant.parentNode.removeChild(fake)
                    }
                }
            }
            // Quand on redimension l'écran, notre menu qui est position fixed perd aussi sa longeur, donc il faut corriger
            // cela 
            let onResize = function(){
                elementCollant.style.width = "auto"
                elementCollant.classList.remove("fixed")
                elementCollant.style.position = "static"
                fake.style.display = "none"
                rect = elementCollant.getBoundingClientRect();
                top = rect.top + scrollY()
                constraintRect = constraint.getBoundingClientRect()
                constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height
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
        
       
         


