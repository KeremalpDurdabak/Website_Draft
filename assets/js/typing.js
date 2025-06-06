function typeWrite(selector, speed = 40) {
  document.querySelectorAll(selector).forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  typeWrite('.about-typing p');
});
