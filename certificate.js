// ==========================================
// NSPCL POWER-UP QUIZ
// CERTIFICATE.JS
// ==========================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";


const employeeId =
localStorage.getItem("employeeId");


console.log("Certificate JS Loaded");

console.log("Employee ID:", employeeId);



if(!employeeId){

alert("Please login first");

window.location.href="login.html";

}



// LOAD WHEN PAGE OPENS

window.onload=function(){

loadCertificate();

};





async function loadCertificate(){


try{


const response = await fetch(

SCRIPT_URL +
"?action=certificate&id=" +
employeeId

);



const data = await response.json();



console.log("Certificate Data:",data);



if(data.status!=="success"){

alert("Certificate not found");

return;

}



// DISPLAY DATA


document.getElementById("name").innerHTML =
data.employeeName;


document.getElementById("empid").innerHTML =
data.employeeId;


document.getElementById("score").innerHTML =
data.score + " / " + data.totalQuestions;



let percentage=data.percentage;


if(!String(percentage).includes("%")){

percentage=percentage+"%";

}


document.getElementById("percentage").innerHTML =
percentage;



document.getElementById("grade").innerHTML =
data.grade;



document.getElementById("certno").innerHTML =
data.certificateNo;



document.getElementById("date").innerHTML =

new Date(data.dateTime).toLocaleDateString(

"en-IN",

{

day:"numeric",

month:"long",

year:"numeric"

}

);



// BADGE

document.getElementById("badge").innerHTML =

data.grade.toUpperCase();




// CONFETTI

if(typeof confetti==="function"){

confetti({

particleCount:150,

spread:120

});

}



}

catch(error){


console.error(
"Certificate Error:",
error
);


alert(
"Unable to load certificate"
);


}


}





// PDF DOWNLOAD

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


const {jsPDF}=window.jspdf;


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

"NSPCL_Certificate_"+employeeId+".pdf"

);


}
