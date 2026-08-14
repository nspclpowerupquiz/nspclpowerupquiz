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
    // REMARK
    // ======================================================

    const remark =
        document.getElementById(
            "remark"
        );


    if (remark) {

        remark.textContent =
            getRemark(
                percentage
            );

    }


    // ======================================================
    // ACHIEVEMENT
    // ======================================================

    const achievement =
        getAchievement(
            percentage
        );


    // ======================================================
    // NO GRADE
    // ======================================================
    //
    // Grade is intentionally NOT displayed.
    //
    // If an old grade element still exists in HTML,
    // clear its content.
    //
    // ======================================================

    const grade =
        document.getElementById(
            "grade"
        );


    if (grade) {

        grade.textContent =
            "";

    }


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
    // CONSOLE
    // ======================================================

    console.log(
        "Achievement:",
        achievement.title
    );

    console.log(
        "Remark:",
        getRemark(percentage)
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

                    startVelocity: 35,

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
// REMARK SYSTEM
// ==========================================================
//
// The remark changes according to performance.
// No grade is used.
// ==========================================================

function getRemark(
    percentage
) {


    // ======================================================
    // 90% AND ABOVE
    // ======================================================

    if (
        percentage >= 90
    ) {

        return (
            "Your exceptional performance and enthusiastic " +
            "participation reflect a strong commitment to " +
            "continuous learning and excellence. Your pursuit " +
            "of knowledge is truly commendable."
        );

    }


    // ======================================================
    // 75% TO 89%
    // ======================================================

    if (
        percentage >= 75
    ) {

        return (
            "Your excellent performance demonstrates a strong " +
            "spirit of learning and professional development. " +
            "Your enthusiasm and commitment to knowledge " +
            "enhancement are highly appreciated."
        );

    }


    // ======================================================
    // 60% TO 74%
    // ======================================================

    if (
        percentage >= 60
    ) {

        return (
            "Your sincere participation and positive approach " +
            "towards learning are highly appreciated. Keep " +
            "building your knowledge and continue striving " +
            "towards excellence."
        );

    }


    // ======================================================
    // BELOW 60%
    // ======================================================

    return (
        "Your participation in the NSPCL Power Up SSC-C&M Quiz " +
        "is appreciated. Keep learning, keep improving and " +
        "continue your journey towards knowledge and excellence."
    );

}


// ==========================================================
// ACHIEVEMENT SYSTEM
// ==========================================================
//
// 90% and above = GOLD CHAMPION
// 75% to 89%   = SILVER ACHIEVER
// 60% to 74%   = BRONZE PERFORMER
// Below 60%    = POWER PARTICIPANT
//
// NO GRADE.
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
        String(
            employeeId
        )
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

            el.style.animation =
                "none";

            el.style.transition =
                "none";

            el.style.opacity =
                "1";

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
    // WAIT FOR RENDER
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


                            // --------------------------------
                            // CERTIFICATE
                            // --------------------------------

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


                            // --------------------------------
                            // ENSURE REMARK IS PRESENT
                            // --------------------------------

                            const clonedRemark =
                                clonedDocument.getElementById(
                                    "remark"
                                );


                            if (
                                clonedRemark
                            ) {

                                clonedRemark.textContent =
                                    getRemark(
                                        percentage
                                    );

                            }


                            // --------------------------------
                            // REMOVE GRADE TEXT
                            // --------------------------------

                            const clonedGrade =
                                clonedDocument.getElementById(
                                    "grade"
                                );


                            if (
                                clonedGrade
                            ) {

                                clonedGrade.textContent =
                                    "";

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


        if (!jsPDF) {

            throw new Error(
                "jsPDF library was not loaded."
            );

        }


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
        // ADD CERTIFICATE
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
            "Unable to generate PDF certificate. Please try again."
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
