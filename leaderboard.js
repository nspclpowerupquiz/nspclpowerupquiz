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

    const row = table.insertRow();

    row.insertCell(0).textContent = index + 1;
    row.insertCell(1).textContent = player.employeeId;
    row.insertCell(2).textContent = player.employeeName;
    row.insertCell(3).textContent = player.score;
    row.insertCell(4).textContent = player.totalQuestions;
    row.insertCell(5).textContent = Math.round(player.percentage * 100) + "%";
    row.insertCell(6).textContent = new Date(player.dateTime).toLocaleString();

});        
