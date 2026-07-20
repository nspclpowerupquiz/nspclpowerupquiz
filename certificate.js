// ==========================================
// NSPCL POWER-UP QUIZ
// CERTIFICATE
// ==========================================

const SCRIPT_URL = "YOUR_SCRIPT_URL";

// Employee ID from Login
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";

// Check Login
if (!employeeId) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Load Certificate
window.onload = function () {

    loadCertificate();

};



// ==========================================
// LOAD CERTIFICATE
// ==========================================

function loadCertificate() {

    fetch(SCRIPT_URL + "?action=certificate&id=" + employeeId)

        .then(response => response.json())

        .then(data => {

            if (data.status != "success") {

                alert("Certificate not found.");

                return;

            }

            // Employee

            document.getElementById("name").innerHTML =
                data.employeeName;

            document.getElementById("empid").innerHTML =
                data.employeeId;

            // Score

            document.getElementById("score").innerHTML =
                data.score + " / " + data.totalQuestions;

            // Percentage

            document.getElementById("percentage").innerHTML =
                data.percentage + "%";

            // Grade

            document.getElementById("grade").innerHTML =
                data.grade;

            // Certificate Number

            document.getElementById("certno").innerHTML =
                data.certificateNo;

            // Date

            document.getElementById("date").innerHTML =
                new Date(data.dateTime).toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    });

            // Badge

            const badge =
                document.getElementById("badge");

            switch (data.grade) {

                case "Gold":

                    badge.innerHTML = "🥇 GOLD ACHIEVER";

                    badge.style.background =
                        "linear-gradient(90deg,#b8860b,#ffd700,#b8860b)";

                    break;

                case "Silver":

                    badge.innerHTML = "🥈 SILVER ACHIEVER";

                    badge.style.background =
                        "linear-gradient(90deg,#8c8c8c,#d9d9d9,#8c8c8c)";

                    break;

                case "Bronze":

                    badge.innerHTML = "🥉 BRONZE ACHIEVER";

                    badge.style.background =
                        "linear-gradient(90deg,#8b4513,#cd7f32,#8b4513)";

                    break;

                default:

                    badge.innerHTML =
                        "⭐ PARTICIPATION";

                    badge.style.background =
                        "#0B4FA2";

            }

            // Confetti

            confetti({

                particleCount:250,

                spread:180,

                origin:{y:.5}

            });

        })

        .catch(error => {

            console.log(error);

            alert("Unable to load certificate.");

        });

}



// ==========================================
// DOWNLOAD PDF
// ==========================================

async function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const certificate =
        document.getElementById("certificate");

    const canvas =
        await html2canvas(certificate, {

            scale:2,

            useCORS:true

        });

    const image =
        canvas.toDataURL("image/png");

    const pdf =
        new jsPDF("landscape", "mm", "a4");

    pdf.addImage(

        image,

        "PNG",

        5,

        5,

        287,

        200

    );

    pdf.save(

        "NSPCL_Certificate_" +

        employeeId +

        ".pdf"

    );

}
