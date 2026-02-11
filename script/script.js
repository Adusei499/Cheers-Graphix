        // MOBILE MENU TOGGLE
        // Open/close mobile navigation
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        
       
        // Show/hide sections based on navigation clicks
        
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = {
            home: document.getElementById('home'),
            about: document.getElementById('about'),
            services: document.getElementById('services'),
            portfolio: document.getElementById('portfolio'),
            contact: document.getElementById('contact')
        };
        
        //  show specific section and hide others
        function showSection(sectionName) {
            // Hide all sections
            Object.values(sections).forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show selected section
            if (sections[sectionName]) {
                sections[sectionName].classList.remove('hidden');
            }
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionName}`) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Add click event to navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionName = link.getAttribute('href').substring(1);
                showSection(sectionName);
                
                // Update URL without page reload
                history.pushState(null, '', `#${sectionName}`);
            });
        });
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1) || 'home';
            showSection(hash);
        });
        
        // Show correct section on page load based on URL hash
        window.addEventListener('load', () => {
            const hash = window.location.hash.substring(1) || 'home';
            showSection(hash);
        });
        
     
        // STICKY HEADER
        // Add/remove scrolled class for header styling
       
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // SCROLL ANIMATIONS
        // Fade in elements as they enter viewport
       
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add delay for staggered animation
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Filter portfolio items by category
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Trigger reflow for animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // CONTACT FORM HANDLING
        const contactForm = document.getElementById('contactForm');
         
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            const status = contactForm.querySelector('.form-submit');
            status.innerHTML = "Sending....";

            // Send form to formspree
            fetch("https://formspree.io/f/mgolonbb", {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then (response => {
                if(response.ok) {
                    alert(`Thank you, ${formData.name}! We've received your message and will get back to you soon.`);
                    contactForm.reset();
                } else {
                    alert("Oops, There was a problem sending your message");
                }
            }).catch(error => {
                alert("Network errror. Please try again");
            }).finally(() => {
                status.innerHTML = "Send Message";
            });

            // log to console
            console.log('Form submitted:', formData);
        });

        // ── Testimonials Carousel ──
             (function () {
            const track    = document.getElementById('carouselTrack');
            const dotsWrap = document.getElementById('carouselDots');
            const prevBtn  = document.querySelector('.carousel-prev');
            const nextBtn  = document.querySelector('.carousel-next');
            const cards    = document.querySelectorAll('.testimonial-card');
            let current = 0, timer = null;
            const total = cards.length;

            // Build dots
            cards.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(dot);
            });

            function goTo(i) {
                current = (i + total) % total;
                track.style.transform = `translateX(-${current * 100}%)`;
                document.querySelectorAll('.carousel-dot').forEach((d, j) => d.classList.toggle('active', j === current));
                resetTimer();
            }

            function startTimer() { timer = setInterval(() => goTo(current + 1), 5000); }
            function resetTimer() { clearInterval(timer); startTimer(); }

            prevBtn.addEventListener('click', () => goTo(current - 1));
            nextBtn.addEventListener('click', () => goTo(current + 1));

            // Swipe support
            let startX = 0;
            track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
            track.addEventListener('touchend',   e => { const d = startX - e.changedTouches[0].clientX; if (Math.abs(d) > 50) d > 0 ? goTo(current + 1) : goTo(current - 1); }, { passive: true });

            // Pause on hover
            track.addEventListener('mouseenter', () => clearInterval(timer));
            track.addEventListener('mouseleave', startTimer);

            startTimer();
        })();




        
        // ============================================
        // PERFORMANCE OPTIMIZATION
        // Lazy load images and optimize animations
       
        
        // Debounce function for scroll events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        // Optimized scroll handler
        const handleScroll = debounce(() => {
            // Scroll-based animations can be added here
        }, 10);
        
        window.addEventListener('scroll', handleScroll);
        
        // ACCESSIBILITY ENHANCEMENTS
        
        // Add keyboard navigation for portfolio filters
        filterButtons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' && filterButtons[index + 1]) {
                    filterButtons[index + 1].focus();
                }
                if (e.key === 'ArrowLeft' && filterButtons[index - 1]) {
                    filterButtons[index - 1].focus();
                }
            });
        });
        
        // Focus management for mobile menu
        const firstFocusableElement = navMenu.querySelector('.nav-link');
        const lastFocusableElement = navMenu.querySelector('.nav-cta');
        
        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuToggle.click();
                if (navMenu.classList.contains('active')) {
                    firstFocusableElement?.focus();
                }
            }
        });
        
        // ============================================
        // EASTER EGG: KONAMI CODE
        // Fun interaction for users who know the code
        // ============================================
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    // Activate special effect
                    document.body.style.animation = 'rainbow 2s linear infinite';
                    setTimeout(() => {
                        document.body.style.animation = '';
                        konamiIndex = 0;
                    }, 5000);
                }
            } else {
                konamiIndex = 0;
            }
        });
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
    
        // CONSOLE MESSAGE
        console.log('%c🎨 Cheers Graphix', 'font-size: 24px; font-weight: bold; color: #FF6B6B;');
        console.log('%cLooking for a creative partner? Let\'s chat!', 'font-size: 14px; color: #6BFFFF;');
        console.log('%chello@cheersgraphix.com', 'font-size: 12px; color: #FFD93D;');
    
