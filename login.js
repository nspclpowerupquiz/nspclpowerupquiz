// =================================
// NSPCL POWER-UP QUIZ LOGIN SYSTEM
// =================================


function login(){



let employeeId =
document.getElementById("employeeId").value.trim();



let password =
document.getElementById("password").value.trim();




// Employee Database

const employees = [


const employees = [

{
id:"100106",
password:"NSPCL@100106",
name:"Rajesh Kumar"
},

{
id:"100107",
password:"NSPCL@100107",
name:"Amit Sharma"
},

{
id:"100108",
password:"NSPCL@100108",
name:"Suresh Verma"
}

];



if(employeeId==="" || password===""){


document.getElementById("loginMessage").innerHTML =

"⚠️ Please enter Employee ID and Password";


return;

}




let user = employees.find(function(emp){


return (

emp.id === employeeId &&

emp.password === password

);


});





if(user){



localStorage.setItem(
"employeeId",
user.id
);



localStorage.setItem(
"employeeName",
user.name
);





document.getElementById("loginMessage").innerHTML =

"✅ Login Successful!";





setTimeout(function(){


window.location.href="quiz.html";


},1000);



}



else{



document.getElementById("loginMessage").innerHTML =

"❌ Invalid Employee ID or Password";


}



}
