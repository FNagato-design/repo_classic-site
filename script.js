// Navigation and Section Management
class NavigationManager {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.showSection(targetSection);
                this.updateActiveNavLink(link);
            });
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    setupSmoothScrolling() {
        // Smooth scrolling for CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection('products');
                this.updateActiveNavLink(document.querySelector('[href="#products"]'));
            });
        }
    }
}

// Product Management
class ProductManager {
    constructor() {
        this.products = {
            living: [
                {
                    id: 1,
                    title: "Sofa Zen",
                    description: "Divano minimalista in legno di teak con cuscini in lino naturale",
                    material: "Legno di teak, lino naturale",
                    dimensions: "200x90x80 cm",
                    price: "€ 4.500",
                    image: "🛋️"
                },
                {
                    id: 2,
                    title: "Tavolino Sakura",
                    description: "Tavolino basso in legno di ciliegio con finitura naturale",
                    material: "Legno di ciliegio",
                    dimensions: "120x60x35 cm",
                    price: "€ 1.200",
                    image: "🪑"
                },
                {
                    id: 3,
                    title: "Libreria Origami",
                    description: "Libreria modulare con design geometrico ispirato agli origami",
                    material: "Legno di quercia, acciaio",
                    dimensions: "180x40x200 cm",
                    price: "€ 2.800",
                    image: "📚"
                }
            ],
            bedroom: [
                {
                    id: 4,
                    title: "Letto Futon",
                    description: "Letto basso in stile giapponese con materasso in lattice",
                    material: "Legno di acero, lattice naturale",
                    dimensions: "160x200x25 cm",
                    price: "€ 3.200",
                    image: "🛏️"
                },
                {
                    id: 5,
                    title: "Comò Wabi-Sabi",
                    description: "Comò con finitura naturale che celebra l'imperfezione",
                    material: "Legno di noce, ferro battuto",
                    dimensions: "120x50x80 cm",
                    price: "€ 1.800",
                    image: "🗄️"
                },
                {
                    id: 6,
                    title: "Specchio Kintsugi",
                    description: "Specchio con cornice decorata con tecnica kintsugi",
                    material: "Legno di ciliegio, foglia d'oro",
                    dimensions: "80x120 cm",
                    price: "€ 950",
                    image: "🪞"
                }
            ],
            dining: [
                {
                    id: 7,
                    title: "Tavolo Kaiseki",
                    description: "Tavolo da pranzo in legno massello con finitura opaca",
                    material: "Legno di quercia massello",
                    dimensions: "200x100x75 cm",
                    price: "€ 5.500",
                    image: "🍽️"
                },
                {
                    id: 8,
                    title: "Sedie Bamboo",
                    description: "Set di 6 sedie con struttura in bambù e seduta in rattan",
                    material: "Bambù, rattan naturale",
                    dimensions: "45x45x85 cm",
                    price: "€ 2.400",
                    image: "🪑"
                },
                {
                    id: 9,
                    title: "Credenza Shibui",
                    description: "Credenza con ante scorrevoli e interni in cedro",
                    material: "Legno di cedro, ferro",
                    dimensions: "180x50x90 cm",
                    price: "€ 3.600",
                    image: "🏺"
                }
            ]
        };
        this.currentCategory = 'living';
        this.init();
    }

    init() {
        this.setupCategoryTabs();
        this.setupProductModal();
        this.loadProducts('living');
    }

    setupCategoryTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active tab
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Load products for selected category
                const category = button.getAttribute('data-category');
                this.loadProducts(category);
            });
        });
    }

    loadProducts(category) {
        const productsGrid = document.getElementById('products-grid');
        const products = this.products[category] || [];
        
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imageDiv = document.createElement('div');
        imageDiv.className = 'product-image';
        const imageSpan = document.createElement('span');
        imageSpan.textContent = product.image;
        imageDiv.appendChild(imageSpan);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-info';

        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = product.title;

        const desc = document.createElement('p');
        desc.className = 'product-description';
        desc.textContent = product.description;

        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = product.price;

        infoDiv.appendChild(title);
        infoDiv.appendChild(desc);
        infoDiv.appendChild(price);
        card.appendChild(imageDiv);
        card.appendChild(infoDiv);

        card.addEventListener('click', () => {
            this.showProductModal(product);
        });

        return card;
    }
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price}</div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            this.showProductModal(product);
        });
        
        return card;
    }

    setupProductModal() {
        this.modal = document.getElementById('product-modal');
        this.closeBtn = document.querySelector('.close');
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.hideProductModal();
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideProductModal();
            }
        });
    }

    showProductModal(product) {
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalMaterial = document.getElementById('modal-material');
        const modalDimensions = document.getElementById('modal-dimensions');
        const modalPrice = document.getElementById('modal-price');

        // Update modal content safely
        modalImage.removeAttribute('src');
        modalImage.alt = product.title;
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modalMaterial.textContent = product.material;
        modalDimensions.textContent = product.dimensions;
        modalPrice.textContent = product.price;

        // Show modal using cached reference
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hideProductModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    hideProductModal() {
        const modal = document.getElementById('product-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Contact Form Management
class ContactFormManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupFormSubmission();
    }

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error styling
        field.classList.remove('error');
        this.removeErrorMessage(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Questo campo è obbligatorio';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Inserisci un indirizzo email valido';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\+?(?:[0-9][ \-().]*){7,}[0-9]$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Inserisci un numero di telefono valido';
            }
        }
        
        if (!isValid) {
            field.classList.add('error');
            this.showErrorMessage(field, errorMessage);
        }
        
        return isValid;
    }

    showErrorMessage(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        
        field.parentNode.appendChild(errorDiv);
    }

    removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    setupFormSubmission() {
        const form = document.getElementById('contact-form');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }

    validateForm() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('input, select, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }

    submitForm() {
        const form = document.getElementById('contact-form');
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;

        // TODO: sostituire con endpoint reale
        fetch('/api/contact', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error('Errore di rete');
            this.showSuccessMessage();
            form.reset();
        })
        .catch(() => {
            // Fallback: mostra comunque il messaggio in ambiente demo
            this.showSuccessMessage();
            form.reset();
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
    }

    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = 'background:#d4edda;color:#155724;padding:1rem;border-radius:5px;margin-top:1rem;text-align:center;';

        const strong = document.createElement('strong');
        strong.textContent = 'Grazie per il tuo messaggio!';
        successDiv.appendChild(strong);
        successDiv.appendChild(document.createElement('br'));
        successDiv.appendChild(document.createTextNode('Ti contatteremo presto per rispondere alla tua richiesta.'));

        const form = document.getElementById('contact-form');
        form.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
    new ProductManager();
    new ContactFormManager();
    
    // Add loading animation – opacity:0 deve essere nel CSS su body prima del paint
    document.body.classList.add('fade-in');
});

// Add CSS for form validation
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--dark-charcoal);
        padding: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);
