function toggleSearch() {
    document.getElementById('search-button').classList.toggle('hidden');
    document.getElementById('search-form').classList.toggle('hidden');
}
window.onscroll = function () { scrollFunction(); };
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementsByTagName('nav')[0].classList.add('fixed');
    }
    else {
        document.getElementsByTagName('nav')[0].classList.remove('fixed');
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function toggleDarkMode() {
    let html = document.getElementsByTagName('html')[0];
    if (html.getAttribute('theme')) {
        html.removeAttribute('theme');
    }
    else {
        html.setAttribute('theme', 'dark-mode');
    }
}
function toggleDropdown(element) {
    element.parentElement.lastElementChild.classList.toggle('hidden')
}

// Constant
var CAROUSEL_INTERVAL = 5000;

// Selector
var DROPDOWN_SELECTOR_DATA_TOGGLE = '[data-toggle="dropdown"]';
var MODAL_SELECTOR_DATA_TOGGLE = '[data-toggle="modal"]';
var CAROUSEL_SELECTOR_DATA_RIDE = '[data-ride="carousel"]';

// Dropdown
var dropdown = document.querySelectorAll(DROPDOWN_SELECTOR_DATA_TOGGLE);

dropdown.forEach((value) => {
    value.addEventListener('click', () => {
        value.parentElement.lastElementChild.classList.toggle('hidden')
    })
})

// Modal
var modal = document.querySelectorAll(MODAL_SELECTOR_DATA_TOGGLE);
modal.forEach(value => {
    value.addEventListener('click', () => {
        document.getElementById(value.getAttribute('data-target')).classList.toggle('hidden');
    })
})

// Carousel
var carousel = document.querySelectorAll(CAROUSEL_SELECTOR_DATA_RIDE);

carousel.forEach(value => {
    value.children[0].classList.remove('hidden');
    let carouselCount = 0;
    let listSlide = value.children;
    let intervalCarousel = setInterval(() => {
        if (listSlide.length > 1) {
            listSlide[carouselCount].classList.add('hidden');
            listSlide[carouselCount + 1].classList.remove('hidden');
            carouselCount++;
            if (carouselCount === value.children.length - 1) {
                listSlide[carouselCount].classList.add('hidden');
                carouselCount = 0;
                listSlide[carouselCount].classList.remove('hidden');
            }
        } else {
            clearInterval(intervalCarousel);
        }
    }, CAROUSEL_INTERVAL);
})

// Global Event
window.onmousedown = (e) => {
    if (dropdown.length > 0) {
        dropdown.forEach(value => {
            if (!value.parentElement.lastElementChild.classList.contains('hidden')) {
                setTimeout(() => {
                    value.parentElement.lastElementChild.classList.add('hidden');
                }, 200)
            }
        })
    }
}

// Custom Event
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('-translate-x-full');
}

// Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})