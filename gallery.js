// =======================================
// NSPCL POWER-UP QUIZ
// LIVE GOOGLE SHEET GALLERY
// =======================================


// =======================================
// GOOGLE APPS SCRIPT WEB APP URL
// =======================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbziOrV0Tit-jAwCXLZTLJovnnpIh1zTLpZVOOmhtjXyigCj6uxFxY-UYfK6_gn1xXW-yA/exec";


// =======================================
// LOAD GALLERY WHEN PAGE LOADS
// =======================================

window.onload = function () {

    loadGallery();

};


// =======================================
// FETCH GALLERY DATA
// =======================================

function loadGallery() {

    const gallery =
        document.getElementById("galleryContainer");


    if (!gallery) {

        console.log("Gallery container not found");
        return;

    }


    gallery.innerHTML = `
        <div class="loading">
            Loading Gallery...
        </div>
    `;


    fetch(SCRIPT_URL + "?action=gallery")

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "HTTP Error: " + response.status
                );
            }

            return response.json();

        })


        .then(data => {

            console.log("Gallery Data:", data);


            if (!Array.isArray(data) || data.length === 0) {

                gallery.innerHTML = `
                    <div class="loading">
                        No Gallery Images Available
                    </div>
                `;

                return;

            }


            gallery.innerHTML = "";


            data.forEach(item => {

                console.log("Gallery Item:", item);


                const card =
                    document.createElement("div");

                card.className =
                    "gallery-card";


                // =======================================
                // CONVERT GOOGLE DRIVE URL
                // =======================================

                const imgURL =
                    convertDriveLink(item.image);


                console.log(
                    "Original Image URL:",
                    item.image
                );

                console.log(
                    "Converted Image URL:",
                    imgURL
                );


                // =======================================
                // CREATE IMAGE
                // =======================================

                const img =
                    document.createElement("img");


                img.src = imgURL;

                img.alt =
                    item.title || "NSPCL Gallery Image";


                img.loading = "lazy";


                img.style.width = "100%";

                img.style.height = "240px";

                img.style.objectFit = "cover";


                // =======================================
                // IMAGE ERROR HANDLING
                // =======================================

                img.onerror = function () {

                    console.error(
                        "IMAGE FAILED TO LOAD:",
                        imgURL
                    );


                    this.style.display = "none";


                    const errorMessage =
                        document.createElement("div");


                    errorMessage.style.height =
                        "240px";

                    errorMessage.style.display =
                        "flex";

                    errorMessage.style.alignItems =
                        "center";

                    errorMessage.style.justifyContent =
                        "center";

                    errorMessage.style.background =
                        "#eeeeee";

                    errorMessage.style.color =
                        "#555";

                    errorMessage.innerHTML =
                        "⚠️ Image could not be loaded";


                    card.insertBefore(
                        errorMessage,
                        card.firstChild
                    );

                };


                // =======================================
                // OPEN IMAGE POPUP
                // =======================================

                img.onclick = function () {

                    openImage(imgURL);

                };


                // =======================================
                // TITLE
                // =======================================

                const title =
                    document.createElement("div");


                title.className =
                    "gallery-title";


                title.innerHTML =
                    item.title || "NSPCL Power-Up Quiz";


                // =======================================
                // ADD TO CARD
                // =======================================

                card.appendChild(img);

                card.appendChild(title);


                gallery.appendChild(card);

            });

        })


        .catch(error => {

            console.error(
                "Gallery Error:",
                error
            );


            gallery.innerHTML = `
                <div class="loading">
                    Unable to load gallery
                </div>
            `;

        });

}


// =======================================
// GOOGLE DRIVE IMAGE LINK CONVERTER
// =======================================

function convertDriveLink(url) {

    if (!url) {

        console.warn(
            "Empty image URL"
        );

        return "";

    }


    url = String(url).trim();


    // =======================================
    // ALREADY CONVERTED URL
    // =======================================

    if (
        url.includes(
            "drive.google.com/uc?export=view"
        )
    ) {

        return url;

    }


    // =======================================
    // GOOGLE DRIVE FILE ID
    // =======================================

    let fileId = "";


    // Example:
    // https://drive.google.com/file/d/FILE_ID/view

    if (url.includes("/d/")) {

        fileId =
            url
                .split("/d/")[1]
                .split("/")[0];

    }


    // Example:
    // https://drive.google.com/open?id=FILE_ID

    else if (url.includes("id=")) {

        fileId =
            url
                .split("id=")[1]
                .split("&")[0];

    }


    // =======================================
    // CREATE DIRECT IMAGE URL
    // =======================================

    if (fileId) {

        return "https://drive.google.com/uc?export=view&id=" + fileId;

    }


    // =======================================
    // IF NOT GOOGLE DRIVE
    // RETURN ORIGINAL URL
    // =======================================

    return url;

}


// =======================================
// IMAGE POPUP
// =======================================

function openImage(src) {

    if (!src) {

        console.error(
            "No image source available"
        );

        return;

    }


    const popup =
        document.createElement("div");


    popup.style.position =
        "fixed";

    popup.style.top =
        "0";

    popup.style.left =
        "0";

    popup.style.width =
        "100%";

    popup.style.height =
        "100%";

    popup.style.background =
        "rgba(0,0,0,0.85)";

    popup.style.display =
        "flex";

    popup.style.alignItems =
        "center";

    popup.style.justifyContent =
        "center";

    popup.style.zIndex =
        "9999";


    popup.innerHTML = `

        <img
            src="${src}"
            style="
                max-width:90%;
                max-height:90%;
                border-radius:20px;
                box-shadow:0 0 40px #000;
            "
        >

    `;


    popup.onclick = function () {

        popup.remove();

    };


    document.body.appendChild(popup);

}
