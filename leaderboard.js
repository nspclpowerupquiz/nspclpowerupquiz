// =====================================
// NSPCL POWER-UP QUIZ
// Dynamic Leaderboard
// =====================================


const leaderboardURL =
"https://script.google.com/macros/s/AKfycbxaFLlnAhREGmXNi7YJtpSojqZKujF-MPr_7jvToyEohlKckrdm_f5-jhDA5JBwfTFqXg/exec?action=leaderboard";



const leaderboardTable =
document.getElementById("leaderboardTable");


const topThree =
document.getElementById("topThree");





fetch(leaderboardURL)


.then(response => response.json())


.then(data => {



    topThree.innerHTML = "";



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



        let percentage = Math.round(player.percentage * 100);



        // Top 3 cards

        if(index < 3){


            let medal = ["🥇","🥈","🥉"][index];


            topThree.innerHTML += `

            <div class="winner">

            <h1>${medal}</h1>

            <h2>${player.employeeName}</h2>

            <h3>${percentage}%</h3>

            </div>

            `;


        }





        // Table rows

        let row = leaderboardTable.insertRow();



        row.innerHTML = `

        <td>${player.rank}</td>

        <td>${player.employeeName}</td>

        <td>${player.score}</td>

        <td>${player.totalQuestions}</td>

        <td>${percentage}%</td>

        <td>${new Date(player.dateTime).toLocaleDateString()}</td>

        `;



    });



})


.catch(error=>{

console.log("Leaderboard Error:",error);

});
