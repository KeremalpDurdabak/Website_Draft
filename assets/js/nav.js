 document.addEventListener('DOMContentLoaded', () => {
   const hamburger = document.getElementById('hamburger');
   const nav = document.getElementById('main-nav');
   if (!hamburger || !nav) return;

   hamburger.addEventListener('click', () => {
     hamburger.classList.toggle('open');
     nav.classList.toggle('open');
   });

   nav.querySelectorAll('a').forEach(link => {
     link.addEventListener('click', () => {
       hamburger.classList.remove('open');
       nav.classList.remove('open');
     });
   });
 });
