 let currentSlide = 0;
    const slides = document.querySelectorAll('.slider-image');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(index) { 
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }

    function goToSlide(index) {
      currentSlide = index;
      showSlide(currentSlide);
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Pause auto-advance on hover
    const slider = document.querySelector('.image-slider');
    let autoSlideInterval;

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Initialize auto-slide
    startAutoSlide();

function scrollToSection(sectionId, event) {
  event.preventDefault();
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Scroll to top (brand name click)
function scrollToTop() {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  });
}

function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');

   if (navMenu.classList.contains('active')) {
    hamburger.innerHTML = '✕';
  } else {
    hamburger.innerHTML = '☰';
  }
};

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-menu').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');

     document.getElementById('hamburger').innerHTML = '☰';
  });

});
window.addEventListener('click', (e) => {
  const navMenu = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');

  if (navMenu.classList.contains('active') &&
    !navMenu.contains(e.target) &&
    !hamburger.contains(e.target)
    ) {navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.innerHTML = '☰'
     };

});

