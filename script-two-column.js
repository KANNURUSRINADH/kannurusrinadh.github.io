// Two-Column Layout JavaScript

// Live Date and Time in Navigation
function updateDateTime() {
    const now = new Date();
    
    // Format time (HH:MM:SS)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Format date (DAY, MONTH DATE, YEAR)
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const dateString = `${dayName}, ${monthName} ${date}, ${year}`;
    
    // Update DOM
    const timeElement = document.getElementById('navTime');
    const dateElement = document.getElementById('navDate');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Counter Animation - Simple and direct approach
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50; // Animation speed
        
        // Clear any existing content and set to 0
        counter.textContent = '0';
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                // Final value
                if (target % 1 !== 0) {
                    counter.textContent = target.toFixed(2);
                } else {
                    counter.textContent = target.toString();
                }
                clearInterval(timer);
            } else {
                // Intermediate values
                if (target % 1 !== 0) {
                    counter.textContent = current.toFixed(2);
                } else {
                    counter.textContent = Math.floor(current).toString();
                }
            }
        }, 20); // Update every 20ms
    });
}

// Trigger counter animation when stats section comes into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) {
    statsObserver.observe(statsRow);
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (navToggle) {
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Accordion Toggle Function
function toggleAccordion(header) {
    const accordionItem = header.parentElement;
    const content = accordionItem.querySelector('.accordion-content');
    const isActive = accordionItem.classList.contains('active');
    
    if (isActive) {
        content.style.maxHeight = '0';
        accordionItem.classList.remove('active');
    } else {
        // Set to scrollHeight for animation, then to none after transition for sticky headers
        content.style.maxHeight = content.scrollHeight + 'px';
        accordionItem.classList.add('active');
        
        // After the transition (0.5s as per CSS), set to none to allow full content flexibility
        setTimeout(() => {
            if (accordionItem.classList.contains('active')) {
                content.style.maxHeight = 'none';
            }
        }, 500);
    }
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create mailto link
        const subject = encodeURIComponent(`Message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:srinadh.3914@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Opening your email client...');
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// ENHANCEMENTS - Interactive Features
// ========================================

// 2. Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 4. Scroll Reveal Animation for Elements
const revealElements = document.querySelectorAll('.sidebar-box, .content-header, .scholar-box');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// 5. Parallax Effect for QR Code
const qrCode = document.querySelector('.qr-code-image');
if (qrCode) {
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            if (qrCode.getBoundingClientRect().top < window.innerHeight) {
                qrCode.style.transform = `translateY(${rate}px)`;
            }
        } else {
            qrCode.style.transform = 'none';
        }
    });
}

// 6. Smooth Accordion Animation Enhancement - Removed (handled by toggleAccordion function)

// 7. Add Ripple Effect to Buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const rippleElement = button.getElementsByClassName('ripple')[0];
    if (rippleElement) {
        rippleElement.remove();
    }
    
    button.appendChild(ripple);
}

document.querySelectorAll('.btn-biosketch, .back-to-top').forEach(button => {
    button.addEventListener('click', createRipple);
});

// 8. Lazy Load Images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// 9. Add Active State to Current Section in Navigation
function updateActiveNav() {
    const sections = document.querySelectorAll('section, .accordion-item');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// 10. Typing Effect for Name (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
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

// 11. Add Hover Sound Effect (Optional - Commented Out)
// Uncomment if you want to add sound effects
/*
const hoverSound = new Audio('path/to/hover-sound.mp3');
document.querySelectorAll('.stat-box, .identity-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});
*/

// 12. Print Friendly Version
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.accordion-content').forEach(content => {
        content.classList.add('active');
        content.style.maxHeight = 'none';
    });
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.accordion-content').forEach(content => {
        content.classList.remove('active');
        content.style.maxHeight = '0';
    });
});

// 13. Keyboard Navigation for Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        if (navToggle) {
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// 14. Add CSS for Ripple Effect and Stat Box Fix
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-biosketch, .back-to-top {
        position: relative;
        overflow: hidden;
    }
    
    /* Minimal fix for text separation without breaking hover effects */
    .stat-box h3.counter {
        display: block;
        line-height: 1;
    }
    
    .stat-box p {
        display: block;
        margin-top: 0.5rem;
    }
    
    /* Reduce width and improve spacing for better visual balance on desktop */
    @media (min-width: 1025px) {
        .stats-row {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 2.2rem;
            margin-bottom: 2rem;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            padding: 0 1.5rem;
        }
        
        .stat-box {
            padding: 1.2rem 1rem;
            min-width: 160px;
            max-width: 180px;
            margin: 0 auto;
        }
    }
    
    /* Ensure hover effects work properly */
    .stat-box {
        transition: all 0.3s ease;
    }
    
    .stat-box:hover {
        transform: translateY(-10px) scale(1.08);
        box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        border-radius: 30% 8px 30% 8px;
    }
    
    .stat-box:hover h3 {
        animation: number-spin 0.8s ease;
    }
    
    @keyframes number-spin {
        0% { 
            transform: rotateX(0deg);
            opacity: 1;
        }
        50% { 
            transform: rotateX(90deg);
            opacity: 0;
        }
        51% { 
            transform: rotateX(-90deg);
            opacity: 0;
        }
        100% { 
            transform: rotateX(0deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('✨ All enhancements loaded successfully!');


// ========================================
// EDUCATION TIMELINE ENHANCEMENTS
// ========================================

// Toggle Education Details
function toggleEduDetails(button) {
    // Navigate up to edu-details div, then find edu-extra-details
    const eduDetails = button.closest('.edu-details');
    const extraDetails = eduDetails.querySelector('.edu-extra-details');
    
    if (!extraDetails) return;
    
    const isActive = extraDetails.classList.contains('active');
    
    if (isActive) {
        extraDetails.classList.remove('active');
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-chevron-down"></i> More Details';
    } else {
        extraDetails.classList.add('active');
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Less Details';
    }
}

// Animated Timeline Progress
const timelineLine = document.querySelector('.education-timeline-vertical::before');
if (timelineLine) {
    const eduObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'drawLine 2s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    const timeline = document.querySelector('.education-timeline-vertical');
    if (timeline) {
        eduObserver.observe(timeline);
    }
}

// Add CSS for line animation
const eduStyle = document.createElement('style');
eduStyle.textContent = `
    @keyframes drawLine {
        from {
            height: 0;
        }
        to {
            height: 100%;
        }
    }
    
    .education-timeline-vertical::before {
        height: 0;
    }
    
    /* AOS-like fade up animation */
    [data-aos="fade-up"] {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-aos="fade-up"].aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(eduStyle);

// Simple AOS implementation for education items
const eduItems = document.querySelectorAll('[data-aos="fade-up"]');
const eduItemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, parseInt(entry.target.dataset.aosDelay) || 0);
            eduItemObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

eduItems.forEach(item => {
    eduItemObserver.observe(item);
});

console.log('✨ Education timeline enhancements loaded!');

// Mobile bottom nav smooth scrolling and active state tracking (scroll spying)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scroll for mobile bottom nav links
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 55; // Height of the mobile-app-bar
                const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Scroll Spying for mobile bottom nav active highlights
    function scrollSpy() {
        const sections = ['about', 'education', 'publications', 'experience', 'contact'];
        const scrollPos = window.scrollY || document.documentElement.scrollTop;
        const headerOffset = 80; // buffer
        
        let activeSection = null;
        
        for (const secId of sections) {
            const el = document.getElementById(secId);
            if (el) {
                const top = el.offsetTop - headerOffset;
                const bottom = top + el.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    activeSection = secId;
                }
            }
        }
        
        // Fallback: at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20) {
            activeSection = 'contact';
        }
        // Fallback: at the top of the page
        if (scrollPos < 50) {
            activeSection = 'about';
        }
        
        if (activeSection) {
            document.querySelectorAll('.mobile-nav-item').forEach(item => {
                if (item.getAttribute('data-section') === activeSection) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }
    
    // Register scroll and resize listeners for mobile view
    if (window.innerWidth <= 1024) {
        window.addEventListener('scroll', scrollSpy);
        window.addEventListener('resize', scrollSpy);
        scrollSpy(); // Initial call

        // 3. Swipe gestures to navigate tabs on mobile
        let touchstartX = 0;
        let touchstartY = 0;
        let touchendX = 0;
        let touchendY = 0;
        
        const sectionsList = ['about', 'education', 'publications', 'experience', 'contact'];
        
        function shouldIgnoreSwipe(target) {
            const ignoreClasses = ['stats-row', 'academic-identity', 'timeline-container', 'table-responsive', 'math-scroll', 'carousel'];
            let current = target;
            while (current && current !== document.body) {
                if (current.classList) {
                    for (const cls of ignoreClasses) {
                        if (current.classList.contains(cls)) {
                            return true;
                        }
                    }
                }
                current = current.parentElement;
            }
            return false;
        }

        document.addEventListener('touchstart', e => {
            if (shouldIgnoreSwipe(e.target)) return;
            touchstartX = e.changedTouches[0].screenX;
            touchstartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', e => {
            if (shouldIgnoreSwipe(e.target)) return;
            touchendX = e.changedTouches[0].screenX;
            touchendY = e.changedTouches[0].screenY;
            handleSwipeGesture();
        }, { passive: true });

        function handleSwipeGesture() {
            const diffX = touchendX - touchstartX;
            const diffY = touchendY - touchstartY;
            
            // Check if horizontal swipe is dominant and exceeds threshold
            if (Math.abs(diffX) > Math.abs(diffY) * 1.5 && Math.abs(diffX) > 80) {
                const activeItem = document.querySelector('.mobile-nav-item.active');
                if (!activeItem) return;
                
                const currentSection = activeItem.getAttribute('data-section');
                const currentIndex = sectionsList.indexOf(currentSection);
                
                if (currentIndex !== -1) {
                    let nextIndex = currentIndex;
                    if (diffX < 0) {
                        // Swipe Left -> Next section
                        if (currentIndex < sectionsList.length - 1) {
                            nextIndex = currentIndex + 1;
                        }
                    } else {
                        // Swipe Right -> Previous section
                        if (currentIndex > 0) {
                            nextIndex = currentIndex - 1;
                        }
                    }
                    
                    if (nextIndex !== currentIndex) {
                        const targetSectionId = sectionsList[nextIndex];
                        const targetNavItem = document.querySelector(`.mobile-nav-item[data-section="${targetSectionId}"]`);
                        if (targetNavItem) {
                            // Create swipe visual feedback bubble
                            const feedbackEl = document.createElement('div');
                            feedbackEl.className = 'swipe-feedback';
                            feedbackEl.innerHTML = diffX < 0 ? '<i class="fas fa-chevron-right"></i>' : '<i class="fas fa-chevron-left"></i>';
                            feedbackEl.style.top = '50%';
                            if (diffX < 0) {
                                feedbackEl.style.right = '20px';
                            } else {
                                feedbackEl.style.left = '20px';
                            }
                            document.body.appendChild(feedbackEl);
                            setTimeout(() => feedbackEl.remove(), 600);
                            
                            targetNavItem.click();
                        }
                    }
                }
            }
        }
    }
});
