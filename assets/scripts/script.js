// header hide
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
});

// header mobile-menu
const toggle = document.querySelector('.header-wrapper__mobile-toggle');
const menu = document.querySelector('.header-wrapper__mobile-menu');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// footer-year
document.getElementById("year").textContent = new Date().getFullYear();

//accordion
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    const button = item.querySelector('.accordion-header');
    button.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// floors section
import { floors } from './floors-data.js';

const image = document.getElementById("floorImage");
const imagemobile = document.getElementById("floorImageMobile");
const title = document.getElementById("floorTitle");
const description = document.getElementById("floorDescription");
const roomsList = document.getElementById("roomsList");

const buttons = document.querySelectorAll(".buttons button");

function setActiveButton(index) {
    buttons.forEach(btn => btn.classList.remove("active-button"));
    buttons[index].classList.add("active-button");
}

function renderFloor(index) {
    const current = floors[index];

    image.src = current.image;
    imagemobile.src = current.image;
    title.textContent = current.title;
    description.textContent = current.description;

    roomsList.innerHTML = current.rooms
        .map(room => `
            <div class="room">
                <span class="room-number">${room.number}</span>
                <p class="room-name">${room.name}</p>
            </div>
        `)
        .join("");

    setActiveButton(index);
}

// buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const index = Number(button.dataset.id);
        renderFloor(index);
    });
});

// init
renderFloor(0);

//faq-accordion
import { faqData } from './faq-data.js';

const container = document.getElementById("faq");

faqData.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "faq-accordion-item";

    wrapper.innerHTML = `
    <h6 class="faq-accordion-item__heading">
      ${item.title}
    </h6>
    <p class="faq-accordion-item__content">
      ${item.content}
    </p>
  `;

    if (index === 0) {
        wrapper.classList.add("is-open");
    }

    wrapper.addEventListener("click", () => {
        wrapper.classList.toggle("is-open");
    });

    container.appendChild(wrapper);
});

// form submit
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: data
    })
        .then(res => res.text())
        .then(response => {
            if (response.includes("Success")) {
                form.style.display = "none";
                document.getElementById("successMessage").style.display = "block";
            } else {
                alert("Error sending form");
            }
        })
        .catch(() => {
            alert("Server error");
        });
});