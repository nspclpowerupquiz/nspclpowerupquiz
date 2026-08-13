// ==========================================
// NSPCL POWER-UP QUIZ
// CERTIFICATE.JS
// ==========================================


// ==========================================
// QUIZ SETTINGS
// ==========================================

const TOTAL_QUIZ_QUESTIONS = 30;


// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";


// ==========================================
// GET EMPLOYEE INFORMATION
// ==========================================

const employeeId =
localStorage.getItem("employeeId");

const employeeName =
localStorage.getItem("employeeName");


// ==========================================
// LOG
// ==========================================

console.log("Certificate JS Loaded");

console.log("Employee ID:", employeeId);

console.log("Employee Name:", employeeName);


// ==========================================
// LOGIN CHECK
// ==========================================

if (!employeeId) {

    alert("Please login first");

    window.location.href = "login.html";

}


// ==========================================
// PAGE LOAD
// ==========================================

window.onload = function () {

    loadCertificate();

};


// ==========================================
// LOAD CERTIFICATE DATA
// ==========================================

async function loadCertificate() {

    try {

        const response = await fetch(

            SCRIPT_URL +
            "?action=certificate&id=" +
            encodeURIComponent(employeeId) +
            "&t=" +
            Date.now()

        );


        if (!response.ok) {

            throw new Error(
                "Unable to connect to certificate server"
            );

        }


        const data =
            await response.json();


        console.log(
            "Certificate Data:",
            data
        );


        // ==========================================
        // CHECK STATUS
        // ==========================================

        if (data.status !== "success") {

            alert(
                "Certificate data not found"
            );

            return;

        }


        // ==========================================
        // NAME
        // ==========================================

        const nameElement =
            document.getElementById("name");


        if (nameElement) {

            nameElement.innerHTML =
                escapeHTML(data.employeeName);

        }


        // ==========================================
        // EMPLOYEE ID
        // ==========================================

        const empIdElement =
            document.getElementById("empid");


        if (empIdElement) {

            empIdElement.innerHTML =
                escapeHTML(data.employeeId);

        }


        // ==========================================
        // SCORE
        // ==========================================

        const score =
            Number(data.score) || 0;


        /*
         * NEW QUIZ FORMAT
         *
         * Every quiz contains exactly
         * 30 questions.
         */

        const totalQuestions =
            TOTAL_QUIZ_QUESTIONS;


        const scoreElement =
            document.getElementById("score");


        if (scoreElement) {

            scoreElement.innerHTML =

                score +
                " / " +
                totalQuestions;

        }


        // ==========================================
        // PERCENTAGE
        // ==========================================

        let percentage =
            Number(data.percentage);


        /*
         * If percentage is missing or invalid,
         * calculate it from the 30-question score.
         */

        if (
            isNaN(percentage)
        ) {

            percentage =
                Math.round(
                    (score /
                        totalQuestions) *
                    100
                );

        }


        const percentageElement =
            document.getElementById(
                "percentage"
            );


        if (percentageElement) {

            percentageElement.innerHTML =
                percentage + "%";

        }


        // ==========================================
        // GRADE
        // ==========================================

        let grade =
            data.grade || "";


        const gradeElement =
            document.getElementById(
                "grade"
            );


        if (gradeElement) {

            gradeElement.innerHTML =
                escapeHTML(grade);

        }


        // ==========================================
        // CERTIFICATE NUMBER
        // ==========================================

        const certElement =
            document.getElementById(
                "certno"
            );


        if (certElement) {

            certElement.innerHTML =
                escapeHTML(
                    data.certificateNo || ""
                );

        }


        // ==========================================
        // DATE
        // ==========================================

        const dateElement =
            document.getElementById(
                "date"
            );


        if (
            dateElement &&
            data.dateTime
        ) {

            const certificateDate =
                new Date(
                    data.dateTime
                );


            if (
                !isNaN(
                    certificateDate.getTime()
                )
            ) {

                dateElement.innerHTML =

                    certificateDate.toLocaleDateString(

                        "en-IN",

                        {

                            day: "numeric",

                            month: "long",

                            year: "numeric"

                        }

                    );

            }

        }


        // ==========================================
        // BADGE
        // ==========================================

        const badge =
            document.getElementById(
                "badge"
            );


        if (badge) {

            badge.innerHTML =
                escapeHTML(
                    String(grade)
                        .toUpperCase()
                );

        }


        // ==========================================
        // CONFETTI
        // ==========================================

        if (
            typeof confetti ===
            "function"
        ) {

            setTimeout(

                function () {

                    confetti({

                        particleCount: 150,

                        spread: 120

                    });

                },

                500

            );

        }


    }

    catch (error) {

        console.error(
            "Certificate Error:",
            error
        );


        alert(
            "Unable to load certificate"
        );

    }

}


// ==========================================
// REMOVE ANIMATION BEFORE PDF / PRINT
// ==========================================

function prepareCertificate() {

    const certificate =
        document.getElementById(
            "certificate"
        );


    if (!certificate) {

        return;

    }


    certificate.classList.add(
        "pdf-capture"
    );


    const elements =
        certificate.querySelectorAll(
            "*"
        );


    elements.forEach(
        function (el) {

            el.style.animation =
                "none";

            el.style.transition =
                "none";

            el.style.opacity =
                "1";

            el.style.transform =
                "none";

        }
    );

}


// ==========================================
// DOWNLOAD PDF
// ==========================================

async function downloadPDF() {

    console.log(
        "PDF Download Started"
    );


    prepareCertificate();


    const certificate =
        document.getElementById(
            "certificate"
        );


    if (!certificate) {

        alert(
            "Certificate element not found"
        );

        return;

    }


    await new Promise(
        function (resolve) {

            setTimeout(
                resolve,
                500
            );

        }
    );


    try {


        const canvas =
            await html2canvas(

                certificate,

                {

                    scale: 3,

                    useCORS: true,

                    backgroundColor:
                        "#ffffff",

                    logging: false

                }

            );


        const imgData =
            canvas.toDataURL(
                "image/png"
            );


        const {
            jsPDF
        } = window.jspdf;


        const pdf =
            new jsPDF(

                "landscape",

                "mm",

                "a4"

            );


        pdf.addImage(

            imgData,

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

    catch (error) {

        console.error(
            "PDF Generation Error:",
            error
        );


        alert(
            "Unable to generate PDF certificate"
        );

    }

}


// ==========================================
// PRINT CERTIFICATE
// ==========================================

function printCertificate() {

    prepareCertificate();

    window.print();

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
