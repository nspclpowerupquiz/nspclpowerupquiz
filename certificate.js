// ==========================================
// NSPCL POWER-UP QUIZ
// CERTIFICATE.JS
// ==========================================


// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";


// ==========================================
// EMPLOYEE
// ==========================================

const employeeId = localStorage.getItem("employeeId");

if (!employeeId) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ==========================================
// PAGE LOAD
// ==========================================

window.onload = function () {

    loadCertificate();

};


// ==========================================
// LOAD CERTIFICATE
// ==========================================

async function loadCertificate() {

    try {

        console.log("Employee ID :", employeeId);

        const response = await fetch(

            SCRIPT_URL +

            "?action=certificate&id=" +

            employeeId

        );

        const data = await response.json();

        console.log(data);

        if (data.status != "success") {

            alert("Certificate not found.");

            return;

        }

        // Employee Name
        document.getElementById("name").textContent =
        data.employeeName;

        // Employee ID
        document.getElementById("empid").textContent =
        data.employeeId;

        // Score
        document.getElementById("score").textContent =
        data.score + " / " + data.totalQuestions;

        // Percentage
        document.getElementById("percentage").textContent =
        data.percentage + "%";

        // Grade
        document.getElementById("grade").textContent =
        data.grade;

        // Certificate Number
        document.getElementById("certno").textContent =
        data.certificateNo;

        // Date
        document.getElementById("date").textContent =
        new Date(data.dateTime).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


        // =====================================
        // BADGE
        // =====================================

        const badge =
        document.getElementById("badge");

        switch (data.grade.toLowerCase()) {

            case "gold":

                badge.innerHTML =
                "🥇 GOLD ACHIEVER";

                badge.style.background =
                "linear-gradient(90deg,#B8860B,#FFD700,#B8860B)";

                break;

            case "silver":

                badge.innerHTML =
                "🥈 SILVER ACHIEVER";

                badge.style.background =
                "linear-gradient(90deg,#777,#DDD,#777)";

                break;

            case "bronze":

                badge.innerHTML =
                "🥉 BRONZE ACHIEVER";

                badge.style.background =
                "linear-gradient(90deg,#8B4513,#CD7F32,#8B4513)";

                break;

            default:

                badge.innerHTML =
                "⭐ PARTICIPATION";

                badge.style.background =
                "#0B4FA2";

        }


       // =====================================
// PREMIUM CONFETTI ANIMATION
// =====================================

confetti({
    particleCount: 180,
    spread: 160,
    origin: { x: 0, y: 0.6 }
});

confetti({
    particleCount: 180,
    spread: 160,
    origin: { x: 1, y: 0.6 }
});

setTimeout(function () {

    confetti({
        particleCount: 250,
        spread: 120,
        origin: { y: 0.5 }
    });

}, 700);

setTimeout(function () {

    confetti({
        particleCount: 150,
        angle: 60,
        spread: 70,
        origin: { x: 0 }
    });

    confetti({
        particleCount: 150,
        angle: 120,
        spread: 70,
        origin: { x: 1 }
    });

}, 1500);


// ==========================================
// DOWNLOAD PDF
// ==========================================

async function downloadPDF(){

    const certificate =
    document.getElementById("certificate");

    const canvas =
    await html2canvas(certificate,{

        scale:2,

        useCORS:true

    });

    const img =
    canvas.toDataURL("image/png");

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF(

        "landscape",

        "mm",

        "a4"

    );

    pdf.addImage(

        img,

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
