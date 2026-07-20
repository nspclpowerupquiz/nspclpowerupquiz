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

    alert("Please login first.");

    window.location.href="login.html";

}




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



if(data.status !== "success"){


alert("Certificate not found");

return;


}



// Employee Name

document.getElementById("name").textContent =
data.employeeName;



// Employee ID

document.getElementById("empid").textContent =
data.employeeId;



// Score

document.getElementById("score").textContent =

data.score +
" / " +
data.totalQuestions;



// Percentage

document.getElementById("percentage").textContent =

data.percentage + "%";



// Grade

document.getElementById("grade").textContent =

data.grade;



// Certificate No

document.getElementById("certno").textContent =

data.certificateNo;



// Date

document.getElementById("date").textContent =

new Date(data.dateTime).toLocaleDateString(
"en-IN",
{
day:"numeric",
month:"long",
year:"numeric"
}
);





// Badge

const badge =
document.getElementById("badge");



let grade =
data.grade.toLowerCase();



if(grade==="gold"){


badge.innerHTML="🥇 GOLD ACHIEVER";


}

else if(grade==="silver"){


badge.innerHTML="🥈 SILVER ACHIEVER";


}

else if(grade==="bronze"){


badge.innerHTML="🥉 BRONZE ACHIEVER";


}

else{


badge.innerHTML="⭐ PARTICIPATION";


}






// Confetti

confetti({

particleCount:200,

spread:150,

origin:{
y:0.6
}

});



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
// DOWNLOAD PDF FIXED
// ==========================================

async function downloadPDF(){


console.log("PDF button clicked");



const certificate =
document.getElementById("certificate");


// Hide watermark temporarily

const watermark =
document.querySelector(".watermark");


if(watermark){

    watermark.style.display="none";

}



// wait for rendering

await new Promise(
resolve=>setTimeout(resolve,500)
);



const canvas =
await html2canvas(
certificate,
{

scale:2,

useCORS:true,

backgroundColor:"#ffffff",

foreignObjectRendering:true

}

);



// Show watermark again

if(watermark){

    watermark.style.display="block";

}



const imgData =
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
