
 /*  SPLASH SCREEN Hide the splash screen after page loads */
  const splashScreen = document.getElementById('splashScreen');

  window.addEventListener('load', function() {
    // Wait 2.2 seconds then fade out the splash screen
    setTimeout(function() {
      splashScreen.classList.add('hidden');
    }, 2200);
  });


  /* SMOOTH SCROLL — scrollToSection() Scrolls the page to any section by its ID. */
  function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      // Get how far the section is from the top, minus nav height (76px)
      const distanceFromTop = targetSection.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: distanceFromTop, behavior: 'smooth' });
    }

    // Update the active highlight on the nav links
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(function(link) {
      const isCurrentSection = link.getAttribute('href') === '#' + sectionId;
      link.classList.toggle('active', isCurrentSection);
    });

    return false; // Prevents the browser from jumping to the anchor instantly
  }

  function closeMobileNav(sectionId) {
    // Scroll to the section
    scrollToSection(sectionId);
    // Close the mobile menu
    document.getElementById('mobileNavMenu').classList.remove('open');
    document.getElementById('hamburgerBtn').classList.remove('open');
    return false;
  }


  /* ACTIVE NAV HIGHLIGHT ON SCROLL
     Watches each section and highlights
     the matching nav link when it enters view */
  const sectionIds = ['home', 'about', 'services', 'process', 'portfolio', 'contact'];

  sectionIds.forEach(function(sectionId) {
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement) {
      const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            // Highlight the nav link that matches this section
            const allNavLinks = document.querySelectorAll('.nav-links a');
            allNavLinks.forEach(function(link) {
              link.classList.toggle('active', link.getAttribute('href') === '#' + sectionId);
            });
          }
        });
      }, { threshold: 0.25 });

      sectionObserver.observe(sectionElement);
    }
  });


  /*  NAV SHADOW ON SCROLL
     Adds a shadow to the navbar when user
     scrolls down past 60px */
  const mainNavbar = document.getElementById('mainNav');

  window.addEventListener('scroll', function() {
    const userHasScrolled = window.scrollY > 60;
    mainNavbar.classList.toggle('scrolled', userHasScrolled);
  }, { passive: true });


  /* SCROLL PROGRESS BAR
     Fills the thin bar at the top as the
     user scrolls down the page */
  const progressBar = document.getElementById('scrollProgressBar');

  window.addEventListener('scroll', function() {
    const totalScrollableHeight = document.body.scrollHeight - window.innerHeight;
    const howFarUserHasScrolled = window.scrollY;
    const percentageScrolled = (howFarUserHasScrolled / totalScrollableHeight) * 100;
    progressBar.style.width = percentageScrolled + '%';
  }, { passive: true });


  /* BACK TO TOP BUTTON
     Shows/hides the ↑ button based on
     how far the user has scrolled*/
  const backToTopButton = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', function() {
    const userScrolledFarEnough = window.scrollY > 500;
    backToTopButton.classList.toggle('visible', userScrolledFarEnough);
  }, { passive: true });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ==========================================
     HAMBURGER MENU (MOBILE)
     Opens and closes the mobile nav menu
     ========================================== */
  const hamburgerButton  = document.getElementById('hamburgerBtn');
  const mobileNavMenu    = document.getElementById('mobileNavMenu');

  hamburgerButton.addEventListener('click', function() {
    hamburgerButton.classList.toggle('open');
    mobileNavMenu.classList.toggle('open');
  });


  /* ==========================================
     DARK / LIGHT THEME TOGGLE
     Saves the user's preference to localStorage
     so it persists when they revisit the page
     ========================================== */
  const htmlElement      = document.documentElement;
  const themeToggleThumb = document.getElementById('themeToggleThumb');
  const savedTheme       = localStorage.getItem('cg-theme');

  // Apply saved theme on page load
  if (savedTheme === 'light') {
    htmlElement.setAttribute('data-theme', 'light');
    themeToggleThumb.textContent = '☀️';
  }

  document.getElementById('themeToggleBtn').addEventListener('click', function() {
    const currentTheme  = htmlElement.getAttribute('data-theme');
    const isCurrentlyLight = currentTheme === 'light';

    // Switch to the opposite theme
    const newTheme = isCurrentlyLight ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    themeToggleThumb.textContent = isCurrentlyLight ? '🌙' : '☀️';
    localStorage.setItem('cg-theme', newTheme);
  });


  /* TYPING ANIMATION */
  const typingWords         = ['forward-thinking', 'bold & creative', 'globally-recognized', 'results-driven'];
  let   currentWordIndex    = 0;  // which word we're on
  let   currentLetterIndex  = 0;  // how many letters are shown
  let   isDeletingText      = false;

  const typingTextElement   = document.getElementById('typingTextEl');

  function runTypingAnimation() {
    const currentWord = typingWords[currentWordIndex];

    if (!isDeletingText) {
      // Add one letter
      currentLetterIndex++;
      typingTextElement.textContent = currentWord.slice(0, currentLetterIndex);

      if (currentLetterIndex === currentWord.length) {
        // Word is fully typed — pause, then start deleting
        isDeletingText = true;
        setTimeout(runTypingAnimation, 2200);
        return;
      }
    } else {
      // Remove one letter
      currentLetterIndex--;
      typingTextElement.textContent = currentWord.slice(0, currentLetterIndex);

      if (currentLetterIndex === 0) {
        // Word is fully deleted — move to next word
        isDeletingText = false;
        currentWordIndex = (currentWordIndex + 1) % typingWords.length;
        setTimeout(runTypingAnimation, 400);
        return;
      }
    }

    // Deleting is faster (55ms) than typing (90ms)
    const typingSpeed = isDeletingText ? 55 : 90;
    setTimeout(runTypingAnimation, typingSpeed);
  }

  // Wait for splash screen to finish before starting typing
  setTimeout(runTypingAnimation, 2500);


  /* SCROLL REVEAL ANIMATION
     Elements with class "reveal" fade in
     when they enter the viewport*/
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Stop watching once revealed
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Watch all elements that have the "reveal" class
  const elementsToReveal = document.querySelectorAll('.reveal');
  elementsToReveal.forEach(function(element) {
    revealObserver.observe(element);
  });


  /* ANIMATED STAT COUNTERS
     Numbers count up from 0 when the
     stats grid scrolls into view */
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Find all number elements inside this stats grid
        const numberElements = entry.target.querySelectorAll('.stat-number[data-target]');

        numberElements.forEach(function(numberEl) {
          const targetNumber   = parseInt(numberEl.dataset.target);
          const suffix         = numberEl.dataset.suffix || '+';
          let   currentNumber  = 0;
          const incrementStep  = targetNumber / 80; // 80 frames to reach target

          function countUp() {
            currentNumber = Math.min(currentNumber + incrementStep, targetNumber);
            numberEl.textContent = Math.floor(currentNumber) + suffix;

            if (currentNumber < targetNumber) {
              requestAnimationFrame(countUp); // Keep going until we hit the target
            }
          }
          countUp();
        });

        statsObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.3 });

  const statsGrids = document.querySelectorAll('.stats-grid');
  statsGrids.forEach(function(grid) {
    statsObserver.observe(grid);
  });


  /* 3D TILT ON PORTFOLIO CARDS
     Cards tilt toward the mouse when hovered */
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  portfolioCards.forEach(function(card) {

    // When mouse moves over the card
    card.addEventListener('mousemove', function(event) {
      const cardBounds = card.getBoundingClientRect();

      // Calculate where the mouse is as a value between -0.5 and 0.5
      const mouseXPercent = (event.clientX - cardBounds.left) / cardBounds.width  - 0.5;
      const mouseYPercent = (event.clientY - cardBounds.top)  / cardBounds.height - 0.5;

      // Convert to tilt angle (max 12 degrees)
      const tiltX = mouseXPercent * 12;  // left/right tilt
      const tiltY = mouseYPercent * 12;  // up/down tilt

      card.style.transform = `perspective(600px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg) scale(1.03)`;
    });

    // When mouse enters — make it snappy
    card.addEventListener('mouseenter', function() {
      card.style.transition = 'transform 0.1s ease';
    });

    // When mouse leaves — smoothly return to flat
    card.addEventListener('mouseleave', function() {
      card.style.transition = 'transform 0.4s ease';
      card.style.transform  = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
  });


  /* PORTFOLIO FILTER BUTTONS
     Show/hide cards based on selected category */
  const filterButtons  = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Remove active class from all buttons, add to clicked one
      filterButtons.forEach(function(btn) { btn.classList.remove('active'); });
      button.classList.add('active');

      const selectedFilter = button.dataset.filter;
      const allCards       = document.querySelectorAll('.portfolio-card');

      allCards.forEach(function(card) {
        const cardCategory = card.dataset.category;
        const shouldShow   = selectedFilter === 'all' || cardCategory === selectedFilter;

        if (shouldShow) {
          card.style.opacity   = '1';
          card.style.transform = 'scale(1)';
          card.style.display   = '';
        } else {
          card.style.opacity   = '0';
          card.style.transform = 'scale(0.95)';
          // Delay hiding so the fade-out animation plays first
          setTimeout(function() { card.style.display = 'none'; }, 310);
        }
      });
    });
  });


  /* TESTIMONIALS CAROUSEL
     Auto-plays and supports manual navigation */
  const testimonialTrack   = document.getElementById('testimonialTrack');
  const testimonialCards   = document.querySelectorAll('.testimonial-card');
  const dotsContainer      = document.getElementById('carouselDots');

  let currentSlideIndex    = 0;
  let autoPlayTimer;

  // Create one dot per testimonial card
  testimonialCards.forEach(function(card, index) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', function() { goToSlide(index); });
    dotsContainer.appendChild(dot);
  });

  function goToSlide(slideIndex) {
    // Wrap around if we go past the first or last slide
    currentSlideIndex = (slideIndex + testimonialCards.length) % testimonialCards.length;

    // Move the track to show the correct slide
    testimonialTrack.style.transform = 'translateX(-' + (currentSlideIndex * 100) + '%)';

    // Update dot highlights
    const allDots = document.querySelectorAll('.carousel-dot');
    allDots.forEach(function(dot, index) {
      dot.classList.toggle('active', index === currentSlideIndex);
    });

    // Reset the auto-play timer whenever user navigates manually
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(function() { goToSlide(currentSlideIndex + 1); }, 5500);
  }

  // Previous / Next buttons
  document.getElementById('prevSlideBtn').addEventListener('click', function() { goToSlide(currentSlideIndex - 1); });
  document.getElementById('nextSlideBtn').addEventListener('click', function() { goToSlide(currentSlideIndex + 1); });

  // Swipe support on touch screens
  let touchStartX = 0;
  testimonialTrack.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  testimonialTrack.addEventListener('touchend', function(e) {
    const swipeDistance = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(swipeDistance) > 50) {
      goToSlide(swipeDistance > 0 ? currentSlideIndex + 1 : currentSlideIndex - 1);
    }
  }, { passive: true });

  // Pause auto-play when hovering
  testimonialTrack.addEventListener('mouseenter', function() { clearInterval(autoPlayTimer); });
  testimonialTrack.addEventListener('mouseleave', function() {
    autoPlayTimer = setInterval(function() { goToSlide(currentSlideIndex + 1); }, 5500);
  });

  // Start auto-play
  autoPlayTimer = setInterval(function() { goToSlide(currentSlideIndex + 1); }, 5500);


  /* FAQ ACCORDION
     Opens and closes FAQ answers on click */
  const faqQuestionButtons = document.querySelectorAll('.faq-question');

  faqQuestionButtons.forEach(function(questionButton) {
    questionButton.addEventListener('click', function() {
      const thisItem   = questionButton.parentElement;
      const isAlreadyOpen = thisItem.classList.contains('open');

      // Close ALL items first
      document.querySelectorAll('.faq-item').forEach(function(item) {
        item.classList.remove('open');
      });

      // If this one was not already open, open it
      if (!isAlreadyOpen) {
        thisItem.classList.add('open');
      }
    });
  });


  /* CONTACT FORM SUBMISSION
     Sends form data to Formspree and shows
     a success or error message */
  const contactForm  = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitButton');

  contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop the page from refreshing

    const nameValue    = document.getElementById('nameInput').value;
    const emailValue   = document.getElementById('emailInput').value;
    const serviceValue = document.getElementById('serviceSelect').value;
    const messageValue = document.getElementById('messageTextarea').value;

    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled    = true;

    try {
      const response = await fetch('https://formspree.io/f/mgolonbb', {
        method:  'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: nameValue, email: emailValue, service: serviceValue, message: messageValue })
      });

      if (response.ok) {
        // Success!
        submitButton.textContent   = '✓ Message Sent!';
        submitButton.style.background = 'linear-gradient(135deg,#27ae60,#1a7a45)';
        contactForm.reset();

        // Reset button after 4 seconds
        setTimeout(function() {
          submitButton.textContent   = 'Send Message →';
          submitButton.style.background = '';
          submitButton.disabled         = false;
        }, 4000);

      } else {
        throw new Error('Server returned an error');
      }

    } catch (error) {
      submitButton.textContent = 'Try Again';
      submitButton.disabled    = false;
    }
  });


  /* LIGHTBOX
     Click a portfolio card to view the image
     full-screen. Press ESC or click outside
     the image to close it. */
  const lightboxOverlay  = document.getElementById('lightboxOverlay');
  const lightboxImage    = document.getElementById('lightboxImage');

  // Open lightbox when a portfolio card is clicked
  const allPortfolioCards = document.querySelectorAll('.portfolio-card');
  allPortfolioCards.forEach(function(card) {
    card.addEventListener('click', function() {
      const cardImage = card.querySelector('img');
      if (!cardImage) return;

      lightboxImage.src = cardImage.src;
      lightboxOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close when the X button is clicked
  document.getElementById('lightboxCloseBtn').addEventListener('click', function() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close when clicking outside the image
  lightboxOverlay.addEventListener('click', function(event) {
    if (event.target === lightboxOverlay) {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });


  /* COOKIE BANNER
     Shows the cookie notice after 3.5 seconds
     if the user hasn't already accepted/declined.
     Saves their choice to localStorage. */
  const cookieBanner      = document.getElementById('cookieBanner');
  const alreadyAnswered   = localStorage.getItem('cg-cookie-choice');

  // Only show the banner if they haven't answered yet
  if (!alreadyAnswered) {
    setTimeout(function() {
      cookieBanner.classList.add('show');
    }, 3500);
  }

  function dismissCookieBanner() {
    cookieBanner.classList.remove('show');
    localStorage.setItem('cg-cookie-choice', 'answered');
  }

  document.getElementById('cookieAcceptBtn').addEventListener('click',  dismissCookieBanner);
  document.getElementById('cookieDeclineBtn').addEventListener('click', dismissCookieBanner);

