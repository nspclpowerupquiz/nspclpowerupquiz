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
// FIXED GALLERY TITLES
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
// ORDER-BASED TITLES
// USED WHEN GOOGLE DRIVE HIDES FILE NAME
// =======================================

const GALLERY_TITLES_BY_ORDER = [

    "Vendor Meet",

    "C&M Initiatives",

    "Monthly Reward Session",

    "Training Program",

    "Reward to Support Staff",

    "Team Collaboration",

    "Welcome & Farewell",

    "Reward to Support Staff",

    "Retirement Celebration",

    "Materials Management",

    "Vendor Management",

    "Professional Meet"

];


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
            "======================================="
        );

        console.log(
            "NSPCL GALLERY API RESPONSE"
        );

        console.log(
            data
        );

        console.log(
            "======================================="
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


                return (
                    image !== "" ||
                    title !== ""
                );

            });


        console.log(
            "VALID GALLERY RECORDS:",
            validData
        );


        // =======================================
        // NO RECORDS
        // =======================================

        if (
            validData.length === 0
        ) {

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

        validData.forEach(
            function (item, index) {

                createGalleryCard(
                    gallery,
                    item,
                    index
                );

            }
        );

    })


    .catch(function (error) {

        console.error(
            "Gallery Error:",
            error
        );


        gallery.innerHTML = `
            <div class="loading">
                ⚠️ Unable to load gallery
                <br>
                <small>
                    Please refresh the page and try again.
                </small>
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
                Gallery images could not be loaded.
            </small>

        </div>

    `;

}


// =======================================
// EXTRACT FILE NAME
// =======================================

function getImageFileName(url) {

    if (!url) {

        return "";

    }


    let cleanURL =
        String(url).trim();


    // Remove query parameters

    cleanURL =
        cleanURL.split("?")[0];


    // Remove hash

    cleanURL =
        cleanURL.split("#")[0];


    // Get final part

    const parts =
        cleanURL.split("/");


    let fileName =
        parts[parts.length - 1];


    try {

        fileName =
            decodeURIComponent(
                fileName
            );

    }

    catch (error) {

        console.warn(
            "Filename decoding failed:",
            fileName
        );

    }


    return fileName
        .toLowerCase()
        .trim();

}


// =======================================
// FIND GALLERY NUMBER FROM URL
// =======================================

function getGalleryNumber(url) {

    if (!url) {

        return null;

    }


    const text =
        String(url);


    // gallery1.jpg
    // gallery01.jpg
    // gallery 1.jpg
    // gallery-1.jpg

    const match =
        text.match(
            /gallery[\s_-]*0*(\d+)/i
        );


    if (match) {

        return parseInt(
            match[1],
            10
        );

    }


    return null;

}


// =======================================
// GET TITLE
// =======================================

function getGalleryTitle(
    originalURL,
    fallbackTitle,
    index
) {


    // =======================================
    // METHOD 1
    // TRY ACTUAL FILE NAME
    // =======================================

    const fileName =
        getImageFileName(
            originalURL
        );


    if (
        GALLERY_TITLES[fileName]
    ) {

        return GALLERY_TITLES[fileName];

    }


    // =======================================
    // METHOD 2
    // TRY GALLERY NUMBER
    // =======================================

    const galleryNumber =
        getGalleryNumber(
            originalURL
        );


    if (
        galleryNumber &&
        GALLERY_TITLES[
            "gallery" +
            galleryNumber +
            ".jpg"
        ]
    ) {

        return GALLERY_TITLES[
            "gallery" +
            galleryNumber +
            ".jpg"
        ];

    }


    // =======================================
    // METHOD 3
    // USE API DATA IF IT CLEARLY HAS A TITLE
    // =======================================

    if (
        fallbackTitle &&
        String(fallbackTitle).trim() !== ""
    ) {

        return String(
            fallbackTitle
        ).trim();

    }


    // =======================================
    // METHOD 4
    // USE API ORDER
    // =======================================

    if (
        GALLERY_TITLES_BY_ORDER[index]
    ) {

        return GALLERY_TITLES_BY_ORDER[index];

    }


    // =======================================
    // FINAL FALLBACK
    // =======================================

    return "NSPCL Power-Up Quiz";

}


// =======================================
// CREATE GALLERY CARD
// =======================================

function createGalleryCard(
    gallery,
    item,
    index
) {


    // =======================================
    // CARD
    // =======================================

    const card =
        document.createElement("div");


    card.className =
        "gallery-card";


    // =======================================
    // ORIGINAL IMAGE URL
    // =======================================

    const originalImageURL =
        item.image
        ? String(item.image).trim()
        : "";


    // =======================================
    // CONVERT DRIVE URL
    // =======================================

    const imageURL =
        convertDriveLink(
            originalImageURL
        );


    // =======================================
    // TITLE
    // =======================================

    const displayTitle =
        getGalleryTitle(
            originalImageURL,
            item.title,
            index
        );


    // =======================================
    // DEBUG INFORMATION
    // =======================================

    console.log(
        "Gallery #" +
        (index + 1) +
        ":",
        {
            originalURL:
                originalImageURL,

            convertedURL:
                imageURL,

            apiTitle:
                item.title,

            displayTitle:
                displayTitle
        }
    );


    // =======================================
    // IMAGE
    // =======================================

    if (imageURL) {

        const img =
            document.createElement("img");


        img.src =
            imageURL;


        img.alt =
            displayTitle;


        img.loading =
            "lazy";


        img.decoding =
            "async";


        img.className =
            "gallery-image";


        // =======================================
        // IMAGE ERROR
        // =======================================

        img.onerror =
            function () {

                console.error(
                    "Image failed to load:",
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

                openImage(
                    imageURL,
                    displayTitle
                );

            }
        );


        card.appendChild(
            img
        );

    }


    // =======================================
    // TITLE
    // =======================================

    const title =
        document.createElement("div");


    title.className =
        "gallery-title";


    title.textContent =
        displayTitle;


    card.appendChild(
        title
    );


    // =======================================
    // OPTIONAL EMPLOYEE INFORMATION
    // =======================================

    if (
        item.employeeName
    ) {

        const info =
            document.createElement("div");


        info.className =
            "gallery-info";


        const name =
            document.createElement("div");


        name.textContent =
            item.employeeName;


        info.appendChild(
            name
        );


        card.appendChild(
            info
        );

    }


    // =======================================
    // ADD CARD
    // =======================================

    gallery.appendChild(
        card
    );

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
    // DIRECT DRIVE UC URL
    // =======================================

    if (
        url.includes(
            "drive.google.com/uc"
        )
    ) {

        return url;

    }


    // =======================================
    // DRIVE /d/FILE_ID/view
    // =======================================

    if (
        url.includes("/d/")
    ) {

        const parts =
            url.split("/d/");


        if (
            parts.length > 1
        ) {

            const fileId =
                parts[1]
                    .split("/")[0]
                    .split("?")[0];


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
    // DRIVE OPEN?ID=FILE_ID
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
    // POPUP TITLE
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


    close.setAttribute(
        "aria-label",
        "Close image"
    );


    // =======================================
    // CLOSE BUTTON
    // =======================================

    close.onclick =
        function (event) {

            event.stopPropagation();

            popup.remove();

        };


    // =======================================
    // ADD POPUP ELEMENTS
    // =======================================

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


    // =======================================
    // ADD TO PAGE
    // =======================================

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
