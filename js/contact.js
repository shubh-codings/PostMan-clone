// Togglemenu
let toggleMenu =document.getElementById('toggleMenu');
toggleMenu.addEventListener('click', ()=>{
    let navMenu = document.getElementById('navMenu');
    let navbar = document.getElementById('navbar');
    let sec = document.querySelector('section');
    if (navMenu.style.display =="none"){
        navMenu.style.display = "flex";
        navbar.style.height = "25vh";
        sec.style.marginTop = "25vh";
        
    }
    else{
        navMenu.style.display = "none";
        navbar.style.height = "40px";
        sec.style.marginTop = "";
    }
})  