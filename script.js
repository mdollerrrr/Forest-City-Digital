// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Package Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });

    // Sticky mobile CTA bar: show after scrolling
    var mobileCtaBar = document.getElementById('mobileCtaBar');
    if (mobileCtaBar) {
        function updateMobileCtaBar() {
            if (window.innerWidth <= 768 && window.scrollY > 280) {
                mobileCtaBar.classList.add('visible');
            } else {
                mobileCtaBar.classList.remove('visible');
            }
        }
        window.addEventListener('scroll', updateMobileCtaBar);
        window.addEventListener('resize', updateMobileCtaBar);
        updateMobileCtaBar();
    }

    // Service type "Other": show/hide custom text field
    var serviceSelect = document.getElementById('service');
    var serviceOtherWrap = document.getElementById('serviceOtherWrap');
    if (serviceSelect && serviceOtherWrap) {
        function toggleServiceOther() {
            serviceOtherWrap.style.display = serviceSelect.value === 'other' ? 'block' : 'none';
        }
        serviceSelect.addEventListener('change', toggleServiceOther);
        toggleServiceOther();
    }

    // Form Submission: POST to Formspree then show thank-you toast
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var form = this;
            var submitBtn = form.querySelector('button[type="submit"]');
            var toast = document.getElementById('thankYouToast');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending…';
            }
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            })
            .then(function() {
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Get Free Quote';
                }
                if (serviceOtherWrap) serviceOtherWrap.style.display = 'none';
                if (toast) {
                    toast.classList.add('visible');
                    setTimeout(function() {
                        toast.classList.remove('visible');
                    }, 3200);
                }
            })
            .catch(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Get Free Quote';
                }
                alert('Something went wrong. Please email us at ForestCityDigital@gmail.com or call (226-559-7450).');
            });
        });
    }

    // Package carousel dots (mobile)
    function initCarouselDots(grid) {
        var dotsContainer = grid.nextElementSibling;
        if (!dotsContainer || !dotsContainer.classList.contains('carousel-dots')) return;
        var dots = dotsContainer.querySelectorAll('.dot');
        var cards = grid.querySelectorAll('.package-card');
        if (!dots.length || !cards.length) return;

        function updateDots() {
            var scrollLeft = grid.scrollLeft;
            var cardWidth = cards[0].offsetWidth + 16;
            var index = Math.round(scrollLeft / cardWidth);
            index = Math.max(0, Math.min(index, dots.length - 1));
            dots.forEach(function(d) { d.classList.remove('active'); });
            dots[index].classList.add('active');
        }

        grid.addEventListener('scroll', updateDots);

        // Hide swipe hint on first scroll
        var swipeHint = dotsContainer.nextElementSibling;
        if (swipeHint && swipeHint.classList.contains('swipe-hint')) {
            grid.addEventListener('scroll', function hideHint() {
                swipeHint.classList.add('hidden');
                grid.removeEventListener('scroll', hideHint);
            });
        }

        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                var idx = parseInt(this.getAttribute('data-index'), 10);
                var cardWidth = cards[0].offsetWidth + 16;
                grid.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
            });
        });
    }

    function initAllCarousels() {
        document.querySelectorAll('.packages-grid').forEach(initCarouselDots);
    }

    initAllCarousels();

    // Re-init dots when tabs switch
    tabButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            setTimeout(initAllCarousels, 50);
        });
    });
});
