const galleries = {
    office: [
        "https://picsum.photos/id/1011/1200/800",
        "https://picsum.photos/id/1015/1200/800",
        "https://picsum.photos/id/1016/1200/800",
        "https://picsum.photos/id/1020/1200/800",
        "https://picsum.photos/id/1024/1200/800",
    ],

    coworking: [
        "https://picsum.photos/id/1035/1200/800",
        "https://picsum.photos/id/1037/1200/800",
        "https://picsum.photos/id/1040/1200/800",
        "https://picsum.photos/id/1041/1200/800",
    ],

    conference: [
        "https://picsum.photos/id/1050/1200/800",
        "https://picsum.photos/id/1052/1200/800",
        "https://picsum.photos/id/1060/1200/800",
        "https://picsum.photos/id/1068/1200/800",
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

    updateTabs();
    renderGallery();
}

/* CLOSE */

document.querySelector(".close-btn")
    .addEventListener("click", () => {
        popup.classList.remove("active");
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