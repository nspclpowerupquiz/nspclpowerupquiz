// ==========================================================
// NSPCL POWER-UP SSC-C&M QUIZ
// CERTIFICATE.JS
// ==========================================================


// ==========================================================
// QUIZ SETTINGS
// ==========================================================

const DEFAULT_TOTAL_QUESTIONS = 50;


// ==========================================================
// GET DATA SAVED BY QUIZ.JS
// ==========================================================

const employeeId =
    localStorage.getItem("employeeId") || "";

const employeeName =
    localStorage.getItem("employeeName") || "Employee";


// IMPORTANT:
// quiz.js saves these values when the quiz finishes.

let score =
    Number(
        localStorage.getItem("score")
    );

let totalQuestions =
    Number(
        localStorage.getItem("totalQuestions")
    );

let percentage =
    Number(
        localStorage.getItem("percentage")
    );


// ==========================================================
// FALLBACKS
// ==========================================================

if (
    !Number.isFinite(totalQuestions) ||
    totalQuestions <= 0
) {

    totalQuestions =
        DEFAULT_TOTAL_QUESTIONS;

}


if (
    !Number.isFinite(score) ||
    score < 0
) {

    score = 0;

}


// ==========================================================
// SAFETY
// NEVER ALLOW SCORE > TOTAL
// ==========================================================

if (
    score > totalQuestions
) {

    console.warn(
        "Invalid score detected:",
        score,
        "/",
        totalQuestions
    );

    score =
        totalQuestions;

}


// ==========================================================
// CALCULATE PERCENTAGE
// ==========================================================

// Always calculate from actual score.
// This prevents an incorrect percentage
// from appearing on the certificate.

percentage =
    Math.round(
        (
            score /
            totalQuestions
        ) *
        100
    );


// ==========================================================
// LOGIN CHECK
// ==========================================================

if (!employeeId) {

    alert(
        "Employee information not found. Please login again."
    );

    window.location.href =
        "login.html";

}


// ==========================================================
// PAGE LOAD
// ==========================================================

window.addEventListener(
    "load",
    function () {

        loadCertificate();

    }
);


// ==========================================================
// LOAD CERTIFICATE
// ==========================================================

function loadCertificate() {

    console.log(
        "======================================"
    );

    console.log(
        "NSPCL CERTIFICATE"
    );

    console.log(
        "======================================"
    );

    console.log(
        "Employee Name:",
        employeeName
    );

    console.log(
        "Employee ID:",
        employeeId
    );

    console.log(
        "Score:",
        score
    );

    console.log(
        "Total Questions:",
        totalQuestions
    );

    console.log(
        "Percentage:",
        percentage + "%"
    );


    // ======================================================
    // EMPLOYEE NAME
    // ======================================================

    setText(
        "name",
        employeeName
    );


    // ======================================================
    // EMPLOYEE ID
    // ======================================================

    setText(
        "empid",
        employeeId
    );


    // ======================================================
    // SCORE
    // ======================================================

    setText(
        "score",
        score +
        " / " +
        totalQuestions
    );


    // ======================================================
    // PERCENTAGE
    // ======================================================

    setText(
        "percentage",
        percentage + "%"
    );


    // ======================================================
    // ACHIEVEMENT
    // ======================================================

    const achievement =
        getAchievement(
            percentage
        );


    // ======================================================
    // GRADE
    // ======================================================

    setText(
        "grade",
        achievement.grade
    );


    // ======================================================
    // BADGE
    // ======================================================

    const badge =
        document.getElementById(
            "badge"
        );


    if (badge) {

        badge.innerHTML = `

            <div class="badgeIcon">
                ${achievement.icon}
            </div>

            <div class="badgeTitle">
                ${escapeHTML(
                    achievement.title
                )}
            </div>

            <div class="badgeSubtitle">
                ${escapeHTML(
                    achievement.subtitle
                )}
            </div>

        `;

    }


    // ======================================================
    // CERTIFICATE NUMBER
    // ======================================================

    const certificateNumber =
        generateCertificateNumber();


    setText(
        "certno",
        certificateNumber
    );


    // ======================================================
    // DATE
    // ======================================================

    const today =
        new Date();


    setText(
        "date",
        today.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        )
    );


    // ======================================================
    // CONSOLE RESULT
    // ======================================================

    console.log(
        "Achievement:",
        achievement.title
    );

    console.log(
        "Grade:",
        achievement.grade
    );


    // ======================================================
    // CONFETTI
    // ======================================================

    if (
        typeof confetti ===
        "function"
    ) {

        setTimeout(
            function () {

                confetti({

                    particleCount: 150,

                    spread: 120,

                    origin: {
                        y: 0.6
                    }

                });

            },
            500
        );

    }

}


// ==========================================================
// ACHIEVEMENT SYSTEM
// ==========================================================

function getAchievement(
    percentage
) {


    // ======================================================
    // GOLD
    // ======================================================

    if (
        percentage >= 90
    ) {

        return {

            title:
                "GOLD CHAMPION",

            subtitle:
                "Outstanding Achievement",

            grade:
                "A+",

            icon:
                "🏆"

        };

    }


    // ======================================================
    // SILVER
    // ======================================================

    if (
        percentage >= 75
    ) {

        return {

            title:
                "SILVER ACHIEVER",

            subtitle:
                "Excellent Performance",

            grade:
                "A",

            icon:
                "🥈"

        };

    }


    // ======================================================
    // BRONZE
    // ======================================================

    if (
        percentage >= 60
    ) {

        return {

            title:
                "BRONZE PERFORMER",

            subtitle:
                "Very Good Performance",

            grade:
                "B",

            icon:
                "🥉"

        };

    }


    // ======================================================
    // PARTICIPANT
    // ======================================================

    return {

        title:
            "POWER PARTICIPANT",

        subtitle:
            "Thank You for Participating",

        grade:
            "C",

        icon:
            "⭐"

    };

}


// ==========================================================
// CERTIFICATE NUMBER
// ==========================================================

function generateCertificateNumber() {

    const date =
        new Date();


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    const cleanEmployeeId =
        String(employeeId)
            .replace(
                /[^a-zA-Z0-9]/g,
                ""
            );


    return (
        "NSPCL-" +
        year +
        month +
        day +
        "-" +
        cleanEmployeeId
    );

}


// ==========================================================
// SET TEXT SAFELY
// ==========================================================

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        console.warn(
            "Element not found:",
            elementId
        );

        return;

    }


    element.textContent =
        String(
            value ?? ""
        );

}


// ==========================================================
// REMOVE ANIMATION BEFORE PDF / PRINT
// ==========================================================

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


// ==========================================================
// DOWNLOAD PDF
// ==========================================================

async function downloadPDF() {

    prepareCertificate();


    const certificate =
        document.getElementById(
            "certificate"
        );


    if (!certificate) {

        alert(
            "Certificate element not found."
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
        } =
            window.jspdf;


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
            "Unable to generate PDF certificate."
        );

    }

}


// ==========================================================
// PRINT
// ==========================================================

function printCertificate() {

    prepareCertificate();

    window.print();

}


// ==========================================================
// ESCAPE HTML
// ==========================================================

function escapeHTML(
    value
) {

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
