// =====================================
// NSPCL POWER-UP QUIZ
// Employee Login System
//
// PARTICIPANTS:
// 4:00 PM – 4:30 PM
//
// ADMIN:
// Employee ID 100106
// Admin can login anytime
// =====================================


// =====================================
// ADMIN SETTINGS
// =====================================

const ADMIN_EMPLOYEE_ID = "100106";


// =====================================
// QUIZ TIME WINDOW FOR PARTICIPANTS
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
// CHECK WHETHER EMPLOYEE IS ADMIN
// =====================================

function isAdmin(employeeId) {

    return employeeId === ADMIN_EMPLOYEE_ID;

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


    // =================================
    // CHECK CURRENT TIME
    // =================================

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();


    const startMinutes =
        QUIZ_START_HOUR * 60 + QUIZ_START_MINUTE;

    const endMinutes =
        QUIZ_END_HOUR * 60 + QUIZ_END_MINUTE;


    // =================================
    // BEFORE 4:00 PM
    // =================================

    if (currentMinutes < startMinutes) {

        button.disabled = false;

        message.innerHTML =
            "🔒 Participants: Quiz opens at " +
            "<strong>4:00 PM</strong> today.<br>" +
            "👑 Admin ID <strong>100106</strong> can login anytime.";

        return;
    }


    // =================================
    // 4:00 PM – 4:30 PM
    // =================================

    if (
        currentMinutes >= startMinutes &&
        currentMinutes < endMinutes
    ) {

        button.disabled = false;

        message.innerHTML =
            "🟢 <strong>Quiz is LIVE!</strong> " +
            "You can participate now.";

        return;
    }


    // =================================
    // AFTER 4:30 PM
    // =================================

    if (currentMinutes >= endMinutes) {

        button.disabled = false;

        message.innerHTML =
            "🔴 Quiz participation has closed for today.<br>" +
            "Quiz window: <strong>4:00 PM – 4:30 PM</strong><br>" +
            "👑 Admin ID <strong>100106</strong> can login anytime.";

        return;
    }

}


// =====================================
// LOGIN FUNCTION
// =====================================

function login() {


    // =================================
    // GET INPUT VALUES
    // =================================

    let employeeIdElement =
        document.getElementById("employeeId");


    let employeeId =
        employeeIdElement
            ? employeeIdElement.value.trim()
            : "";


    let employeeNameElement =
        document.getElementById("employeeName");


    let employeeName =
        employeeNameElement
            ? employeeNameElement.value.trim()
            : "Employee";


    let passwordElement =
        document.getElementById("password");


    let password =
        passwordElement
            ? passwordElement.value.trim()
            : "";


    let message =
        document.getElementById("loginMessage");


    // =================================
    // CHECK EMPLOYEE ID
    // =================================

    if (employeeId === "") {

        if (message) {

            message.innerHTML =
                "⚠️ Please enter Employee ID";

        }

        return;
    }


    // =================================
    // VALIDATE EMPLOYEE ID
    // =================================

    if (!/^[A-Za-z0-9]{3,}$/.test(employeeId)) {

        if (message) {

            message.innerHTML =
                "⚠️ Invalid Employee ID";

        }

        return;
    }


    // =================================
    // DETERMINE ADMIN STATUS
    // =================================

    const admin =
        isAdmin(employeeId);


    // =================================
    // PASSWORD
    //
    // Example:
    // Employee ID 100106
    // Password NSPCL@100106
    // =================================

    let correctPassword =
        "NSPCL@" + employeeId;


    // =================================
    // PASSWORD CHECK
    // =================================

    if (password !== correctPassword) {

        if (message) {

            message.innerHTML =
                "⚠️ Incorrect Password";

        }

        return;
    }


    // =================================
    // PARTICIPANT TIME CHECK
    //
    // ADMIN 100106 BYPASSES THIS CHECK
    // =================================

    if (!admin && !isQuizOpen()) {

        if (message) {

            message.innerHTML =
                "🔒 The NSPCL Power-Up Quiz is available " +
                "for participants only from " +
                "<strong>4:00 PM to 4:30 PM</strong>.";
        }

        return;
    }


    // =================================
    // SAVE EMPLOYEE ID
    // =================================

    localStorage.setItem(
        "employeeId",
        employeeId
    );


    // =================================
    // SAVE EMPLOYEE NAME
    // =================================

    localStorage.setItem(
        "employeeName",
        employeeName || "Employee"
    );


    // =================================
    // SAVE ADMIN STATUS
    // =================================

    localStorage.setItem(
        "isAdmin",
        admin ? "true" : "false"
    );


    // =================================
    // SUCCESS MESSAGE
    // =================================

    if (message) {

        if (admin) {

            message.innerHTML =
                "👑 <strong>Admin Login Successful!</strong><br>" +
                "Starting Quiz...";

        } else {

            message.innerHTML =
                "✅ <strong>Login Successful!</strong><br>" +
                "Starting Quiz...";

        }

    }


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


        // =================================
        // UPDATE STATUS EVERY 10 SECONDS
        // =================================

        setInterval(
            updateQuizStatus,
            10000
        );

    }
);
