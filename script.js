// Three.js 3D Laptop Model - Replaced with Spline
        // The Spline viewer handles all 3D interactions automatically

        // Scroll Animations
        class ScrollAnimations {
            constructor() {
                this.observers = new Map();
                this.setupIntersectionObservers();
                this.setupParallax();
            }

            setupIntersectionObservers() {
                // Feature cards animation
                const featureCards = document.querySelectorAll('.feature-card');
                const cardObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                            }, index * 100);
                        }
                    });
                }, { threshold: 0.1 });

                featureCards.forEach(card => cardObserver.observe(card));

                // Specs animation
                const specItems = document.querySelectorAll('.spec-item');
                const specObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.style.animation = 'scaleIn 0.6s ease forwards';
                            }, index * 100);
                        }
                    });
                }, { threshold: 0.1 });

                specItems.forEach(item => specObserver.observe(item));
            }

            setupParallax() {
                window.addEventListener('scroll', () => {
                    const scrolled = window.pageYOffset;
                    const parallaxElements = document.querySelectorAll('.parallax-bg');
                    
                    parallaxElements.forEach(element => {
                        const rate = scrolled * -0.5;
                        element.style.transform = `translateY(${rate}px)`;
                    });
                });
            }
        }

        // Smooth scrolling for navigation
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

        // Navigation background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        });

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize scroll animations
            const scrollAnimations = new ScrollAnimations();

            // CTA button interaction
            document.querySelector('.cta-button').addEventListener('click', () => {
                document.getElementById('features').scrollIntoView({
                    behavior: 'smooth'
                });
            });

            // Monitor Spline viewer loading
            const splineViewer = document.querySelector('spline-viewer');
            const fallbackLaptop = document.getElementById('fallback-laptop');
            
            if (splineViewer) {
                // Add loading indicator
                splineViewer.style.background = 'linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))';
                
                splineViewer.addEventListener('load', () => {
                    console.log('Spline 3D model loaded successfully');
                    splineViewer.style.background = 'transparent';
                    splineViewer.setAttribute('data-loaded', 'true');
                });

                splineViewer.addEventListener('error', (e) => {
                    console.error('Error loading Spline model:', e);
                    showFallback();
                });

                // Timeout fallback - show CSS laptop if Spline doesn't load in 8 seconds
                setTimeout(() => {
                    if (!splineViewer.hasAttribute('data-loaded')) {
                        console.warn('Spline model taking too long to load, showing fallback');
                        showFallback();
                    }
                }, 8000);

                function showFallback() {
                    splineViewer.style.display = 'none';
                    fallbackLaptop.style.display = 'block';
                }
            }
        });
