// Enhanced Portfolio JavaScript with Advanced Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initTypingAnimation();
    initScrollAnimations();
    initSkillAnimations();
    initContactForm();
    initProjectInteractions();
    initParallaxEffects();
    initSmoothScrolling();
    initMagneticButtons();
    initAdvancedAnimations();
});

// Enhanced Loading Screen with Sophisticated Animation
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!loadingScreen || !loadingProgress) return;
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    // Sophisticated loading progress simulation
    let progress = 0;
    const targetProgress = 100;
    const duration = 3000; // 3 seconds
    const startTime = Date.now();
    
    function updateProgress() {
        const elapsed = Date.now() - startTime;
        const normalizedTime = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth progress
        const easedProgress = easeOutQuart(normalizedTime) * targetProgress;
        progress = Math.min(easedProgress, targetProgress);
        
        loadingProgress.style.width = progress + '%';
        
        if (progress < targetProgress) {
            requestAnimationFrame(updateProgress);
        } else {
            // Complete loading sequence
            setTimeout(completeLoading, 500);
        }
    }
    
    function completeLoading() {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Start hero animations after loading completes
        setTimeout(() => {
            initHeroAnimations();
        }, 800);
    }
    
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    // Start progress animation
    setTimeout(updateProgress, 500);
}

// FIXED: Hero Section Entrance Animations
function initHeroAnimations() {
    const heroElements = [
        { selector: '.hero-greeting', delay: 0 },
        { selector: '.hero-title', delay: 200 },
        { selector: '.hero-subtitle', delay: 400 }, 
        { selector: '.hero-specialization', delay: 600 },
        { selector: '.hero-bio', delay: 800 },
        { selector: '.hero-stats', delay: 1000 },
        { selector: '.hero-buttons', delay: 1200 },
        { selector: '.hero-social', delay: 1400 }
    ];
    
    heroElements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
    });
    
    // Animate hero image
    const heroImageContainer = document.querySelector('.image-container');
    if (heroImageContainer) {
        heroImageContainer.style.opacity = '0';
        heroImageContainer.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            heroImageContainer.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            heroImageContainer.style.opacity = '1';
            heroImageContainer.style.transform = 'scale(1)';
        }, 800);
    }
    
    // Animate stats numbers
    setTimeout(() => {
        animateStatNumbers();
    }, 1200);
}

// Enhanced Typing Animation
function initTypingAnimation() {
    setTimeout(() => {
        const typingElement = document.querySelector('.typing-text');
        const cursorElement = document.querySelector('.cursor');
        
        if (!typingElement || !cursorElement) return;
        
        const text = "Varun A.";
        let index = 0;
        
        typingElement.textContent = '';
        
        function typeCharacter() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeCharacter, 120 + Math.random() * 80);
            } else {
                // Typing complete, show cursor blinking
                setTimeout(() => {
                    cursorElement.style.animation = 'blink 1s infinite';
                }, 500);
            }
        }
        
        typeCharacter();
    }, 2500);
}

// FIXED: Enhanced Navigation System
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');
    
    let isScrolling = false;
    let activeSection = '';
    
    // Enhanced smooth scrolling with proper implementation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isScrolling) return;
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                isScrolling = true;
                
                const navbarHeight = navbar?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Use native smooth scrolling
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveNavLink(this);
                
                // Close mobile menu
                closeMobileMenu();
                
                // Reset scrolling flag after animation
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        });
    });
    
    // Enhanced scroll spy with threshold detection
    let ticking = false;
    
    function updateActiveNavigation() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollPosition = window.pageYOffset + 150; // Adjusted for better detection
                let newActiveSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    const sectionBottom = sectionTop + sectionHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        newActiveSection = section.getAttribute('id');
                    }
                });
                
                if (newActiveSection !== activeSection) {
                    activeSection = newActiveSection;
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        const href = link.getAttribute('href');
                        if (href === `#${activeSection}`) {
                            link.classList.add('active');
                        }
                    });
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateActiveNavigation, { passive: true });
    updateActiveNavigation(); // Set initial state
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Enhanced Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    let isMenuOpen = false;
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        
        // Animate menu items
        if (isMenuOpen) {
            animateMenuItems();
        }
    }
    
    function animateMenuItems() {
        const menuItems = navMenu.querySelectorAll('.nav-item');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Enhanced Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    let ticking = false;
    
    function updateScrollEffects() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                
                // Navbar scroll effect
                if (navbar) {
                    if (scrollY > 100) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }
                
                // Hide scroll indicator after scrolling
                if (scrollIndicator) {
                    if (scrollY > 200) {
                        scrollIndicator.style.opacity = '0';
                        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
                    } else {
                        scrollIndicator.style.opacity = '1';
                        scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
                    }
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateScrollEffects, { passive: true });
}

