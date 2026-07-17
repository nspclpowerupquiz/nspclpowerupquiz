const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxaFLlnAhREGmXNi7YJtpSojqZKujF-MPr_7jvToyEohlKckrdm_f5-jhDA5JBwfTFqXg/exec";

window.onload = loadLeaderboard;

function loadLeaderboard() {

    const table = document.getElementById("leaderboardTable");

    fetch(SCRIPT_URL + "?action=leaderboard")
    .then(response => response.json())
    .then(data => {

        console.log(data);

        table.innerHTML = "";

        // Winner cards
        if (document.getElementById("winner1") && data.length > 0) {
            document.getElementById("winner1").innerHTML =
                `${data[0].employeeName}<br>Score: ${data[0].score}`;
        }

        if (document.getElementById("winner2") && data.length > 1) {
            document.getElementById("winner2").innerHTML =
                `${data[1].employeeName}<br>Score: ${data[1].score}`;
        }

        if (document.getElementById("winner3") && data.length > 2) {
            document.getElementById("winner3").innerHTML =
                `${data[2].employeeName}<br>Score: ${data[2].score}`;
        }

        data.forEach((player, index) => {

            table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${player.employeeId}</td>
                <td>${player.employeeName}</td>
                <td>${player.score}</td>
                <td>${player.totalQuestions}</td>
                <td>${Math.round(player.percentage * 100)}%</td>
                <td>${new Date(player.dateTime).toLocaleString()}</td>
            </tr>`;
        });

    })
    .catch(error => {
        console.error("Leaderboard Error:", error);
    });

}
