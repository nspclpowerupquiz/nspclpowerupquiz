// =======================================
// NSPCL POWER-UP QUIZ
// LIVE GOOGLE SHEET GALLERY
// =======================================


// YOUR GOOGLE APPS SCRIPT WEB APP URL

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbziOrV0Tit-jAwCXLZTLJovnnpIh1zTLpZVOOmhtjXyigCj6uxFxY-UYfK6_gn1xXW-yA/exec";



// LOAD GALLERY

window.onload = function(){

    loadGallery();

};




// =======================================
// FETCH GALLERY DATA
// =======================================

function loadGallery(){


    const gallery =
    document.getElementById("galleryContainer");


    if(!gallery){

        console.log("Gallery container not found");
        return;

    }



    fetch(SCRIPT_URL + "?action=gallery")


    .then(response => response.json())


    .then(data => {


        console.log("Gallery Data:", data);



        if(!data || data.length === 0){


            gallery.innerHTML =
            `
            <div class="loading">
            No Gallery Images Available
            </div>
            `;

            return;

        }



        gallery.innerHTML = "";



        data.forEach(item => {



            let card =
            document.createElement("div");


            card.className =
            "gallery-card";



            let imgURL =
            convertDriveLink(item.image);



            card.innerHTML = `

            <img 
            src="${imgURL}"
            alt="${item.title}"
            onclick="openImage('${imgURL}')"
            >


            <div class="gallery-title">
            ${item.title}
            </div>


            `;



            gallery.appendChild(card);



        });



    })


    .catch(error => {


        console.log("Gallery Error:",error);



        gallery.innerHTML =
        `
        <div class="loading">
        Unable to load gallery
        </div>
        `;


    });



}





// =======================================
// GOOGLE DRIVE IMAGE LINK CONVERTER
// =======================================

function convertDriveLink(url){


    if(!url)
        return "";



    if(url.includes("uc?export=view"))
        return url;



    let fileId="";



    if(url.includes("/d/")){


        fileId =
        url.split("/d/")[1]
        .split("/")[0];


    }


    else if(url.includes("id=")){


        fileId =
        url.split("id=")[1]
        .split("&")[0];


    }



    if(fileId){


        return 
        "https://drive.google.com/uc?export=view&id="
        + fileId;


    }


    return url;


}






// =======================================
// IMAGE POPUP
// =======================================

function openImage(src){


    let popup =
    document.createElement("div");


    popup.style.position="fixed";
    popup.style.top="0";
    popup.style.left="0";
    popup.style.width="100%";
    popup.style.height="100%";
    popup.style.background="rgba(0,0,0,0.85)";
    popup.style.display="flex";
    popup.style.alignItems="center";
    popup.style.justifyContent="center";
    popup.style.zIndex="9999";



    popup.innerHTML = `

    <img src="${src}"
    style="
    max-width:90%;
    max-height:90%;
    border-radius:20px;
    box-shadow:0 0 40px #000;
    ">

    `;



    popup.onclick=function(){

        popup.remove();

    };



    document.body.appendChild(popup);


}
