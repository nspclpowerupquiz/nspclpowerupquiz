// =================================
// NSPCL ANALYTICS DASHBOARD
// =================================


// YOUR GOOGLE APPS SCRIPT URL
const SCRIPT_URL = "YOUR_SCRIPT_URL_HERE";



// LOAD ANALYTICS
window.onload = function(){

fetch(SCRIPT_URL + "?action=leaderboard")

.then(response => response.json())

.then(data => {


console.log(data);


// TOTAL USERS

let totalUsers = 
[...new Set(
data.map(x=>x.employeeId)
)].length;



// TOTAL ATTEMPTS

let totalAttempts = data.length;



// AVERAGE SCORE

let average = 0;

let highest = 0;



if(data.length > 0){


average = Math.round(

data.reduce(

(sum,x)=>sum + Number(x.percentage),

0

) / data.length

);



highest = Math.max(

...data.map(x=>Number(x.percentage))

);



}




// DISPLAY VALUES

document.getElementById(
"totalUsers"
).innerHTML = totalUsers;



document.getElementById(
"totalAttempts"
).innerHTML = totalAttempts;



document.getElementById(
"averageScore"
).innerHTML = average + "%";



document.getElementById(
"highestScore"
).innerHTML = highest + "%";





// CATEGORY ANALYSIS

loadCategory();



})

.catch(error=>{

console.log(
"Analytics Error:",
error
);

});


};





// CATEGORY ANALYSIS

function loadCategory(){


if(typeof questions === "undefined"){

document.getElementById(
"categoryStats"
).innerHTML =
"No question data found";

return;

}



let category={};



questions.forEach(q=>{


if(!category[q.category]){

category[q.category]=0;

}


category[q.category]++;


});



let output="";



for(let c in category){


output += `

<p>

<strong>${c}</strong>

: ${category[c]} Questions

</p>

`;

}



document.getElementById(
"categoryStats"
).innerHTML=output;


}
