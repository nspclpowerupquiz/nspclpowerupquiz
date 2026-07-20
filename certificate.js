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
// DOWNLOAD PDF
// ==========================================

async function downloadPDF(){


console.log("PDF Download Started");



const certificate =
document.getElementById("certificate");


// Wait for images to load

const images =
certificate.querySelectorAll("img");


await Promise.all(

[...images].map(img=>{

if(img.complete){

return Promise.resolve();

}

return new Promise(resolve=>{

img.onload=resolve;

img.onerror=resolve;

});

})

);



// Small delay for rendering

await new Promise(resolve=>setTimeout(resolve,1000));



const canvas =
await html2canvas(

certificate,

{

scale:3,

useCORS:true,

allowTaint:true,

backgroundColor:"#ffffff",

logging:true

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



const width = 287;

const height =
canvas.height * width / canvas.width;



pdf.addImage(

imgData,

"PNG",

5,

5,

width,

height

);



pdf.save(

"NSPCL_Certificate_" +

employeeId +

".pdf"

);


}
