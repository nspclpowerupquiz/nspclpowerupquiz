// ==========================================
// NSPCL POWER-UP QUIZ
// CERTIFICATE.JS FINAL
// ==========================================


// GOOGLE APPS SCRIPT URL

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";



// GET EMPLOYEE ID

const employeeId =
localStorage.getItem("employeeId");



console.log("Certificate JS Loaded");

console.log("Employee ID:", employeeId);



// LOGIN CHECK

if(!employeeId){

    alert("Please login first");

    window.location.href="login.html";

}



// PAGE LOAD

window.onload=function(){

    loadCertificate();

};





// ==========================================
// LOAD CERTIFICATE DATA
// ==========================================

async function loadCertificate(){


try{


const response = await fetch(

SCRIPT_URL +
"?action=certificate&id=" +
employeeId

);



const data = await response.json();



console.log("Certificate Data:",data);



if(data.status !== "success"){


alert("Certificate data not found");


return;


}




// NAME

document.getElementById("name").innerHTML =
data.employeeName;



// EMPLOYEE ID

document.getElementById("empid").innerHTML =
data.employeeId;



// SCORE

document.getElementById("score").innerHTML =

data.score +

" / " +

data.totalQuestions;



// PERCENTAGE

let percentage=data.percentage;


if(!String(percentage).includes("%")){

    percentage = percentage + "%";

}


document.getElementById("percentage").innerHTML =
percentage;




// GRADE

document.getElementById("grade").innerHTML =
data.grade;



// CERTIFICATE NUMBER

document.getElementById("certno").innerHTML =
data.certificateNo;




// DATE

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

const badge =
document.getElementById("badge");


if(badge){

badge.innerHTML =
data.grade.toUpperCase();

}




// CONFETTI

if(typeof confetti==="function"){


setTimeout(()=>{


confetti({

particleCount:150,

spread:120

});


},500);


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






// ==========================================
// REMOVE ANIMATION BEFORE PDF / PRINT
// ==========================================

function prepareCertificate(){


const certificate =
document.getElementById("certificate");



certificate.classList.add(
"pdf-capture"
);



const elements =
certificate.querySelectorAll("*");



elements.forEach(function(el){


el.style.animation="none";

el.style.transition="none";

el.style.opacity="1";

el.style.transform="none";


});


}







// ==========================================
// DOWNLOAD PDF
// ==========================================

async function downloadPDF(){



console.log("PDF Download Started");



prepareCertificate();



const certificate =
document.getElementById("certificate");



await new Promise(resolve=>setTimeout(resolve,500));



const canvas =
await html2canvas(

certificate,

{

scale:3,

useCORS:true,

backgroundColor:"#ffffff",

logging:false

}

);



const imgData =
canvas.toDataURL("image/png");



const {jsPDF}=window.jspdf;



const pdf =
new jsPDF(

"landscape",

"mm",

"a4"

);



pdf.addImage(

imgData,

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







// ==========================================
// PRINT FIX
// ==========================================

function printCertificate(){


prepareCertificate();


window.print();


}