// Advanced Scroll Animations with Intersection Observer
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        const elements = document.querySelectorAll('[class*="slide-in"]');
        elements.forEach(el => el.classList.add('visible'));
        return;
    }
    
    const observerOptions = {
        threshold: [0.1, 0.3],
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('project-card')) {
                        setTimeout(() => animateProjectCard(entry.target), 200);
                    }
                    
                    if (entry.target.classList.contains('skill-widget')) {
                        setTimeout(() => animateSkillWidget(entry.target), 300);
                    }
                    
                    if (entry.target.classList.contains('education-item')) {
                        setTimeout(() => animateEducationItem(entry.target), 200);
                    }
                    
                    if (entry.target.classList.contains('stat-item')) {
                        setTimeout(() => animateStatItem(entry.target), 100);
                    }
                    
                    // Add magnetic effect to buttons after they're visible
                    if (entry.target.querySelector('.magnetic-btn')) {
                        initMagneticEffect(entry.target.querySelectorAll('.magnetic-btn'));
                    }
                }, index * 100);
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatableElements = document.querySelectorAll(`
        .slide-in-up,
        .slide-in-left,
        .slide-in-right,
        .slide-in-bottom,
        .slide-in-scale,
        .slide-in-stagger,
        .section-header,
        .about-content,
        .project-card,
        .skill-widget,
        .education-item,
        .experience-widget,
        .certificates-widget,
        .contact-content
    `);
    
    animatableElements.forEach((element, index) => {
        if (!element.classList.contains('visible')) {
            element.style.transitionDelay = `${Math.min(index * 0.05, 0.5)}s`;
            observer.observe(element);
        }
    });
}

// Enhanced Magnetic Button Effects
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        initMagneticEffect([btn]);
    });
}

function initMagneticEffect(elements) {
    elements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', function(e) {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                x: 0,
                y: 0,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) * 0.3;
            const deltaY = (y - centerY) * 0.3;
            
            gsap.to(this, {
                duration: 0.2,
                x: deltaX,
                y: deltaY,
                ease: "power2.out"
            });
        });
    });
}

// Fallback magnetic effect without GSAP
function initMagneticEffect(elements) {
    elements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        element.addEventListener('mouseleave', function(e) {
            this.style.transform = 'scale(1) translate(0, 0)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) * 0.15;
            const deltaY = (y - centerY) * 0.15;
            
            this.style.transform = `scale(1.05) translate(${deltaX}px, ${deltaY}px)`;
            this.style.transition = 'transform 0.1s ease-out';
        });
    });
}

// Skill Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                }, index * 200);
            }
        });
    }
    
    // Trigger when skills section becomes visible
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateSkillBars, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

// Individual Element Animations
function animateProjectCard(card) {
    const elements = card.querySelectorAll('.project-title, .project-description, .tech-tag, .feature');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animateSkillWidget(widget) {
    const skillItems = widget.querySelectorAll('.skill-item, .cloud-item, .tool-item');
    
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 100);
    });
}

function animateEducationItem(item) {
    const card = item.querySelector('.education-card');
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 200);
    }
}

