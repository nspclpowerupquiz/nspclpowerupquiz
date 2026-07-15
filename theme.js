// =====================================
// NSPCL POWER-UP QUIZ
// Dark / Light Theme Controller
// =====================================


const themeToggle = document.getElementById("themeToggle");


// Load saved theme

let savedTheme = localStorage.getItem("NSPCL_theme");


if(savedTheme === "dark"){

    document.body.classList.add("dark-mode");

    if(themeToggle){

        themeToggle.innerHTML="☀️";

    }

}




// Toggle Theme

if(themeToggle){


themeToggle.addEventListener("click",()=>{


document.body.classList.toggle("dark-mode");



let currentTheme =

document.body.classList.contains("dark-mode")

? "dark"

: "light";



localStorage.setItem(

"NSPCL_theme",

currentTheme

);



themeToggle.innerHTML =

currentTheme==="dark"

? "☀️"

: "🌙";



});


}
