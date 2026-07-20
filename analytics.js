const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";



window.onload=function(){

loadAnalytics();

};



async function loadAnalytics(){


try{


const response =
await fetch(
SCRIPT_URL+"?action=analytics"
);



const data =
await response.json();



console.log(data);



document.getElementById(
"totalParticipants"
).innerHTML=data.totalParticipants;



document.getElementById(
"totalAttempts"
).innerHTML=data.totalAttempts;



document.getElementById(
"highestScore"
).innerHTML=data.highestScore;



document.getElementById(
"averageScore"
).innerHTML=data.averageScore;



document.getElementById(
"passPercentage"
).innerHTML=
data.passPercentage+"%";



// Progress bar

let bar =
document.getElementById("passBar");


bar.style.width=
data.passPercentage+"%";


bar.innerHTML=
data.passPercentage+"%";




document.getElementById(
"lastUpdated"
).innerHTML=

new Date(
data.lastUpdated
)
.toLocaleString();



}


catch(error){

console.error(
"Analytics Error",
error
);

}


}
