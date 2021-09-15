var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function playVideo(videoId) {
    let frame = document.getElementById('frame-play');
    frame.src = 'https://www.youtube.com/embed/' + videoId;
}

AOS.init({
    duration: 2000
});