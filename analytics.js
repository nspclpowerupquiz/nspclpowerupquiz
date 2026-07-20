// =====================================
// NSPCL POWER-UP QUIZ
// ANALYTICS.JS
// =====================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";



window.onload=function(){

loadAnalytics();

};




async function loadAnalytics(){


try{


const response = await fetch(

SCRIPT_URL+"?action=analytics"

);



const data = await response.json();



console.log(
"Analytics Data:",
data
);




// UPDATE CARDS


document.getElementById(
"totalParticipants"
).innerHTML =
data.totalParticipants;



document.getElementById(
"totalAttempts"
).innerHTML =
data.totalAttempts;



document.getElementById(
"averageScore"
).innerHTML =
data.averageScore;



document.getElementById(
"highestScore"
).innerHTML =
data.highestScore;



document.getElementById(
"passPercentage"
).innerHTML =
data.passPercentage+"%";





document.getElementById(
"lastUpdated"
).innerHTML =

"Last Updated: " +

new Date(
data.lastUpdated
).toLocaleString();



}


catch(error){


console.error(
"Analytics Error:",
error
);


}

}
