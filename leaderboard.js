// ==========================================
// NSPCL POWER-UP QUIZ
// LEADERBOARD
// ==========================================


// GOOGLE APPS SCRIPT URL

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";



let leaderboardData = [];



// ==========================================
// PAGE LOAD
// ==========================================

window.onload = function(){


    loadLeaderboard();


    // Auto refresh every 30 seconds

    setInterval(loadLeaderboard,30000);



    let search=document.getElementById("searchBox");


    if(search){

        search.addEventListener(
            "keyup",
            searchLeaderboard
        );

    }


};






// ==========================================
// LOAD LEADERBOARD
// ==========================================

function loadLeaderboard(){


const table=document.getElementById(
"leaderboardTable"
);



table.innerHTML=`

<tr>

<td colspan="7">

Loading Leaderboard...

</td>

</tr>

`;





fetch(
SCRIPT_URL+"?action=leaderboard"
)



.then(response=>{


if(!response.ok){

throw new Error(
"Unable to fetch leaderboard"
);

}


return response.json();


})



.then(data=>{


console.log(data);


// SORT BY SCORE DESCENDING

leaderboardData=data.sort(

(a,b)=>Number(b.score)-Number(a.score)

);



updateWinnerCards(
leaderboardData
);



updateStatistics(
leaderboardData
);



displayTable(
leaderboardData
);



})



.catch(error=>{


console.error(
error
);



table.innerHTML=`

<tr>

<td colspan="7">

❌ Unable to load leaderboard

</td>

</tr>

`;



});



}








// ==========================================
// WINNER PODIUM
// ==========================================

function updateWinnerCards(data){



if(data.length>0){


document.getElementById(
"winner1"
).innerHTML=


`

<strong>
${data[0].employeeName}
</strong>

<br>

${data[0].score}/${data[0].totalQuestions}

`;



}



if(data.length>1){


document.getElementById(
"winner2"
).innerHTML=


`

<strong>
${data[1].employeeName}
</strong>

<br>

${data[1].score}/${data[1].totalQuestions}

`;



}



if(data.length>2){


document.getElementById(
"winner3"
).innerHTML=


`

<strong>
${data[2].employeeName}
</strong>

<br>

${data[2].score}/${data[2].totalQuestions}

`;



}



}









// ==========================================
// STATISTICS
// ==========================================

function updateStatistics(data){



let players =
document.getElementById(
"totalPlayers"
);



let highest =
document.getElementById(
"highestScore"
);



let updated =
document.getElementById(
"lastUpdated"
);



if(players){

players.textContent=data.length;

}



if(highest && data.length>0){


highest.textContent =
data[0].score +
"/"+
data[0].totalQuestions;


}



if(updated){


updated.textContent =
new Date().toLocaleTimeString();


}



}









// ==========================================
// DISPLAY TABLE
// ==========================================

function displayTable(data){



const table=document.getElementById(
"leaderboardTable"
);



table.innerHTML="";





if(data.length===0){


table.innerHTML=`

<tr>

<td colspan="7">

No Quiz Attempts Found

</td>

</tr>

`;

return;


}







data.forEach(
(player,index)=>{


let row=document.createElement(
"tr"
);



row.innerHTML=`

<td>

${index+1}

</td>


<td>

${player.employeeId}

</td>


<td>

${player.employeeName}

</td>


<td>

${player.score}

</td>


<td>

${player.totalQuestions}

</td>


<td>

${Math.round(player.percentage)}%

</td>


<td>

${new Date(
player.dateTime
).toLocaleString()}

</td>


`;



table.appendChild(row);



}

);



}








// ==========================================
// SEARCH
// ==========================================

function searchLeaderboard(){



let value=document

.getElementById(
"searchBox"
)

.value

.toLowerCase();






let filtered =
leaderboardData.filter(player=>{


return(

String(player.employeeId)
.includes(value)


||


player.employeeName
.toLowerCase()
.includes(value)


);


});





displayTable(filtered);



}
