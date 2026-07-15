// =================================
// NSPCL ADMIN PANEL
// =================================



let questionBank =

JSON.parse(

localStorage.getItem("NSPCL_questions")

)

|| [];





function addQuestion(){



let q={


question:

document.getElementById("question").value,


options:[


document.getElementById("option1").value,

document.getElementById("option2").value,

document.getElementById("option3").value,

document.getElementById("option4").value


],



answer:

document.getElementById("answer").value,



category:

document.getElementById("category").value


};




questionBank.push(q);



localStorage.setItem(

"NSPCL_questions",

JSON.stringify(questionBank)

);



alert("Question Added Successfully");



displayQuestions();


}





function displayQuestions(){


let list=

document.getElementById("questionList");



list.innerHTML="";



questionBank.forEach((q,index)=>{


list.innerHTML+=`

<div class="card">


<h3>

${index+1}. ${q.question}

</h3>


<p>
Category: ${q.category}
</p>



<button onclick="deleteQuestion(${index})">

❌ Delete

</button>


</div>


`;



});


}





function deleteQuestion(index){



questionBank.splice(index,1);



localStorage.setItem(

"NSPCL_questions",

JSON.stringify(questionBank)

);



displayQuestions();


}




displayQuestions();
