// =======================================
// NSPCL POWER-UP QUIZ
// GALLERY — MAIN QUIZ RESPONSES ONLY
// =======================================


// =======================================
// GOOGLE APPS SCRIPT WEB APP URL
// =======================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbziOrV0Tit-jAwCXLZTLJovnnpIh1zTLpZVOOmhtjXyigCj6uxFxY-UYfK6_gn1xXW-yA/exec";


// =======================================
// LOAD GALLERY
// =======================================

window.addEventListener("DOMContentLoaded", function () {

    loadGallery();

});


// =======================================
// LOAD GALLERY DATA
// =======================================

function loadGallery() {

    const gallery =
        document.getElementById("galleryContainer");


    if (!gallery) {

        console.error(
            "galleryContainer not found."
        );

        return;

    }


    gallery.innerHTML = `
        <div class="loading">
            ⚡ Loading Gallery...
        </div>
    `;


    fetch(
        SCRIPT_URL + "?action=gallery"
    )

    .then(function (response) {

        if (!response.ok) {

            throw new Error(
                "HTTP Error: " + response.status
            );

        }

        return response.json();

    })


    .then(function (data) {

        console.log(
            "MAIN QUIZ GALLERY DATA:",
            data
        );


        // =======================================
        // CHECK RESPONSE
        // =======================================

        if (!Array.isArray(data)) {

            console.error(
                "Gallery response is not an array:",
                data
            );

            showNoGallery(gallery);

            return;

        }


        // =======================================
        // REMOVE COMPLETELY BLANK RECORDS
        // =======================================

        const validData =
            data.filter(function (item) {

                if (!item) {
                    return false;
                }


                const image =
                    item.image
                    ? String(item.image).trim()
                    : "";


                const title =
                    item.title
                    ? String(item.title).trim()
                    : "";


                return image !== "" || title !== "";

            });


        console.log(
            "VALID MAIN QUIZ GALLERY RECORDS:",
            validData
        );


        // =======================================
        // NO RECORDS
        // =======================================

        if (validData.length === 0) {

            showNoGallery(gallery);

            return;

        }


        // =======================================
        // CLEAR GALLERY
        // =======================================

        gallery.innerHTML = "";


        // =======================================
        // CREATE CARDS
        // =======================================

        validData.forEach(function (item, index) {

            createGalleryCard(
                gallery,
                item,
                index
            );

        });

    })


    .catch(function (error) {

        console.error(
            "Gallery Error:",
            error
        );


        gallery.innerHTML = `
            <div class="loading">
                ⚠️ Unable to load gallery
            </div>
        `;

    });

}



// =======================================
// SHOW EMPTY GALLERY
// =======================================

function showNoGallery(gallery) {

    gallery.innerHTML = `

        <div class="loading">

            📸 No Gallery Images Available

            <br>

            <small>
                Complete the NSPCL Power-Up Quiz
                to appear here.
            </small>

        </div>

    `;

}



// =======================================
// CREATE GALLERY CARD
// =======================================

