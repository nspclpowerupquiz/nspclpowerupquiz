// ==========================================
// NSPCL POWER-UP QUIZ
// CERTIFICATE.JS (REVISED)
// ==========================================


// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

alert("TEST CERTIFICATE JS");
alert("Certificate JS Connected");
console.log("Certificate JS Connected")

console.log("Certificate JS Loaded");

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";


// ==========================================
// EMPLOYEE
// ==========================================

const employeeId = localStorage.getItem("employeeId");


console.log("Employee ID =", employeeId);


if (!employeeId) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ==========================================
// PAGE LOAD
// ==========================================

window.onload = function(){

    loadCertificate();

};



// ==========================================
// LOAD CERTIFICATE
// ==========================================

async function loadCertificate(){


try{


console.log("Loading certificate...");


const response = await fetch(

    SCRIPT_URL +
    "?action=certificate&id=" +
    employeeId

);


const data = await response.json();


console.log("Certificate Data:", data);



if(data.status !== "success"){


    alert("Certificate data not found.");

    return;

}




// ==========================================
// EMPLOYEE DETAILS
// ==========================================


document.getElementById("name").textContent =
data.employeeName || "Employee Name";


document.getElementById("empid").textContent =
data.employeeId || employeeId;



// ==========================================
// SCORE
// ==========================================


document.getElementById("score").textContent =

(data.score || 0) +

" / " +

(data.totalQuestions || 20);




// ==========================================
// PERCENTAGE
// ==========================================


let percentage = data.percentage || "0%";


if(!percentage.toString().includes("%")){

    percentage = percentage + "%";

}


document.getElementById("percentage").textContent =
percentage;




// ==========================================
// GRADE
// ==========================================


let grade = data.grade;


if(!grade){


    let value =
    parseInt(percentage);


    if(value >= 90){

        grade="GOLD";

    }
    else if(value >=70){

        grade="SILVER";

    }
    else{

        grade="BRONZE";

    }

}



document.getElementById("grade").textContent =
grade;




// ==========================================
// CERTIFICATE NUMBER
// ==========================================


document.getElementById("certno").textContent =

data.certificateNo ||

"NSPCL-" + employeeId + "-" + data.score;




// ==========================================
// DATE
// ==========================================


if(data.dateTime){


let date =
new Date(data.dateTime);


document.getElementById("date").textContent =


date.toLocaleDateString(

"en-IN",

{

day:"numeric",

month:"long",

year:"numeric"

}

);


}




// ==========================================
// BADGE
// ==========================================


const badge =
document.getElementById("badge");



switch(grade.toLowerCase()){



case "gold":


badge.innerHTML =
"🥇 GOLD ACHIEVER";


badge.style.background =
"linear-gradient(90deg,#B8860B,#FFD700,#B8860B)";


break;



case "silver":


badge.innerHTML =
"🥈 SILVER ACHIEVER";


badge.style.background =
"linear-gradient(90deg,#777,#DDD,#777)";


break;



case "bronze":


badge.innerHTML =
"🥉 BRONZE ACHIEVER";


badge.style.background =
"linear-gradient(90deg,#8B4513,#CD7F32,#8B4513)";


break;



default:


badge.innerHTML =
"⭐ PARTICIPATION";


}




// ==========================================
// CONFETTI
// ==========================================


setTimeout(()=>{


confetti({

particleCount:180,

spread:160,

origin:{y:0.6}

});


},500);



}


catch(error){


console.log(
"Certificate Error:",
error
);


alert(
"Unable to load certificate"
);


}



}



// ==========================================
// DOWNLOAD PDF
// ==========================================


async function downloadPDF(){



const certificate =
document.getElementById("certificate");



const canvas =
await html2canvas(

certificate,

{

scale:2,

useCORS:true

}

);



const img =
canvas.toDataURL("image/png");



const {jsPDF} =
window.jspdf;



const pdf =
new jsPDF(

"landscape",

"mm",

"a4"

);



pdf.addImage(

img,

"PNG",

5,

5,

287,

200

);



pdf.save(

"NSPCL_Certificate_" +

employeeId +

".pdf"

);



}
