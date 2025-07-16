const slides = document.querySelectorAll('.slide');
let current = 0;

setInterval(() => {
  slides[current].classList.remove('slide-active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('slide-active');
}, 4000);