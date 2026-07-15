// =====================================
// NSPCL POWER-UP QUIZ
// Leaderboard System
// =====================================


const leaderboardTable = document.getElementById("leaderboardTable");


function loadLeaderboard(){


    let data = JSON.parse(

        localStorage.getItem("leaderboard")

    ) || [];



    // Sort highest percentage first

    data.sort((a,b)=>{

        return b.percentage - a.percentage;

    });



    leaderboardTable.innerHTML="";



    data.forEach((player,index)=>{


        let row=document.createElement("tr");



        row.innerHTML=`

        <td>${index+1}</td>

        <td>${player.name}</td>

        <td>${player.id}</td>

        <td>${player.score}</td>

        <td>${player.percentage}%</td>

        <td>${player.date}</td>

        `;



        leaderboardTable.appendChild(row);



    });



}



loadLeaderboard();
