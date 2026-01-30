/* ============================================================
   TRENTO - MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initParticles();
    initBackToTop();
    initContactForm();
    initProductSliders();
});

/* ==================== NAVIGATION ==================== */
function initNavigation() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==================== SCROLL ANIMATIONS ==================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Trigger counter animation when visible
                if (entry.target.classList.contains('capacity-grid') ||
                    entry.target.classList.contains('hero-stats')) {
                    animateCounters(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Observe stagger containers
    document.querySelectorAll('.stagger-container').forEach(el => {
        observer.observe(el);
    });
}

/* ==================== COUNTER ANIMATIONS ==================== */
function initCounterAnimations() {
    // Counters will be triggered by scroll animation
}

function animateCounters(container) {
    const counters = container.querySelectorAll('[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

/* ==================== PARTICLES ==================== */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.2;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            left: ${left}%;
            top: 100%;
            animation: floatUp ${duration}s linear ${delay}s infinite;
        `;

        particlesContainer.appendChild(particle);
    }

    // Add particle animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/* ==================== PRODUCT SLIDERS ==================== */
function initProductSliders() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const img = card.querySelector('.product-image img');
        const prevBtn = card.querySelector('.slider-prev');
        const nextBtn = card.querySelector('.slider-next');

        if (!img || !prevBtn || !nextBtn) return;

        // Get images array from data attribute
        let images = [];
        try {
            images = JSON.parse(img.getAttribute('data-images') || '[]');
        } catch (e) {
            console.error('Error parsing images:', e);
            return;
        }

        if (images.length === 0) return;

        let currentIndex = 0;

        // Previous button click
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = images[currentIndex];
                img.style.opacity = '1';
            }, 150);
        });

        // Next button click
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = images[currentIndex];
                img.style.opacity = '1';
            }, 150);
        });

        // Add transition for smooth image change
        img.style.transition = 'opacity 0.15s ease';
    });
}

/* ==================== BACK TO TOP ==================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==================== CONTACT FORM ==================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simple validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showNotification('Lütfen tüm zorunlu alanları doldurun.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Gönderiliyor...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        padding: 16px 24px;
        background: ${type === 'success' ? '#1E8E3E' : '#EF4444'};
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `;

    const closeBtn = notification.querySelector('button');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        opacity: 0.8;
    `;

    document.body.appendChild(notification);

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateX(-50%) translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideUp 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ==================== ADDITIONAL EFFECTS ==================== */

// Add hover effect on cards
document.querySelectorAll('.product-card, .capacity-card, .eco-card, .location-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Typing effect for hero (optional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGradient = document.querySelector('.hero-gradient');
    if (heroGradient && scrolled < window.innerHeight) {
        heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, { passive: true });
