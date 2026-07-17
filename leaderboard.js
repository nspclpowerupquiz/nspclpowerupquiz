// =====================================
// NSPCL POWER-UP QUIZ
// GOOGLE SHEET LEADERBOARD SYSTEM
// =====================================


// Google Apps Script URL

const leaderboardURL =
"https://script.google.com/macros/s/AKfycbxaFLlnAhREGmXNi7YJtpSojqZKujF-MPr_7jvToyEohlKckrdm_f5-jhDA5JBwfTFqXg/exec?action=leaderboard";



const leaderboardTable =
document.getElementById("leaderboardTable");



const topThree =
document.getElementById("topThree");





function loadLeaderboard(){



fetch(leaderboardURL)


.then(response => response.json())


.then(data => {



    // Clear loading text

    topThree.innerHTML="";



    // Clear old rows except header

    leaderboardTable.innerHTML = `

    <tr>

    <th>Rank</th>

    <th>Employee Name</th>

    <th>Score</th>

    <th>Total Questions</th>

    <th>Percentage</th>

    <th>Date</th>

    </tr>

    `;





    data.forEach(function(player,index){



        // Top 3 cards

        if(index < 3){


            let medal = ["🥇","🥈","🥉"][index];


            topThree.innerHTML += `


            <div class="winner">

            <h1>${medal}</h1>

            <h2>${player.employeeName}</h2>

            <h3>${player.percentage}</h3>

            </div>


            `;


        }






        // Table rows

        let row = document.createElement("tr");



        row.innerHTML = `


        <td>${player.rank}</td>


        <td>${player.employeeName}</td>


        <td>${player.score}</td>


        <td>${player.totalQuestions}</td>


        <td>${player.percentage}</td>


        <td>${player.dateTime}</td>



        `;



        leaderboardTable.appendChild(row);



    });



})


.catch(error=>{


console.log("Leaderboard Error:",error);


});



}





loadLeaderboard();
