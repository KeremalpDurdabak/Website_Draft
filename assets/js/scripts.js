document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    let currentIndex = 0;

    function moveToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        moveToSlide(currentIndex);
    }, 3000);
});
