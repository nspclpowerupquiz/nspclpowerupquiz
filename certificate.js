// ==========================================
// NSPCL POWER-UP QUIZ
// CERTIFICATE.JS
// COMPLETE REPLACEMENT
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
// GET LOGIN INFORMATION
// ==========================================

const storedEmployeeId =
localStorage.getItem("employeeId") || "";

const storedEmployeeName =
localStorage.getItem("employeeName") || "";


// ==========================================
// LOGGING
// ==========================================

console.log("=================================");
console.log("NSPCL CERTIFICATE");
console.log("=================================");
console.log("Stored Employee ID:", storedEmployeeId);
console.log("Stored Employee Name:", storedEmployeeName);


// ==========================================
// LOGIN CHECK
// ==========================================

if (!storedEmployeeId) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ==========================================
// PAGE LOAD
// ==========================================

window.addEventListener("load", function () {

    loadCertificate();

});


// ==========================================
// LOAD CERTIFICATE
// ==========================================

async function loadCertificate() {

    try {

        const url =
            SCRIPT_URL +
            "?action=certificate&id=" +
            encodeURIComponent(storedEmployeeId) +
            "&t=" +
            Date.now();


        console.log("Certificate API:", url);


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Certificate server connection failed."
            );

        }


        const data =
            await response.json();


        console.log(
            "Certificate API Response:",
            data
        );


        // ==========================================
        // STATUS CHECK
        // ==========================================

        if (
            data.status &&
            data.status !== "success"
        ) {

            throw new Error(
                data.message ||
                "Certificate data not found."
            );

        }


        // ==========================================
        // EMPLOYEE NAME
        // ==========================================

        /*
         * Priority:
         *
         * 1. API employeeName
         * 2. API name
         * 3. localStorage employeeName
         */

        const employeeName =
            cleanValue(
                data.employeeName
            ) ||
            cleanValue(
                data.name
            ) ||
            storedEmployeeName ||
            "Quiz Participant";


        setText(
            "name",
            employeeName
        );


        // ==========================================
        // EMPLOYEE ID
        // ==========================================

        const employeeId =
            cleanValue(
                data.employeeId
            ) ||
            storedEmployeeId;


        setText(
            "empid",
            employeeId
        );


        // ==========================================
        // DETERMINE TOTAL QUESTIONS
        // ==========================================

        let totalQuestions =
            Number(
                data.totalQuestions
            );


        if (
            !Number.isFinite(totalQuestions) ||
            totalQuestions <= 0
        ) {

            totalQuestions =
                TOTAL_QUIZ_QUESTIONS;

        }


        // ==========================================
        // DETERMINE CORRECT ANSWERS
        // ==========================================

        /*
         * IMPORTANT
         *
         * We DO NOT automatically assume
         * data.score is the number of correct answers.
         *
         * Your previous certificate was showing:
         *
         *       49 / 30
         *
         * because score was apparently a POINT VALUE,
         * not the number of correct answers.
         */


        let correctAnswers = null;


        // ------------------------------------------
        // OPTION 1
        // ------------------------------------------

        if (
            data.correctAnswers !== undefined &&
            data.correctAnswers !== null &&
            data.correctAnswers !== ""
        ) {

            correctAnswers =
                Number(
                    data.correctAnswers
                );

        }


        // ------------------------------------------
        // OPTION 2
        // ------------------------------------------

        if (
            correctAnswers === null &&
            data.correct !== undefined &&
            data.correct !== null &&
            data.correct !== ""
        ) {

            correctAnswers =
                Number(
                    data.correct
                );

        }


        // ------------------------------------------
        // OPTION 3
        // ------------------------------------------

        if (
            correctAnswers === null &&
            data.correctCount !== undefined &&
            data.correctCount !== null &&
            data.correctCount !== ""
        ) {

            correctAnswers =
                Number(
                    data.correctCount
                );

        }


        // ==========================================
        // GET PERCENTAGE
        // ==========================================

        let percentage =
            Number(
                data.percentage
            );


        /*
         * Sometimes Google Sheets may return
         * percentage as text such as "90%".
         */

        if (
            typeof data.percentage === "string"
        ) {

            percentage =
                parseFloat(
                    data.percentage
                );

        }


        // ==========================================
        // IF CORRECT ANSWERS UNKNOWN,
        // USE PERCENTAGE TO CALCULATE IT
        // ==========================================

        if (
            (
                !Number.isFinite(correctAnswers) ||
                correctAnswers < 0
            ) &&
            Number.isFinite(percentage)
        ) {

            correctAnswers =
                Math.round(
                    (
                        percentage /
                        100
                    ) *
                    totalQuestions
                );

        }


        // ==========================================
        // IF CORRECT ANSWERS STILL UNKNOWN
        // ==========================================

        /*
         * DO NOT display an impossible value.
         *
         * If API sends score = 49,
         * we will NOT display:
         *
         *       49 / 30
         *
         */

        if (
            !Number.isFinite(correctAnswers) ||
            correctAnswers < 0
        ) {

            /*
             * If the API's score is already within
             * the question range, it is safe to
             * treat it as correct answers.
             */

            const possibleScore =
                Number(
                    data.score
                );


            if (
                Number.isFinite(possibleScore) &&
                possibleScore >= 0 &&
                possibleScore <= totalQuestions
            ) {

                correctAnswers =
                    possibleScore;

            }

        }


        // ==========================================
        // FINAL SAFETY
        // ==========================================

        if (
            Number.isFinite(correctAnswers)
        ) {

            correctAnswers =
                Math.max(
                    0,
                    Math.min(
                        totalQuestions,
                        Math.round(correctAnswers)
                    )
                );

        }


        // ==========================================
        // CALCULATE PERCENTAGE
        // ==========================================

        if (
            !Number.isFinite(percentage) &&
            Number.isFinite(correctAnswers)
        ) {

            percentage =
                (
                    correctAnswers /
                    totalQuestions
                ) *
                100;

        }


        if (
            !Number.isFinite(percentage)
        ) {

            percentage = 0;

        }


        // ==========================================
        // ROUND PERCENTAGE
        // ==========================================

        percentage =
            Math.round(
                percentage
            );


        // ==========================================
        // SCORE DISPLAY
        // ==========================================

        if (
            Number.isFinite(correctAnswers)
        ) {

            setText(
                "score",
                correctAnswers +
                " / " +
                totalQuestions
            );

        }
        else {

            /*
             * Better to show unavailable than
             * something incorrect like 49/30.
             */

            setText(
                "score",
                "— / " +
                totalQuestions
            );

        }


        // ==========================================
        // PERCENTAGE DISPLAY
        // ==========================================

        setText(
            "percentage",
            percentage + "%"
        );


        // ==========================================
        // ACHIEVEMENT TITLE
        // ==========================================

        const achievement =
            getAchievement(
                percentage
            );


        // ==========================================
        // GRADE
        // ==========================================

        let grade =
            cleanValue(
                data.grade
            );


        /*
         * If your Google Sheet doesn't provide
         * a grade, automatically create one.
         */

        if (!grade) {

            grade =
                achievement.grade;

        }


        setText(
            "grade",
            grade
        );


        // ==========================================
        // BADGE
        // ==========================================

        const badge =
            document.getElementById(
                "badge"
            );


        if (badge) {

            badge.innerHTML =
                `
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


        // ==========================================
        // CERTIFICATE NUMBER
        // ==========================================

        let certificateNo =
            cleanValue(
                data.certificateNo
            );


        /*
         * If Apps Script does not provide a
         * certificate number, create one locally.
         */

        if (!certificateNo) {

            certificateNo =
                createCertificateNumber(
                    employeeId
                );

        }


        setText(
            "certno",
            certificateNo
        );


        // ==========================================
        // DATE
        // ==========================================

        let certificateDate =
            data.dateTime ||
            data.date ||
            data.timestamp;


        if (certificateDate) {

            const dateObject =
                new Date(
                    certificateDate
                );


            if (
                !isNaN(
                    dateObject.getTime()
                )
            ) {

                setText(
                    "date",
                    dateObject.toLocaleDateString(
                        "en-IN",
                        {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    )
                );

            }

        }
        else {

            /*
             * If server does not return date,
             * use today's date.
             */

            setText(
                "date",
                new Date().toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                )
            );

        }


        // ==========================================
        // CONSOLE DEBUG
        // ==========================================

        console.log(
            "---------------------------------"
        );

        console.log(
            "Employee:",
            employeeName
        );

        console.log(
            "Employee ID:",
            employeeId
        );

        console.log(
            "Correct Answers:",
            correctAnswers
        );

        console.log(
            "Total Questions:",
            totalQuestions
        );

        console.log(
            "Percentage:",
            percentage
        );

        console.log(
            "Grade:",
            grade
        );

        console.log(
            "Achievement:",
            achievement.title
        );

        console.log(
            "---------------------------------"
        );


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
    catch (error) {

        console.error(
            "Certificate Error:",
            error
        );


        alert(
            "Unable to load certificate. Please check your quiz result."
        );

    }

}


// ==========================================
// ACHIEVEMENT SYSTEM
// ==========================================

function getAchievement(
    percentage
) {

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


// ==========================================
// CERTIFICATE NUMBER
// ==========================================

function createCertificateNumber(
    employeeId
) {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        "NSPCL-" +
        year +
        month +
        day +
        "-" +
        String(employeeId)
            .replace(
                /[^a-zA-Z0-9]/g,
                ""
            )
            .slice(
                -6
            )
    );

}


// ==========================================
// SAFE TEXT INSERTION
// ==========================================

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;

    }


    element.textContent =
        value === undefined ||
        value === null
            ? ""
            : String(value);

}


// ==========================================
// CLEAN VALUE
// ==========================================

function cleanValue(
    value
) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    const text =
        String(value).trim();


    if (
        text === "" ||
        text === "undefined" ||
        text === "null"
    ) {

        return "";

    }


    return text;

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
            storedEmployeeId +
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
