// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form submission: send to Forest City Digital Formspree, show toast
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        var formAction = contactForm.getAttribute('action') || 'https://formspree.io/f/maqdokll';
        if (!contactForm.getAttribute('action')) {
            contactForm.setAttribute('action', formAction);
        }
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var form = this;
            var submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending…';
            }
            fetch(formAction, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            })
            .then(function() {
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.dataset.originalText || 'Get Free Quote';
                }
                var toast = document.getElementById('thankYouToast');
                if (!toast) {
                    toast = document.createElement('div');
                    toast.id = 'thankYouToast';
                    toast.className = 'fcd-toast';
                    toast.setAttribute('aria-live', 'polite');
                    toast.textContent = 'Thank you for your submission!';
                    document.body.appendChild(toast);
                }
                toast.classList.add('visible');
                setTimeout(function() { toast.classList.remove('visible'); }, 3200);
            })
            .catch(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.dataset.originalText || 'Get Free Quote';
                }
                alert('Something went wrong. Please try again or call (519) 719-7762.');
            });
        });
        var btn = contactForm.querySelector('button[type="submit"]');
        if (btn && !btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
    }
    
    // Add scroll effect to header - move to top when scrolling
    const header = document.querySelector('.header');
    const stickyCta = document.querySelector('.sticky-cta');
    const stickyCtaHeight = stickyCta ? stickyCta.offsetHeight : 0;
    
    if (header && stickyCta) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > stickyCtaHeight) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                header.classList.add('scrolled');
                stickyCta.classList.add('scrolled');
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                header.classList.remove('scrolled');
                stickyCta.classList.remove('scrolled');
            }
        });
    } else if (header) {
        // Fallback if no sticky CTA
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                header.classList.add('scrolled');
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and other elements
    document.querySelectorAll('.service-card, .menu-item, .review-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Financing dropdown toggle
    const financingToggle = document.querySelector('.financing-toggle');
    const financingDetails = document.querySelector('.financing-details');
    
    if (financingToggle && financingDetails) {
        financingToggle.addEventListener('click', function() {
            financingDetails.classList.toggle('active');
            
            if (financingDetails.classList.contains('active')) {
                financingToggle.textContent = 'Show Less';
            } else {
                financingToggle.textContent = 'Learn More';
            }
        });
    }
});
