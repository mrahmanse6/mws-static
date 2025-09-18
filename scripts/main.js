// Mobile toggle
document.getElementById('mobileToggle')?.addEventListener('click', function () {
    document.getElementById('mobileNav').classList.toggle('hidden');
});

// Close mobile nav when clicking on a link
document.querySelectorAll('#mobileNav a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileNav').classList.add('hidden');
    });
});

// Form handling
document.getElementById('contactForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const status = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Custom validation
    if (!form.name.value.trim()) {
        status.textContent = "Name is required.";
        status.classList.remove('hidden');
        return;
    }
    if (!form.email.value.trim()) {
        status.textContent = "Email is required.";
        status.classList.remove('hidden');
        return;
    }
    if (!form.message.value.trim()) {
        status.textContent = "Message is required.";
        status.classList.remove('hidden');
        return;
    }

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Prepare JSON data
    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            status.textContent = "Message sent successfully! We will contact you shortly.";
            status.classList.remove('hidden');
            form.reset();
        } else {
            status.textContent = "Oops! Something went wrong. Please try again.";
            status.classList.remove('hidden');
        }
    } catch (error) {
        status.textContent = "Network error. Please try again later.";
        status.classList.remove('hidden');
    } finally {
        // Restore button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }

    // Hide status after 6 seconds
    setTimeout(() => status.classList.add('hidden'), 6000);
});

// Reveal animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up', 'delay-1');
        }
    });
}, { threshold: 0.08 });

// Observe all sections with animation class
document.querySelectorAll('.section, .hero, .card, .panel').forEach(el => observer.observe(el));

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});