function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(numberElement => {
        const targetText = numberElement.textContent;
        const targetNumber = parseInt(targetText.replace(/\D/g, ''));
        const suffix = targetText.replace(/\d/g, '');
        
        if (targetNumber) {
            let current = 0;
            const increment = targetNumber / 30;
            const duration = 2000;
            const startTime = Date.now();
            
            function updateNumber() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                current = Math.floor(targetNumber * easeOutQuart(progress));
                numberElement.textContent = current + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    numberElement.textContent = targetText;
                }
            }
            
            function easeOutQuart(t) {
                return 1 - (--t) * t * t * t;
            }
            
            updateNumber();
        }
    });
}

function animateStatItem(item) {
    const number = item.querySelector('.stat-number');
    const label = item.querySelector('.stat-label');
    
    if (number && label) {
        number.style.transform = 'scale(0)';
        label.style.opacity = '0';
        
        setTimeout(() => {
            number.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            number.style.transform = 'scale(1)';
            
            setTimeout(() => {
                label.style.transition = 'opacity 0.4s ease';
                label.style.opacity = '1';
            }, 300);
        }, 100);
    }
}

// Enhanced Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Add floating label behavior
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Handle initial state
            if (input.value.trim() !== '') {
                label.classList.add('active');
            }
            
            input.addEventListener('focus', () => {
                label.classList.add('active');
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    label.classList.remove('active');
                }
                group.classList.remove('focused');
            });
            
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
        }
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value.trim();
        });
        
        // Validate form
        if (!validateContactForm(formObject)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('.btn-submit');
        const originalContent = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Remove active labels
            formGroups.forEach(group => {
                const label = group.querySelector('label');
                if (label) {
                    label.classList.remove('active');
                }
            });
            
            // Reset button
            submitButton.innerHTML = originalContent;
            submitButton.disabled = false;
            
        }, 2000);
    });
}

function validateContactForm(formData) {
    const required = ['name', 'email', 'subject', 'message'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check required fields
    for (let field of required) {
        if (!formData[field] || formData[field] === '') {
            return false;
        }
    }
    
    // Validate email
    if (!emailRegex.test(formData.email)) {
        return false;
    }
    
    // Check minimum lengths
    if (formData.name.length < 2) return false;
    if (formData.subject.length < 5) return false;
    if (formData.message.length < 10) return false;
    
    return true;
}

// FIXED: Enhanced Project Interactions
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
            
            // Animate tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
            
            // Reset tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        });
        
        // Mobile tap interaction
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const projectLink = this.querySelector('.project-link');
                if (projectLink && !e.target.closest('.project-link')) {
                    e.preventDefault();
                    window.open(projectLink.href, '_blank');
                }
            }
        });
    });
    
    // Enhanced link click handling for project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const projectTitle = this.closest('.project-card')?.querySelector('.project-title')?.textContent;
            console.log(`Project link clicked: ${projectTitle}`);
            
            // Add ripple effect
            createRippleEffect(this, e);
            
            // Enhanced click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // FIXED: Certificates link - ensure it works properly
    const certificatesLink = document.querySelector('.certificates-link');
    if (certificatesLink) {
        certificatesLink.addEventListener('click', function(e) {
            console.log('Certificates link clicked - opening Google Drive');
            // The href is already set in HTML, so default behavior will work
            createRippleEffect(this, e);
        });
    }
}

