const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";


async function loadLeaderboard(){


try{


let response = await fetch(
SCRIPT_URL + "?action=leaderboard"
);


let data = await response.json();


console.log(data);



let table = document.getElementById(
"leaderboardTable"
);


table.innerHTML = "";



data.forEach((player)=>{


table.innerHTML += `

<tr>

<td>${player.rank}</td>

<td>${player.employeeId}</td>

<td>${player.employeeName}</td>

<td>${player.score}</td>

<td>${player.totalQuestions}</td>

<td>${Math.round(player.percentage*100)}%</td>

<td>${new Date(player.dateTime).toLocaleDateString()}</td>

</tr>

`;

});


}

catch(error){


console.log(error);


document.getElementById(
"leaderboardTable"
).innerHTML =

`
<tr>
<td colspan="7">
Error loading leaderboard
</td>
</tr>
`;

}


}



loadLeaderboard();
