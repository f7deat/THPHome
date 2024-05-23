var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

const init = () => {
    initPopUp();
}

const initPopUp = () => {
    const element = document.getElementById('popupModal');
    if (element) {
        new bootstrap.Modal('#popupModal', {}).show();
    }
}

init();