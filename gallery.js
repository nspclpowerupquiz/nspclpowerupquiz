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
// FIXED GALLERY IMAGE → TITLE MAPPING
// API DOES NOT NEED TO BE CHANGED
// =======================================

const GALLERY_TITLES = {

    "gallery1.jpg": "Vendor Meet",

    "gallery2.jpg": "C&M Initiatives",

    "gallery3.jpg": "Monthly Reward Session",

    "gallery4.jpg": "Training Program",

    "gallery5.jpg": "Reward to Support Staff",

    "gallery6.jpg": "Team Collaboration",

    "gallery7.jpg": "Welcome & Farewell",

    "gallery8.jpg": "Reward to Support Staff",

    "gallery9.jpg": "Retirement Celebration",

    "gallery10.jpg": "Materials Management",

    "gallery11.jpg": "Vendor Management",

    "gallery12.jpg": "Professional Meet"

};


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
// GET FILE NAME FROM IMAGE URL
// =======================================

function getImageFileName(url) {

    if (!url) {

        return "";

    }


    url = String(url).trim();


    // Remove query parameters

    const cleanURL =
        url.split("?")[0];


    // Get last part of URL

    const parts =
        cleanURL.split("/");


    let fileName =
        parts[parts.length - 1];


    // Decode URL if required

    try {

        fileName =
            decodeURIComponent(fileName);

    }

    catch (error) {

        console.warn(
            "Could not decode filename:",
            fileName
        );

    }


    return fileName.toLowerCase().trim();

}


// =======================================
// GET FIXED GALLERY TITLE
// =======================================

function getGalleryTitle(imageURL, fallbackTitle, index) {

    const fileName =
        getImageFileName(imageURL);


    // =======================================
    // DIRECT FILE NAME MATCH
    // =======================================

    if (
        GALLERY_TITLES[fileName]
    ) {

        return GALLERY_TITLES[fileName];

    }


    // =======================================
    // HANDLE GOOGLE DRIVE URLs
    // =======================================

    const galleryNumberMatch =
        imageURL.match(
            /gallery\s*([0-9]+)/i
        );


    if (
        galleryNumberMatch
    ) {

        const galleryNumber =
            galleryNumberMatch[1];


        const mappedFile =
            "gallery" +
            galleryNumber +
            ".jpg";


        if (
            GALLERY_TITLES[mappedFile]
        ) {

            return GALLERY_TITLES[mappedFile];

        }

    }


    // =======================================
    // FALLBACK
    // =======================================

    if (
        fallbackTitle &&
        String(fallbackTitle).trim() !== ""
    ) {

        return String(
            fallbackTitle
        ).trim();

    }


    return (
        "NSPCL Power-Up Quiz"
    );

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
    // GET CORRECT FIXED TITLE
    // =======================================

    const displayTitle =
        getGalleryTitle(
            imageURL,
            item.title,
            index
        );


    console.log(
        "Gallery:",
        imageURL,
        "→",
        displayTitle
    );


    // =======================================
    // IMAGE
    // =======================================

    const img =
        document.createElement("img");


    img.src =
        imageURL;


    img.alt =
        displayTitle;


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

                openImage(
                    imageURL,
                    displayTitle
                );

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
        displayTitle;


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


    if (
        info.children.length > 0
    ) {

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

function openImage(
    src,
    titleText
) {

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
        titleText ||
        "NSPCL Gallery Image";


    // =======================================
    // TITLE IN POPUP
    // =======================================

    const popupTitle =
        document.createElement("div");


    popupTitle.className =
        "gallery-popup-title";


    popupTitle.textContent =
        titleText ||
        "NSPCL Power-Up Quiz";


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


    popup.appendChild(
        image
    );


    popup.appendChild(
        popupTitle
    );


    popup.appendChild(
        close
    );


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
