// =====================================
// NSPCL POWER-UP QUIZ GALLERY
// Automatic Image Slider
// =====================================

const galleryImages = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg"
];

let currentImage = 0;

function changeGalleryImage() {

    const img = document.getElementById("galleryImage");

    if (!img) {
        console.log("Gallery image element not found");
        return;
    }

    currentImage++;

    if (currentImage >= galleryImages.length) {
        currentImage = 0;
    }

    img.style.opacity = 0;

    setTimeout(() => {

        img.src = galleryImages[currentImage];

        img.style.opacity = 1;

    }, 500);

}


// Change image every 3 seconds
setInterval(changeGalleryImage, 3000);


// First image load
window.onload = function(){

    const img = document.getElementById("galleryImage");

    if(img){
        img.src = galleryImages[0];
    }

};
