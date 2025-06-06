function typeWriteSequential(elements, speed = 40) {
  let index = 0;
  function typeNext() {
    if (index >= elements.length) return;
    const el = elements[index];
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        index++;
        typeNext();
      }
    }, speed);
  }
  typeNext();
}

document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('.about-typing');
  if (aboutSection) {
    const items = aboutSection.querySelectorAll('h2, p');
    typeWriteSequential(items);
  }
});
