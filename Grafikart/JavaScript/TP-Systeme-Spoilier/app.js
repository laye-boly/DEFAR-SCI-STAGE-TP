let spoilers = document.querySelectorAll(".by-default")
for(let i = 0; i < spoilers.length; i++){
    let spoiler = spoilers[i]
    spoiler.classList.add("spoiler");
}

let btns = document.querySelectorAll(".afficher-spolier")
for(let i = 0; i < btns.length; i++){
    let btn = btns[i]
    btn.addEventListener("click", function(){
        var spoiler = btn.nextElementSibling;
        if(spoiler.classList.contains("spoiler")){
            spoiler.classList.remove("spoiler");
            btn.textContent = "cacher le spoiler"
        }else{
            spoiler.classList.add("spoiler")
            btn.textContent = "afficher le spoiler"
        }
    })
}