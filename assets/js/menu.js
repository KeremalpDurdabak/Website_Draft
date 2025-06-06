document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (!burger || !nav) return;

  const toggleMenu = () => {
    nav.classList.toggle('open');
    burger.classList.toggle('open');
  };

  burger.addEventListener('click', toggleMenu);

  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) toggleMenu();
    })
  );

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== burger) {
      toggleMenu();
    }
  });
});
