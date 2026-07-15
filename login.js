// ===============================
// NSPCL EMPLOYEE LOGIN SYSTEM
// ===============================


function login(){


let employeeId = 
document.getElementById("employeeId").value.trim();


let password = 
document.getElementById("password").value.trim();



// Employee Database

const employees = [


{
    id:"100106",
    password:"NSPCL@100106",
    name:"Employee 100106"
},


{
    id:"100107",
    password:"NSPCL@100107",
    name:"Employee 100107"
},


{
    id:"100108",
    password:"NSPCL@100108",
    name:"Employee 100108"
}


];



// Empty check

if(employeeId==="" || password===""){


document.getElementById("loginMessage").innerHTML =
"⚠️ Please enter Employee ID and Password";


return;

}



// Check employee

let user = employees.find(function(emp){

return emp.id===employeeId && emp.password===password;

});





if(user){



localStorage.setItem(
"employee",
user.name
);



localStorage.setItem(
"employeeId",
user.id
);



document.getElementById("loginMessage").innerHTML =
"✅ Login Successful";


setTimeout(function(){


window.location.href="quiz.html";


},1000);



}

else{


document.getElementById("loginMessage").innerHTML =
"❌ Invalid Employee ID or Password";


}



}
