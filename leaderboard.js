// =====================================
// NSPCL POWER-UP QUIZ
// LEADERBOARD JAVASCRIPT
// =====================================


// Your Google Apps Script Web App URL
const SCRIPT_URL = "YOUR_SCRIPT_URL";


// Load leaderboard when page opens
window.onload = function(){

    loadLeaderboard();

};



// =====================================
// LOAD LEADERBOARD DATA
// =====================================

function loadLeaderboard(){

    const tableBody = document.getElementById("leaderboardBody");


    if(!tableBody){

        console.log("Leaderboard table body not found");
        return;

    }


    tableBody.innerHTML = `
        <tr>
            <td colspan="7">
                Loading leaderboard...
            </td>
        </tr>
    `;



    fetch(SCRIPT_URL + "?action=leaderboard")

    .then(response => response.json())

    .then(data => {


        console.log("Leaderboard Data:", data);



        if(data.length === 0){

            tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No records found
                </td>
            </tr>
            `;

            return;

        }



        tableBody.innerHTML = "";



        data.forEach((player,index)=>{


            let percentage = 
            Math.round(player.percentage * 100);



            let date = new Date(player.dateTime)
            .toLocaleString();



            let row = `

            <tr>

                <td>
                    ${index + 1}
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
                    ${date}
                </td>


            </tr>


            `;



            tableBody.innerHTML += row;



        });



    })



    .catch(error=>{


        console.error(
            "Leaderboard Error:",
            error
        );


        tableBody.innerHTML = `

        <tr>

        <td colspan="7">

        Unable to load leaderboard

        </td>

        </tr>

        `;


    });


}
