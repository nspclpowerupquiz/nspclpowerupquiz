// =====================================
// NSPCL POWER-UP QUIZ
// Employee Login System
// =====================================


// LOGIN FUNCTION

function login(){


    // Get input values

    let employeeId = document.getElementById("employeeId").value.trim();

    let employeeNameElement = document.getElementById("employeeName");

    let employeeName = employeeNameElement 
        ? employeeNameElement.value.trim()
        : "Employee";


    let password = document.getElementById("password").value.trim();


    let message = document.getElementById("loginMessage");



    // ===============================
    // EMPLOYEE ID CHECK
    // ===============================


    if(employeeId === ""){

        message.innerHTML = "⚠️ Please enter Employee ID";
        return;

    }



    // Accept numbers and alphanumeric IDs
    // Minimum 3 characters

    if(!/^[A-Za-z0-9]{3,}$/.test(employeeId)){


        message.innerHTML = "⚠️ Invalid Employee ID";
        return;

    }



    // ===============================
    // PASSWORD CHECK
    // ===============================


    if(password === ""){


        message.innerHTML = "⚠️ Please enter password";
        return;


    }



    // ===============================
    // SAVE LOGIN DETAILS
    // ===============================


    localStorage.setItem(
        "employeeId",
        employeeId
    );


    localStorage.setItem(
        "employeeName",
        employeeName || "Employee"
    );



    // ===============================
    // SUCCESS MESSAGE
    // ===============================


    message.innerHTML = "✅ Login Successful! Starting Quiz...";



    // Redirect to quiz page

    setTimeout(function(){

        window.location.href = "quiz.html";

    },800);



}
