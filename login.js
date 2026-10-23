
// =====================================
// NSPCL PowerUp SSC-C&M Quiz
// Employee Login System
// PARTICIPANTS: Access available 24x7
// ADMIN: Employee ID 100106
// =====================================

const ADMIN_EMPLOYEE_ID = "100106";

// =====================================
// QUIZ ACCESS — NO TIME RESTRICTION
// =====================================

function isQuizOpen() {
    return true;
}

// =====================================
// CHECK WHETHER EMPLOYEE IS ADMIN
// =====================================

function isAdmin(employeeId) {
    return employeeId === ADMIN_EMPLOYEE_ID;
}

// =====================================
// UPDATE QUIZ STATUS
// =====================================

function updateQuizStatus() {
    const message = document.getElementById("loginMessage");
    const button = document.querySelector(".login-box button");

    if (message) {
        message.innerHTML =
            "🟢 <strong>Quiz is open!</strong><br>" +
            "Participants can log in and participate at any time.";
    }

    if (button) {
        button.disabled = false;
    }
}

// =====================================
// LOGIN FUNCTION
// =====================================

function login() {
    const employeeIdElement = document.getElementById("employeeId");
    const employeeNameElement = document.getElementById("employeeName");
    const passwordElement = document.getElementById("password");
    const message = document.getElementById("loginMessage");

    const employeeId = employeeIdElement
        ? employeeIdElement.value.trim()
        : "";

    const employeeName = employeeNameElement
        ? employeeNameElement.value.trim()
        : "";

    const password = passwordElement
        ? passwordElement.value.trim()
        : "";

    // Validate Employee ID
    if (!employeeId) {
        if (message) message.textContent = "⚠️ Please enter Employee ID.";
        return;
    }

    if (!/^[A-Za-z0-9]{3,}$/.test(employeeId)) {
        if (message) message.textContent = "⚠️ Invalid Employee ID.";
        return;
    }

    // Identify Admin
    const admin = isAdmin(employeeId);

    // Validate password using the existing password convention
    const correctPassword = "NSPCL@" + employeeId;

    if (password !== correctPassword) {
        if (message) message.textContent = "⚠️ Incorrect Password.";
        return;
    }

    // Clear previous session and quiz results
    localStorage.removeItem("employeeId");
    localStorage.removeItem("employeeName");
    localStorage.removeItem("score");
    localStorage.removeItem("totalQuestions");
    localStorage.removeItem("percentage");
    localStorage.removeItem("isAdmin");

    // Save current employee details
    localStorage.setItem("employeeId", employeeId);
    localStorage.setItem("employeeName", employeeName || "Employee");
    localStorage.setItem("isAdmin", admin ? "true" : "false");

    // Show success message
    if (message) {
        message.innerHTML = admin
            ? "👑 <strong>Admin login successful!</strong><br>Opening quiz..."
            : "✅ <strong>Login successful!</strong><br>Opening quiz...";
    }

    // Redirect to quiz
    window.location.href = "quiz.html";
}

// =====================================
// INITIALIZE LOGIN PAGE
// =====================================

document.addEventListener("DOMContentLoaded", function () {
    updateQuizStatus();
});
