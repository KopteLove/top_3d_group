const btnMenu = document.querySelector('.header__menu-btn');
const header = document.querySelector('.header');

btnMenu.addEventListener('click', ()=> {
    header.classList.toggle('open');
})