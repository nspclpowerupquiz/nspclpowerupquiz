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


// ==========================================================
// GET QUIZ RESULT
// ==========================================================

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
// SAFETY CHECK
// NEVER ALLOW SCORE > TOTAL QUESTIONS
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
        "NSPCL POWER-UP SSC-C&M QUIZ"
    );

    console.log(
        "CERTIFICATE"
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
    // GET ACHIEVEMENT
    // ======================================================

    const achievement =
        getAchievement(
            percentage
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
                    achievement.remark
                )}
            </div>

        `;

    }


    // ======================================================
    // REMARK
    // ======================================================
    // If your HTML contains a separate element:
    //
    // <span id="remark"></span>
    //
    // it will also be filled automatically.
    // ======================================================

    setText(
        "remark",
        achievement.remark
    );


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
        "Remark:",
        achievement.remark
    );

    console.log(
        "Certificate loaded successfully."
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
//
// 90% and above  = GOLD
// 75% to 89%     = SILVER
// 60% to 74%     = BRONZE
// Below 60%      = PARTICIPANT
//
// NO GRADE IS USED.
// SHORT REMARKS ARE USED.
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

            remark:
                "Outstanding Performance",

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

            remark:
                "Excellent Achievement",

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

            remark:
                "Very Good Performance",

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

        remark:
            "Valued Participation",

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
// PREPARE CERTIFICATE FOR PDF / PRINT
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

            // Disable animation
            el.style.animation =
                "none";

            // Disable transitions
            el.style.transition =
                "none";

            // Keep elements visible
            el.style.opacity =
                "1";

            // IMPORTANT:
            // Do NOT remove transforms.
            // This preserves certificate positioning.

        }
    );

}


// ==========================================================
// DOWNLOAD PDF
// ==========================================================

async function downloadPDF() {

    console.log(
        "PDF download started..."
    );


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


    // ======================================================
    // WAIT FOR FINAL RENDER
    // ======================================================

    await new Promise(
        function (resolve) {

            setTimeout(
                resolve,
                700
            );

        }
    );


    try {

        // ==================================================
        // CREATE CANVAS
        // ==================================================

        const canvas =
            await html2canvas(

                certificate,

                {

                    scale: 3,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor:
                        "#ffffff",

                    logging: false,

                    imageTimeout:
                        15000,

                    onclone:
                        function (
                            clonedDocument
                        ) {

                            const clonedCertificate =
                                clonedDocument.getElementById(
                                    "certificate"
                                );


                            if (
                                clonedCertificate
                            ) {

                                clonedCertificate.style.animation =
                                    "none";

                                clonedCertificate.style.transition =
                                    "none";

                                clonedCertificate.style.opacity =
                                    "1";

                            }

                        }

                }

            );


        // ==================================================
        // CONVERT CANVAS TO IMAGE
        // ==================================================

        const imgData =
            canvas.toDataURL(
                "image/png"
            );


        // ==================================================
        // GET jsPDF
        // ==================================================

        const {
            jsPDF
        } =
            window.jspdf;


        // ==================================================
        // CREATE A4 LANDSCAPE PDF
        // ==================================================

        const pdf =
            new jsPDF(

                "landscape",

                "mm",

                "a4"

            );


        // ==================================================
        // ADD CERTIFICATE IMAGE
        // ==================================================

        pdf.addImage(

            imgData,

            "PNG",

            5,

            5,

            287,

            200,

            undefined,

            "FAST"

        );


        // ==================================================
        // SAVE PDF
        // ==================================================

        pdf.save(

            "NSPCL_Certificate_" +
            employeeId +
            ".pdf"

        );


        console.log(
            "PDF downloaded successfully."
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
// PRINT CERTIFICATE
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
