// =========================================
// NSPCL POWER-UP QUIZ
// LEADERBOARD
// =========================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxaFLlnAhREGmXNi7YJtpSojqZKujF-MPr_7jvToyEohlKckrdm_f5-jhDA5JBwfTFqXg/exec";

// Load leaderboard
window.onload = loadLeaderboard;

function loadLeaderboard() {

    console.log("Loading Leaderboard...");

    const table = document.getElementById("leaderboardTable");

    if (!table) {
        console.error("leaderboardTable not found!");
        return;
    }

    fetch(SCRIPT_URL + "?action=leaderboard")

        .then(response => {

            console.log("HTTP Status :", response.status);

            if (!response.ok) {
                throw new Error("Unable to fetch leaderboard");
            }

            return response.json();

        })

        .then(data => {

            console.log("Leaderboard Data :", data);

            // Clear loading row
            table.innerHTML = "";

            // No data
            if (data.length === 0) {

                table.innerHTML = `
                <tr>
                    <td colspan="7">
                        No Quiz Attempts Found
                    </td>
                </tr>
                `;

                return;
            }

            // ==========================
            // TOP 3 WINNERS
            // ==========================

            const w1 = document.getElementById("winner1");
            const w2 = document.getElementById("winner2");
            const w3 = document.getElementById("winner3");

            if (w1 && data.length > 0) {
                w1.innerHTML =
                    `<strong>${data[0].employeeName}</strong><br>
                     Score : ${data[0].score}/${data[0].totalQuestions}`;
            }

            if (w2 && data.length > 1) {
                w2.innerHTML =
                    `<strong>${data[1].employeeName}</strong><br>
                     Score : ${data[1].score}/${data[1].totalQuestions}`;
            }

            if (w3 && data.length > 2) {
                w3.innerHTML =
                    `<strong>${data[2].employeeName}</strong><br>
                     Score : ${data[2].score}/${data[2].totalQuestions}`;
            }

            // ==========================
            // LEADERBOARD TABLE
            // ==========================

            data.forEach((player, index) => {

                const row = table.insertRow();

                row.insertCell(0).textContent = index + 1;
                row.insertCell(1).textContent = player.employeeId;
                row.insertCell(2).textContent = player.employeeName;
                row.insertCell(3).textContent = player.score;
                row.insertCell(4).textContent = player.totalQuestions;
                row.insertCell(5).textContent =
                    Math.round(player.percentage * 100) + "%";

                row.insertCell(6).textContent =
                    new Date(player.dateTime).toLocaleString();

            });

            console.log("Rows Added :", table.rows.length);

        })

        .catch(error => {

            console.error("Leaderboard Error :", error);

            table.innerHTML = `
            <tr>
                <td colspan="7">
                    ❌ Unable to load leaderboard
                </td>
            </tr>
            `;

        });

}