// Enhanced Parallax Effects
function initParallaxEffects() {
    const heroGrid = document.querySelector('.hero-grid');
    const decorationItems = document.querySelectorAll('.decoration-item');
    const floatingParticles = document.querySelectorAll('.floating-particle');
    
    let ticking = false;
    
    function updateParallax() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                
                // Hero grid parallax
                if (heroGrid) {
                    const speed = scrollY * 0.2;
                    heroGrid.style.transform = `translate(${speed}px, ${speed}px)`;
                }
                
                // Decoration items parallax
                decorationItems.forEach((item, index) => {
                    const speed = (index + 1) * 0.1;
                    const yPos = scrollY * speed;
                    item.style.transform = `translateY(${yPos}px)`;
                });
                
                // Floating particles parallax
                floatingParticles.forEach((particle, index) => {
                    const speed = (index + 1) * 0.05;
                    const yPos = scrollY * speed;
                    particle.style.transform = `translate(${particle.dataset.x || 0}px, ${yPos}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateParallax, { passive: true });
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    // Enhance all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!' || href.length <= 1) return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Use native smooth scrolling with enhanced easing
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add click animation to the link
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Advanced Animations System
function initAdvancedAnimations() {
    // Initialize cursor following effect for magnetic buttons
    initCursorFollow();
    
    // Initialize scroll-triggered animations
    initScrollTriggerAnimations();
    
    // Initialize hover animations for cards
    initCardHoverAnimations();
    
    // Initialize text reveal animations
    initTextRevealAnimations();
}

function initCursorFollow() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(59, 130, 246, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
        display: none;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursor.style.display = 'block';
    });
    
    // Enhanced cursor for magnetic elements
    const magneticElements = document.querySelectorAll('.magnetic-btn');
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'rgba(59, 130, 246, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'rgba(59, 130, 246, 0.5)';
        });
    });
}

function initScrollTriggerAnimations() {
    const elementsToAnimate = document.querySelectorAll('.section-header, .project-card, .skill-widget');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for children
                const children = entry.target.querySelectorAll('h1, h2, h3, p, .btn, .project-title, .project-description');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        child.style.transition = 'all 0.5s ease';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        observer.observe(element);
    });
}

function initCardHoverAnimations() {
    const cards = document.querySelectorAll('.project-card, .skill-widget, .education-card, .experience-widget, .certificates-widget');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

function initTextRevealAnimations() {
    const textElements = document.querySelectorAll('.hero-title, .section-title');
    
    textElements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => 
            `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(20px);">${word}</span>`
        ).join(' ');
        
        const wordSpans = element.querySelectorAll('.word');
        
        // Reveal words on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wordSpans.forEach((word, index) => {
                        setTimeout(() => {
                            word.style.transition = 'all 0.5s ease';
                            word.style.opacity = '1';
                            word.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        removeNotification(notification);
    });
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-triangle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${icons[type] || icons.info}"></i>
            </div>
            <div class="notification-message">
                <span>${message}</span>
            </div>
            <button class="notification-close" type="button" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Enhanced styling
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #1e1e2f 0%, #16213e 100%);
        color: white;
        padding: 0;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        min-width: 320px;
        overflow: hidden;
        backdrop-filter: blur(20px);
    `;
    
    // Content styling
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 20px;
        }
        
        .notification-icon {
            flex-shrink: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${colors[type] || colors.info};
            font-size: 16px;
        }
        
        .notification-message {
            flex: 1;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .notification-close {
            flex-shrink: 0;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            font-size: 14px;
            width: 24px;
            height: 24px;
            border-radius: 6px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            transform: scale(1.1);
        }
        
        .notification-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: ${colors[type] || colors.info};
            border-radius: 0 0 12px 12px;
            transform-origin: left;
            animation: notificationProgress ${duration}ms linear;
        }
        
        @keyframes notificationProgress {
            from { transform: scaleX(1); }
            to { transform: scaleX(0); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
        document.head.removeChild(style);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            removeNotification(notification);
            if (style.parentNode) {
                document.head.removeChild(style);
            }
        }
    }, duration);
}

function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }
}

// Utility Functions
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('Window resized - components reinitialized');
        // Reinitialize components that need viewport adjustments
        initMagneticButtons();
    }, 250);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
});

// Add keyboard navigation styles
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    body:not(.using-keyboard) *:focus {
        outline: none;
    }
    
    .using-keyboard *:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyle);

// Initialize intersection observer for performance
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
initPerformanceOptimizations();

console.log('🚀 Enhanced portfolio with advanced animations initialized successfully!');
console.log('🎯 Features loaded: Magnetic buttons, parallax effects, smooth animations, enhanced interactions');
console.log('🔗 Certificates link properly configured for Google Drive');
console.log('📱 Mobile-optimized navigation and interactions ready');