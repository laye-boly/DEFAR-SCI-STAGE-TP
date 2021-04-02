var p = document.querySelector("p");
p.addEventListener("click", function(e){
    console.log("tu as clique sur le paragraphe")
    console.log(this)
    console.log(`target = ${e.target}`)
    console.log(` curennt = ${e.currentTarget}`)
})




