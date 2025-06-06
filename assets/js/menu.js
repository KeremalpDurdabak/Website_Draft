document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggleBtn || !nav) return;

  const toggleMenu = () => {
    nav.classList.toggle('open');
    toggleBtn.classList.toggle('open');
  };

  toggleBtn.addEventListener('click', toggleMenu);

  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) toggleMenu();
    })
  );

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        e.target !== toggleBtn &&
        !toggleBtn.contains(e.target)) {
      toggleMenu();
    }
  });
});
