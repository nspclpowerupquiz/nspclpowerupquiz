const SCRIPT_URL="https://script.google.com/macros/s/AKfycbwBbn0mA_VbQG3A4lz7nDGWZm66P6jKBx12zXbYZ-OoCudVBzIvK-MkuZEXxLcECl5wdw/exec";

let employeeId=localStorage.getItem("employeeId");

fetch(SCRIPT_URL+"?action=certificate&id="+employeeId)

.then(res=>res.json())

.then(data=>{

document.getElementById("name").innerHTML=data.employeeName;

document.getElementById("empid").innerHTML=data.employeeId;

document.getElementById("score").innerHTML=data.score+" / "+data.totalQuestions;

document.getElementById("percentage").innerHTML=

"Percentage : "+Math.round(data.percentage*100)+"%";

document.getElementById("date").innerHTML=

new Date(data.dateTime).toLocaleDateString();

document.getElementById("certno").innerHTML=

"NSPCL-"+data.employeeId+"-"+Date.now();

});



async function downloadPDF(){

const {jsPDF}=window.jspdf;

const canvas=await html2canvas(document.getElementById("certificate"));

const img=canvas.toDataURL("image/png");

const pdf=new jsPDF("landscape");

pdf.addImage(img,'PNG',10,10,277,190);

pdf.save("Certificate.pdf");

}
