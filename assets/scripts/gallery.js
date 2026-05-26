const galleries = {
    office: [
        "assets/images/gallery-images/1.1.png",
        "assets/images/gallery-images/1.2.png",
        "assets/images/gallery-images/1.3.png",
        "assets/images/gallery-images/1.4.png",
        "assets/images/gallery-images/1.5.png",
        "assets/images/gallery-images/1.6.png",
        "assets/images/gallery-images/1.7.png",
        "assets/images/gallery-images/1.8.png",
    ],

    coworking: [
        "assets/images/gallery-images/c1.png",
        "assets/images/gallery-images/c2.png",
        "assets/images/gallery-images/c3.png",
        "assets/images/gallery-images/c4.png",
        "assets/images/gallery-images/c5.png",
        "assets/images/gallery-images/c6.png",
        "assets/images/gallery-images/c7.png",
        "assets/images/gallery-images/c8.png",
    ],

    conference: [
        "assets/images/gallery-images/B-D.png",
        "assets/images/gallery-images/dB-B.png",
        "assets/images/gallery-images/dB-K.png",
        "assets/images/gallery-images/dB-Z.png",
        "assets/images/gallery-images/E-1.png",
        "assets/images/gallery-images/E-2.png",
        "assets/images/gallery-images/E-3.png",
        "assets/images/gallery-images/Z.png",
    ]
};

const popup = document.getElementById("galleryPopup");
const mainImage = document.getElementById("mainImage");
const thumbnails = document.getElementById("thumbnails");

const openButtons = document.querySelectorAll(".open-gallery");
const tabButtons = document.querySelectorAll(".tab-btn");

let currentGallery = "office";
let currentIndex = 0;

/* OPEN */

openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentGallery = btn.dataset.gallery;
        currentIndex = 0;

        openPopup();
    });
});

function openPopup() {
    popup.classList.add("active");

    document.body.classList.add("no-scroll");

    updateTabs();
    renderGallery();
}

/* CLOSE */

function closePopup() {
    popup.classList.remove("active");

    document.body.classList.remove("no-scroll");
}

document.querySelector(".close-btn")
    .addEventListener("click", closePopup);

popup.addEventListener("click", (e) => {
    if(e.target === popup) {
        closePopup();
    }
});

/* TABS */

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentGallery = btn.dataset.gallery;
        currentIndex = 0;

        updateTabs();
        renderGallery();
    });
});

function updateTabs() {
    tabButtons.forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.gallery === currentGallery
        );
    });
}

/* RENDER */

function renderGallery() {

    const images = galleries[currentGallery];

    mainImage.src = images[currentIndex];

    thumbnails.innerHTML = "";

    images.forEach((img, index) => {

        const div = document.createElement("div");
        div.className = "thumbnail";

        if(index === currentIndex) {
            div.classList.add("active");
        }

        div.innerHTML = `
      <img src="${img}" alt="">
    `;

        div.addEventListener("click", () => {
            currentIndex = index;
            renderGallery();
        });

        thumbnails.appendChild(div);

    });
}

/* NEXT PREV */

document.querySelector(".next")
    .addEventListener("click", () => {

        const images = galleries[currentGallery];

        currentIndex++;

        if(currentIndex >= images.length) {
            currentIndex = 0;
        }

        renderGallery();
    });

document.querySelector(".prev")
    .addEventListener("click", () => {

        const images = galleries[currentGallery];

        currentIndex--;

        if(currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        renderGallery();
    });

/* CLOSE BY BACKDROP */

popup.addEventListener("click", (e) => {
    if(e.target === popup) {
        popup.classList.remove("active");
    }
});