// =================================
// NSPCL POWER-UP QUIZ LOGIN SYSTEM
// =================================


function login(){


    let employeeId = document.getElementById("employeeId").value.trim();

    let password = document.getElementById("password").value.trim();



    // Login credentials database
    // Add more employees here if required

    const employees = [


        {
            id:"100106",
            password:"NSPCL@100106"
        },


        {
            id:"100107",
            password:"NSPCL@100107"
        },


        {
            id:"100108",
            password:"NSPCL@100108"
        }


    ];



    // Check empty fields

    if(employeeId === "" || password === ""){


        document.getElementById("loginMessage").innerHTML =
        "⚠️ Please enter Employee ID and Password";


        return;

    }



    // Verify login

    let user = employees.find(function(emp){


        return emp.id === employeeId &&
               emp.password === password;


    });





    if(user){


        // Save employee ID only

        localStorage.setItem("employeeId", user.id);



        // Remove old saved name (important)

        localStorage.removeItem("employeeName");



        document.getElementById("loginMessage").innerHTML =
        "✅ Login Successful";



        setTimeout(function(){


            // Go to name entry page

            window.location.href = "participant.html";


        },1000);



    }


    else{


        document.getElementById("loginMessage").innerHTML =
        "❌ Invalid Employee ID or Password";


    }


}
