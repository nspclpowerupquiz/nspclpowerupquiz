function login(){


let employeeId =
document.getElementById("employeeId").value;


let password =
document.getElementById("password").value;



if(employeeId==="" || password===""){


document.getElementById("message").innerHTML =
"⚠️ Please enter Employee ID and Password";


return;


}



// Employee ID = Password

if(employeeId === password){



localStorage.setItem(
"employee",
employeeId
);



alert("✅ Login Successful");


window.location.href="quiz.html";


}

else{


document.getElementById("message").innerHTML =
"❌ Invalid Employee ID or Password";


}



}
