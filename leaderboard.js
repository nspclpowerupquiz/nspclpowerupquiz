const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxaFLlnAhREGmXNi7YJtpSojqZKujF-MPr_7jvToyEohlKckrdm_f5-jhDA5JBwfTFqXg/exec";

window.onload = loadLeaderboard;

function loadLeaderboard() {

    console.log("Leaderboard loading...");

    fetch(SCRIPT_URL + "?action=leaderboard")

    .then(response => {
        console.log("HTTP Status:", response.status);
        return response.json();
    })

   .then(data => {

    console.log(data);

    const table = document.getElementById("leaderboardTable");

    console.log(table);

    table.innerHTML = "";

    data.forEach((player, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.employeeId}</td>
            <td>${player.employeeName}</td>
            <td>${player.score}</td>
            <td>${player.totalQuestions}</td>
            <td>${Math.round(player.percentage * 100)}%</td>
            <td>${new Date(player.dateTime).toLocaleDateString()}</td>
        `;

        table.appendChild(row);

    });

});
}
