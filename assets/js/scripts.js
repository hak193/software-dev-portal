// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Portfolio page functionality
    if (window.location.pathname.includes('portfolio.html')) {
        // Project filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('bg-blue-600', 'text-white'));
                filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-700'));

                // Add active class to clicked button
                button.classList.remove('bg-gray-200', 'text-gray-700');
                button.classList.add('bg-blue-600', 'text-white');

                const filter = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Project modal functionality
        const modal = document.getElementById('project-modal');
        const modalContent = document.getElementById('modal-content');
        const closeModal = document.getElementById('close-modal');
        const viewButtons = document.querySelectorAll('.view-project');

        if (modal && modalContent && closeModal) {
            viewButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const project = button.closest('.project-card');
                    const projectTitle = project.querySelector('h3').textContent;
                    const projectDesc = project.querySelector('p').textContent;
                    const projectImage = project.querySelector('img').src;
                    const projectTags = project.querySelector('.mt-4').innerHTML;

                    modalContent.innerHTML = `
                        <img src="${projectImage}" alt="${projectTitle}" class="w-full h-64 object-cover rounded-lg mb-6">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">${projectTitle}</h3>
                        <p class="text-gray-600 mb-6">${projectDesc}</p>
                        <div class="mb-6">
                            <h4 class="text-lg font-medium text-gray-900 mb-2">Technologies Used</h4>
                            <div class="flex flex-wrap gap-2">
                                ${projectTags}
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <a href="#" class="text-blue-600 hover:text-blue-700">
                                <i class="fab fa-github text-xl mr-2"></i>View Source
                            </a>
                            <a href="#" class="text-blue-600 hover:text-blue-700">
                                <i class="fas fa-external-link-alt text-xl mr-2"></i>Live Demo
                            </a>
                        </div>
                    `;
                    modal.classList.remove('hidden');
                });
            });

            closeModal.addEventListener('click', () => {
                modal.classList.add('hidden');
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        }
    }

    // Contact form validation and submission
    if (window.location.pathname.includes('contact.html')) {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Basic form validation
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value.trim();
                const privacy = document.getElementById('privacy').checked;

                if (!name || !email || !subject || !message || !privacy) {
                    alert('Please fill in all required fields and accept the privacy policy.');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                // Here you would typically send the form data to a server
                // For demo purposes, we'll just log it to console
                console.log('Form submitted:', { name, email, subject, message });
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            });
        }
    }

    // Blog search functionality
    if (window.location.pathname.includes('blog.html')) {
        const searchInput = document.querySelector('input[type="text"]');
        const articles = document.querySelectorAll('article');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();

                articles.forEach(article => {
                    const title = article.querySelector('h2').textContent.toLowerCase();
                    const content = article.querySelector('p').textContent.toLowerCase();

                    if (title.includes(searchTerm) || content.includes(searchTerm)) {
                        article.style.display = 'block';
                    } else {
                        article.style.display = 'none';
                    }
                });
            });
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    scrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// Theme toggle functionality (if implemented)
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        // Save preference to localStorage
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
}
