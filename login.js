function login(){

    let employeeId = document.getElementById("employeeId").value.trim();

    let employeeName = document.getElementById("employeeName") 
        ? document.getElementById("employeeName").value.trim()
        : "Employee";

    let password = document.getElementById("password").value.trim();

    let message = document.getElementById("loginMessage");


    // Check Employee ID
    if(employeeId === ""){

        message.innerHTML = "⚠️ Enter Employee ID";
        return;

    }


    // Accept any 6 digit Employee ID starting from any digit
    if(!/^[0-9]{6}$/.test(employeeId)){

        message.innerHTML = "⚠️ Employee ID must be 6 digits";
        return;

    }


    // Password check
    if(password === ""){

        message.innerHTML = "⚠️ Enter Password";
        return;

    }


    // Save details

    localStorage.setItem("employeeId", employeeId);

    localStorage.setItem(
        "employeeName",
        employeeName || "Employee"
    );


    // Open quiz

    window.location.href = "quiz.html";

}
