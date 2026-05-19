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