function createGalleryCard(
    gallery,
    item,
    index
) {


    const card =
        document.createElement("div");


    card.className =
        "gallery-card";


    // =======================================
    // IMAGE URL
    // =======================================

    const imageURL =
        convertDriveLink(item.image);


    // =======================================
    // IMAGE
    // =======================================

    const img =
        document.createElement("img");


    img.src =
        imageURL;


    img.alt =
        item.title ||
        "NSPCL Power-Up Quiz";


    img.loading =
        "lazy";


    // =======================================
    // IMAGE ERROR
    // =======================================

    img.onerror =
        function () {

            console.error(
                "Image failed:",
                imageURL
            );


            this.style.display =
                "none";


            const errorBox =
                document.createElement("div");


            errorBox.className =
                "gallery-image-error";


            errorBox.innerHTML = `
                ⚠️ Image unavailable
            `;


            card.insertBefore(
                errorBox,
                card.firstChild
            );

        };


    // =======================================
    // OPEN IMAGE
    // =======================================

    img.addEventListener(
        "click",
        function () {

            if (imageURL) {

                openImage(imageURL);

            }

        }
    );


    // =======================================
    // TITLE
    // =======================================

    const title =
        document.createElement("div");


    title.className =
        "gallery-title";


    title.textContent =
        item.title ||
        "NSPCL Power-Up Quiz";


    // =======================================
    // OPTIONAL EMPLOYEE INFORMATION
    // =======================================

    const info =
        document.createElement("div");


    info.className =
        "gallery-info";


    if (item.employeeName) {

        const name =
            document.createElement("div");


        name.textContent =
            item.employeeName;


        info.appendChild(name);

    }


    // =======================================
    // ADD ELEMENTS
    // =======================================

    if (imageURL) {

        card.appendChild(img);

    }


    card.appendChild(title);


    if (info.children.length > 0) {

        card.appendChild(info);

    }


    gallery.appendChild(card);

}



// =======================================
// GOOGLE DRIVE LINK CONVERTER
// =======================================

function convertDriveLink(url) {

    if (!url) {

        return "";

    }


    url =
        String(url).trim();


    // =======================================
    // DIRECT DRIVE URL
    // =======================================

    if (
        url.includes(
            "drive.google.com/uc"
        )
    ) {

        return url;

    }


    // =======================================
    // FILE /d/FILE_ID/view
    // =======================================

    if (
        url.includes("/d/")
    ) {

        const parts =
            url.split("/d/");


        if (parts.length > 1) {

            const fileId =
                parts[1]
                    .split("/")[0];


            if (fileId) {

                return (
                    "https://drive.google.com/uc" +
                    "?export=view&id=" +
                    fileId
                );

            }

        }

    }


    // =======================================
    // OPEN?ID=FILE_ID
    // =======================================

    if (
        url.includes("id=")
    ) {

        const fileId =
            url
                .split("id=")[1]
                .split("&")[0];


        if (fileId) {

            return (
                "https://drive.google.com/uc" +
                "?export=view&id=" +
                fileId
            );

        }

    }


    // =======================================
    // GOOGLE DRIVE THUMBNAIL
    // =======================================

    if (
        url.includes(
            "drive.google.com"
        )
    ) {

        const match =
            url.match(
                /[-\w]{25,}/
            );


        if (match) {

            return (
                "https://drive.google.com/thumbnail" +
                "?id=" +
                match[0] +
                "&sz=w1200"
            );

        }

    }


    // =======================================
    // NORMAL IMAGE URL
    // =======================================

    return url;

}



// =======================================
// IMAGE POPUP
// =======================================

function openImage(src) {

    if (!src) {

        return;

    }


    // =======================================
    // POPUP
    // =======================================

    const popup =
        document.createElement("div");


    popup.className =
        "gallery-popup";


    // =======================================
    // IMAGE
    // =======================================

    const image =
        document.createElement("img");


    image.src =
        src;


    image.alt =
        "NSPCL Gallery Image";


    // =======================================
    // CLOSE BUTTON
    // =======================================

    const close =
        document.createElement("button");


    close.className =
        "gallery-popup-close";


    close.innerHTML =
        "✕";


    // =======================================
    // CLOSE
    // =======================================

    close.onclick =
        function (event) {

            event.stopPropagation();

            popup.remove();

        };


    popup.appendChild(image);

    popup.appendChild(close);


    // =======================================
    // CLICK BACKGROUND TO CLOSE
    // =======================================

    popup.onclick =
        function (event) {

            if (
                event.target === popup
            ) {

                popup.remove();

            }

        };


    document.body.appendChild(
        popup
    );

}



// =======================================
// ESC KEY CLOSE
// =======================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            const popup =
                document.querySelector(
                    ".gallery-popup"
                );


            if (popup) {

                popup.remove();

            }

        }

    }
);
