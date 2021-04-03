let httpRequest = new XMLHttpRequest()
httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState == 4){
        document.getElementById("result").innerHTML(httpRequest.responseText)
    }
}
httpRequest.open("GET", "localhost/Ajax/demo.php?city=montpellier", true)
httpRequest.send()