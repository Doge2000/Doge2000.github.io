// Interactive Portfolio Script
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark/Light mode toggle
    const modeToggle = document.getElementById('mode-toggle');
    // Check for saved mode preference or default to dark
    const currentMode = localStorage.getItem('mode') || 'dark';
    document.body.classList.add(currentMode + '-mode');
    // Update the button icon based on mode
    modeToggle.textContent = currentMode === 'dark' ? '🌓' : '☀️';

    // Add click event listener
    modeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('mode', 'light');
            modeToggle.textContent = '☀️';
        } else {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('mode', 'dark');
            modeToggle.textContent = '🌓';
        }
    });

    // Typing effect for header
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        const text = headerTitle.textContent;
        headerTitle.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                headerTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for fade-in
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate skill bars when visible
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});

    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        skillObserver.observe(skillsContainer);
    }

    // Add hover tilt effect to project cards
    document.querySelectorAll('.project, .project-card').forEach(project => {
        project.addEventListener('mousemove', (e) => {
            const rect = project.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (centerX - x) / centerX * 5;

            project.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        project.addEventListener('mouseleave', () => {
            project.style.removeProperty('transform');
        });
    });

    // Add click ripple effect to buttons/links
    document.querySelectorAll('nav a, .contact-item a').forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.transition = 'width 0.6s ease, height 0.6s ease, opacity 0.6s ease';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.style.width = '200px';
                ripple.style.height = '200px';
                ripple.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add floating animation to profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        let floatOffset = 0;
        let floatDirection = 1;

        function floatImage() {
            floatOffset += floatDirection * 0.5;
            if (Math.abs(floatOffset) > 10) floatDirection *= -1;
            profileImg.style.transform = `translateY(${floatOffset}px)`;
            requestAnimationFrame(floatImage);
        }

        floatImage();
    }

    // Create particle background
    function createParticles() {
        let particlesContainer = document.getElementById('particles-container');
        if (!particlesContainer) {
            particlesContainer = document.createElement('div');
            particlesContainer.id = 'particles-container';
            document.body.appendChild(particlesContainer);
        }

        // Create particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = `${Math.random() * 3 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Random animation
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.setProperty('--delay', `${delay}s`);

            particlesContainer.appendChild(particle);
        }
    }

    // Initialize particles
    createParticles();

    // Add hover lift effect to project cards
    document.querySelectorAll('.project, .project-card').forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.style.zIndex = '10';
        });

        project.addEventListener('mouseleave', () => {
            project.style.zIndex = '1';
        });
    });
});