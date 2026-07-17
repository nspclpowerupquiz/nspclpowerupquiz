// =====================================
// NSPCL POWER-UP QUIZ
// LEADERBOARD SYSTEM
// =====================================


// Google Apps Script URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";


// Load leaderboard when page opens
window.onload = function(){

    loadLeaderboard();

};



// =====================================
// FETCH LEADERBOARD DATA
// =====================================

function loadLeaderboard(){


    const table = document.getElementById("leaderboardTable");


    if(!table){

        console.log("Leaderboard table not found");
        return;

    }



    fetch(SCRIPT_URL + "?action=leaderboard")


    .then(response => response.json())


    .then(data => {

    // Top 3 Winners

if(data.length >= 1){

document.getElementById("winner1").innerHTML =
data[0].employeeName + "<br>Score: " + data[0].score;

}


if(data.length >= 2){

document.getElementById("winner2").innerHTML =
data[1].employeeName + "<br>Score: " + data[1].score;

}


if(data.length >= 3){

document.getElementById("winner3").innerHTML =
data[2].employeeName + "<br>Score: " + data[2].score;

}


        console.log("Leaderboard Data:", data);



        if(data.length === 0){


            table.innerHTML = `

            <tr>

            <td colspan="7">

            No Quiz Attempts Found

            </td>

            </tr>

            `;


            return;

        }



        table.innerHTML = "";



        data.forEach((player,index)=>{


            let percentage = 
            Math.round(player.percentage * 100);



            let quizDate = new Date(player.dateTime)
            .toLocaleDateString();



            let row = `


            <tr>


            <td>
            🏆 ${index + 1}
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
            ${percentage}%
            </td>


            <td>
            ${quizDate}
            </td>


            </tr>


            `;



            table.innerHTML += row;



        });



    })


    .catch(error=>{


        console.error(
            "Leaderboard Error:",
            error
        );



        table.innerHTML = `


        <tr>

        <td colspan="7">

        ❌ Unable to load leaderboard

        </td>

        </tr>


        `;


    });



}
