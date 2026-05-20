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