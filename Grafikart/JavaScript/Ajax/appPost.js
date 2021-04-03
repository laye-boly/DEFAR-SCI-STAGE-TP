let httpRequest = new XMLHttpRequest()
let as = document.querySelectorAll("li a")
for (let i = 0; i < as.length; i++) {
    as[i].addEventListener("click", function(e){
        e.preventDefault()
        httpRequest.onreadystatechange = function(){
            if(httpRequest.readyState == 4){
                // On regarde si le serveur a bien répondu
                if(httpRequest.status == 200){
                     document.getElementById("result").innerHTML = httpRequest.responseText
                }else{
                    alert("impossible de contacter le serveur")
                }
                
            }
        }
        httpRequest.open("POST", "demoPost.php", true)
        // Envoi des infos via post
        // httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        // httpRequest.send("city=montpellier&nom=henry")

        // Autre methode avec l'object formData
        let data = new FormData()
        data.append("city", "Montpellier")
        data.append("nom", "henry")
        httpRequest.send(data)
    })
    
    
}
