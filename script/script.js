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
        
        // ============================================
        // SMOOTH PAGE NAVIGATION
        // Show/hide sections based on navigation clicks
        // ============================================
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = {
            home: document.getElementById('home'),
            about: document.getElementById('about'),
            services: document.getElementById('services'),
            portfolio: document.getElementById('portfolio'),
            contact: document.getElementById('contact')
        };
        
        // Function to show specific section and hide others
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
        
        // ============================================
        // STICKY HEADER
        // Add/remove scrolled class for header styling
        // ============================================
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // ============================================
        // SCROLL ANIMATIONS
        // Fade in elements as they enter viewport
        // ============================================
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
        
        // ============================================
        // PORTFOLIO FILTER
        // Filter portfolio items by category
        // ============================================
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
        
        // ============================================
        // CONTACT FORM HANDLING
        // Form submission with validation
        // ============================================
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
            
            // In a real application, this would send data to a server
            // For demonstration, we'll show a success message
            alert(`Thank you, ${formData.name}! We've received your message and will get back to you soon.`);
            
            // Reset form
            contactForm.reset();
            
            // Log to console for demonstration
            console.log('Form submitted:', formData);
        });
        
        // ============================================
        // PERFORMANCE OPTIMIZATION
        // Lazy load images and optimize animations
        // ============================================
        
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
        
        // ============================================
        // ACCESSIBILITY ENHANCEMENTS
        // Keyboard navigation and focus management
        // ============================================
        
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
        
        // ============================================
        // CONSOLE MESSAGE
        // Friendly message for developers
        // ============================================
        console.log('%c🎨 Cheers Graphix', 'font-size: 24px; font-weight: bold; color: #FF6B6B;');
        console.log('%cLooking for a creative partner? Let\'s chat!', 'font-size: 14px; color: #6BFFFF;');
        console.log('%chello@cheersgraphix.com', 'font-size: 12px; color: #FFD93D;');
    