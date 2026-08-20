// =====================================
// NSPCL POWER-UP QUIZ
// Employee Login System
// Participant Quiz Window:
// 4:00 PM – 4:30 PM
// =====================================


// =====================================
// QUIZ TIME WINDOW
// =====================================

const QUIZ_START_HOUR = 16;      // 4:00 PM
const QUIZ_START_MINUTE = 0;

const QUIZ_END_HOUR = 16;        // 4:30 PM
const QUIZ_END_MINUTE = 30;


// =====================================
// CHECK WHETHER PARTICIPANT QUIZ IS OPEN
// =====================================

function isQuizOpen() {

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

    const startMinutes =
        QUIZ_START_HOUR * 60 + QUIZ_START_MINUTE;

    const endMinutes =
        QUIZ_END_HOUR * 60 + QUIZ_END_MINUTE;

    return (
        currentMinutes >= startMinutes &&
        currentMinutes < endMinutes
    );
}


// =====================================
// GET QUIZ STATUS MESSAGE
// =====================================

function updateQuizStatus() {

    const message =
        document.getElementById("loginMessage");

    const button =
        document.querySelector(".login-box button");

    if (!message || !button) return;


    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();


    const startMinutes =
        QUIZ_START_HOUR * 60 + QUIZ_START_MINUTE;

    const endMinutes =
        QUIZ_END_HOUR * 60 + QUIZ_END_MINUTE;


    // ===============================
    // BEFORE 4:00 PM
    // ===============================

    if (currentMinutes < startMinutes) {

        button.disabled = true;

        message.innerHTML =
            "🔒 Quiz opens at <strong>4:00 PM</strong> today.";

        return;
    }


    // ===============================
    // 4:00 PM – 4:30 PM
    // ===============================

    if (
        currentMinutes >= startMinutes &&
        currentMinutes < endMinutes
    ) {

        button.disabled = false;

        message.innerHTML =
            "🟢 <strong>Quiz is LIVE!</strong> You can participate now.";

        return;
    }


    // ===============================
    // AFTER 4:30 PM
    // ===============================

    if (currentMinutes >= endMinutes) {

        button.disabled = true;

        message.innerHTML =
            "🔴 Quiz participation has closed for today.<br>" +
            "Quiz window: <strong>4:00 PM – 4:30 PM</strong>";

        return;
    }
}


// =====================================
// LOGIN FUNCTION
// =====================================

function login() {


    // =================================
    // TIME CHECK FIRST
    // =================================

    if (!isQuizOpen()) {

        const message =
            document.getElementById("loginMessage");

        message.innerHTML =
            "🔒 The NSPCL Power-Up Quiz is available " +
            "for participants only from <strong>4:00 PM to 4:30 PM</strong>.";

        return;
    }


    // =================================
    // GET INPUT VALUES
    // =================================

    let employeeId =
        document.getElementById("employeeId").value.trim();


    let employeeNameElement =
        document.getElementById("employeeName");


    let employeeName =
        employeeNameElement
            ? employeeNameElement.value.trim()
            : "Employee";


    let password =
        document.getElementById("password").value.trim();


    let message =
        document.getElementById("loginMessage");


    // =================================
    // EMPLOYEE ID CHECK
    // =================================

    if (employeeId === "") {

        message.innerHTML =
            "⚠️ Please enter Employee ID";

        return;
    }


    // Accept numbers and alphanumeric IDs
    // Minimum 3 characters

    if (!/^[A-Za-z0-9]{3,}$/.test(employeeId)) {

        message.innerHTML =
            "⚠️ Invalid Employee ID";

        return;
    }


    // =================================
    // PASSWORD CHECK
    // =================================

    let correctPassword =
        "NSPCL@" + employeeId;


    if (password !== correctPassword) {

        message.innerHTML =
            "⚠️ Incorrect Password";

        return;
    }


    // =================================
    // SAVE LOGIN DETAILS
    // =================================

    localStorage.setItem(
        "employeeId",
        employeeId
    );


    localStorage.setItem(
        "employeeName",
        employeeName || "Employee"
    );


    // =================================
    // SUCCESS MESSAGE
    // =================================

    message.innerHTML =
        "✅ Login Successful! Starting Quiz...";


    // =================================
    // REDIRECT TO QUIZ
    // =================================

    setTimeout(function () {

        window.location.href =
            "quiz.html";

    }, 800);
}


// =====================================
// INITIALIZE QUIZ STATUS
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateQuizStatus();

        // Update every 10 seconds
        // so the page automatically changes
        // when 4:00 PM or 4:30 PM arrives.

        setInterval(
            updateQuizStatus,
            10000
        );

    }
);
