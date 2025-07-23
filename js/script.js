// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
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

// Add to Cart Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productName = this.getAttribute('data-name');
            const productPrice = parseInt(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
            
            // Add to cart
            addToCart(productName, productPrice, productImage);
            
            // Visual feedback
            this.classList.add('added');
            this.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.classList.remove('added');
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Agregar al Carrito';
            }, 2000);
            
            // Show cart notification
            showCartNotification(`${productName} agregado al carrito`);
            
            // Open cart on mobile devices
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    toggleCart();
                }, 500);
            }
        });
    });
});

// Menu Category Filtering
const tabButtons = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        menuItems.forEach(item => {
            if (category === 'todos' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Show message function
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message before the form
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(messageDiv, form);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature, .product-card, .testimonial, .menu-item, .direction-card, .attraction-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Product image lazy loading
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Price formatting
function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(price);
}

// Update prices on page load
// document.addEventListener('DOMContentLoaded', () => {
//     const priceElements = document.querySelectorAll('.price');
//     priceElements.forEach(element => {
//         const price = element.textContent;
//         if (price.includes('$')) {
//             const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
//             if (!isNaN(numericPrice)) {
//                 element.textContent = formatPrice(numericPrice);
//             }
//         }
//     });
// });

// Search functionality for menu items
function createSearchFunctionality() {
    const menuItems = document.querySelectorAll('.menu-item');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchInput = document.getElementById('menu-search');
    const searchClear = document.getElementById('search-clear');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            // Show/hide clear button
            if (searchTerm.length > 0) {
                searchClear.classList.add('visible');
            } else {
                searchClear.classList.remove('visible');
            }
            
            menuItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Reset category buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabButtons[0].classList.add('active'); // "Todos" button
        });
        
        // Clear search functionality
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.classList.remove('visible');
                
                // Show all items
                menuItems.forEach(item => {
                    item.style.display = 'block';
                });
                
                // Reset to "Todos" category
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabButtons[0].classList.add('active');
            });
        }
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('menu.html')) {
        createSearchFunctionality();
    }
});

// Shopping Cart functionality
let cart = [];

function addToCart(productName, price, imageSrc = null, category = '') {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1,
            image: imageSrc,
            category: category
        });
    }
    
    updateCartDisplay();
    showCartNotification(`${productName} agregado al carrito`);
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
    showCartNotification('Producto removido del carrito');
}

function updateQuantity(productName, newQuantity) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productName);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    const cartCount = document.getElementById('cart-count');
    const totalAmount = document.getElementById('total-amount');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.classList.remove('has-items');
        cartEmpty.style.display = 'block';
        cartFooter.style.display = 'none';
    } else {
        cartItems.classList.add('has-items');
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';
        
        // Calculate total
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            return sum + (price * item.quantity);
        }, 0);
        
        totalAmount.textContent = `$${total.toFixed(2)}`;
        
        // Render cart items
        cartItems.innerHTML = cart.map(item => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            const itemTotal = (price * item.quantity).toFixed(2);
            
            return `
                <div class="cart-item" data-name="${item.name}">
                    <div class="cart-item-image">
                        ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '🍰'}
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    }
}

function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #e91e63;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Cart toggle functionality
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
    
    // Prevent body scroll when cart is open
    if (cartSidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// WhatsApp order functionality
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        showCartNotification('El carrito está vacío');
        return;
    }
    
    // Mostrar panel de información del cliente
    showCustomerInfoPanel();
}

function showCustomerInfoPanel() {
    // Crear modal de información del cliente
    const modal = document.createElement('div');
    modal.className = 'customer-info-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        border-radius: 15px;
        padding: 2rem;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #666;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const title = document.createElement('h3');
    title.textContent = '📋 Información del Pedido';
    title.style.cssText = `
        color: #e91e63;
        margin-bottom: 1.5rem;
        font-size: 1.4rem;
        text-align: center;
    `;
    
    // Crear formulario
    const form = document.createElement('form');
    form.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `;
    
    // Nombre
    const nameGroup = createFormGroup('Nombre completo *', 'text', 'customer-name', true);
    
    // Teléfono
    const phoneGroup = createFormGroup('Teléfono *', 'tel', 'customer-phone', true);
    
    // Tipo de entrega
    const deliveryGroup = document.createElement('div');
    deliveryGroup.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    `;
    
    const deliveryLabel = document.createElement('label');
    deliveryLabel.textContent = 'Tipo de entrega *';
    deliveryLabel.style.cssText = `
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
    `;
    
    const deliveryOptions = document.createElement('div');
    deliveryOptions.style.cssText = `
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    `;
    
    const deliveryRadio = createRadioOption('delivery-type', 'delivery', '🚚 Delivery', true);
    const pickupRadio = createRadioOption('delivery-type', 'pickup', '🏪 Retirar en local');
    
    deliveryOptions.appendChild(deliveryRadio);
    deliveryOptions.appendChild(pickupRadio);
    deliveryGroup.appendChild(deliveryLabel);
    deliveryGroup.appendChild(deliveryOptions);
    
    // Dirección (inicialmente visible)
    const addressGroup = createFormGroup('Dirección de entrega *', 'text', 'customer-address', true);
    
    // Notas adicionales
    const notesGroup = createFormGroup('Notas adicionales (opcional)', 'textarea', 'customer-notes', false);
    
    // Agregar elementos al formulario
    form.appendChild(nameGroup);
    form.appendChild(phoneGroup);
    form.appendChild(deliveryGroup);
    form.appendChild(addressGroup);
    form.appendChild(notesGroup);
    
    // Botones
    const buttonGroup = document.createElement('div');
    buttonGroup.style.cssText = `
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    `;
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.type = 'button';
    cancelBtn.style.cssText = `
        flex: 1;
        padding: 12px;
        border: 2px solid #e91e63;
        background: none;
        color: #e91e63;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    const continueBtn = document.createElement('button');
    continueBtn.textContent = 'Continuar con WhatsApp';
    continueBtn.type = 'submit';
    continueBtn.style.cssText = `
        flex: 2;
        padding: 12px;
        background-color: #25d366;
        color: white;
        border: none;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    buttonGroup.appendChild(cancelBtn);
    buttonGroup.appendChild(continueBtn);
    
    // Event listeners
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Toggle dirección según tipo de entrega
    const addressInput = addressGroup.querySelector('input');
    const deliveryInput = deliveryRadio.querySelector('input');
    const pickupInput = pickupRadio.querySelector('input');
    
    deliveryInput.addEventListener('change', () => {
        addressInput.required = true;
        addressInput.disabled = false;
        addressInput.style.opacity = '1';
    });
    
    pickupInput.addEventListener('change', () => {
        addressInput.required = false;
        addressInput.disabled = true;
        addressInput.value = 'Retirar en local';
        addressInput.style.opacity = '0.5';
    });
    
    // Manejar envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('customer-name').value.trim(),
            phone: document.getElementById('customer-phone').value.trim(),
            deliveryType: document.querySelector('input[name="delivery-type"]:checked').value,
            address: document.getElementById('customer-address').value.trim(),
            notes: document.getElementById('customer-notes').value.trim()
        };
        
        // Validar campos requeridos
        if (!formData.name || !formData.phone) {
            showCartNotification('Por favor completa todos los campos requeridos');
            return;
        }
        
        if (formData.deliveryType === 'delivery' && !formData.address) {
            showCartNotification('Por favor ingresa la dirección de entrega');
            return;
        }
        
        // Cerrar modal y mostrar vista previa con información del cliente
        document.body.removeChild(modal);
        showMessagePreview(formData);
    });
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(form);
    modalContent.appendChild(buttonGroup);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function createFormGroup(labelText, inputType, inputId, isRequired) {
    const group = document.createElement('div');
    group.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    `;
    
    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = inputId;
    label.style.cssText = `
        font-weight: 600;
        color: #333;
    `;
    
    let input;
    if (inputType === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 3;
        input.placeholder = 'Ej: Sin nueces, para celíacos, etc.';
    } else {
        input = document.createElement('input');
        input.type = inputType;
        input.placeholder = inputType === 'tel' ? '+54 9 11 1234-5678' : 'Ingresa tu ' + labelText.toLowerCase();
    }
    
    input.id = inputId;
    input.required = isRequired;
    input.style.cssText = `
        padding: 12px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    `;
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '#e91e63';
    });
    
    input.addEventListener('blur', () => {
        input.style.borderColor = '#e0e0e0';
    });
    
    group.appendChild(label);
    group.appendChild(input);
    
    return group;
}

function createRadioOption(name, value, labelText, isChecked = false) {
    const container = document.createElement('div');
    container.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = name;
    radio.value = value;
    radio.checked = isChecked;
    radio.style.cssText = `
        margin: 0;
    `;
    
    const label = document.createElement('label');
    label.textContent = labelText;
    label.style.cssText = `
        margin: 0;
        cursor: pointer;
        font-weight: 500;
    `;
    
    container.appendChild(radio);
    container.appendChild(label);
    
    // Estilo hover y seleccionado
    container.addEventListener('mouseenter', () => {
        container.style.borderColor = '#e91e63';
        container.style.backgroundColor = '#fce4ec';
    });
    
    container.addEventListener('mouseleave', () => {
        if (!radio.checked) {
            container.style.borderColor = '#e0e0e0';
            container.style.backgroundColor = 'transparent';
        }
    });
    
    radio.addEventListener('change', () => {
        // Resetear todos los contenedores
        document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
            r.closest('div').style.borderColor = '#e0e0e0';
            r.closest('div').style.backgroundColor = 'transparent';
        });
        
        // Resaltar el seleccionado
        if (radio.checked) {
            container.style.borderColor = '#e91e63';
            container.style.backgroundColor = '#fce4ec';
        }
    });
    
    // Aplicar estilo inicial si está seleccionado
    if (isChecked) {
        container.style.borderColor = '#e91e63';
        container.style.backgroundColor = '#fce4ec';
    }
    
    return container;
}

function showMessagePreview(customerData = null) {
    const message = generateOrderMessage(customerData);
    
    // Crear modal de vista previa
    const modal = document.createElement('div');
    modal.className = 'message-preview-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        border-radius: 15px;
        padding: 2rem;
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #666;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const title = document.createElement('h3');
    title.textContent = '📱 Vista Previa del Mensaje de WhatsApp';
    title.style.cssText = `
        color: #e91e63;
        margin-bottom: 1rem;
        font-size: 1.3rem;
    `;
    
    const messagePreview = document.createElement('div');
    messagePreview.textContent = message;
    messagePreview.style.cssText = `
        background-color: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem 0;
        white-space: pre-wrap;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        line-height: 1.4;
        max-height: 300px;
        overflow-y: auto;
    `;
    
    const sendButton = document.createElement('button');
    sendButton.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar por WhatsApp';
    sendButton.style.cssText = `
        background-color: #25d366;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
        margin-top: 1rem;
    `;
    
    sendButton.addEventListener('click', () => {
        const phoneNumber = '+12025318540';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        document.body.removeChild(modal);
        closeCart();
        showCartNotification('¡Pedido enviado por WhatsApp!');
    });
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(messagePreview);
    modalContent.appendChild(sendButton);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function generateOrderMessage(customerData = null) {
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Agrupar productos por categoría
    const categories = {};
    cart.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    
    let message = `🍰 *PEDIDO - DAME UN BESITO* 🍰\n\n`;
    
    // Información del cliente si está disponible
    if (customerData) {
        message += `👤 *INFORMACIÓN DEL CLIENTE*\n`;
        message += `• Nombre: ${customerData.name}\n`;
        message += `• Teléfono: ${customerData.phone}\n`;
        message += `• Tipo de entrega: ${customerData.deliveryType === 'delivery' ? '🚚 Delivery' : '🏪 Retirar en local'}\n`;
        message += `• Dirección: ${customerData.address}\n`;
        if (customerData.notes) {
            message += `• Notas: ${customerData.notes}\n`;
        }
        message += `\n`;
    }
    
    message += `📦 *DETALLE DEL PEDIDO*\n\n`;
    
    // Agregar productos agrupados por categoría
    Object.keys(categories).forEach(category => {
        if (category) {
            message += `*${category.toUpperCase()}*\n`;
        }
        
        categories[category].forEach(item => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            const itemTotal = (price * item.quantity).toFixed(2);
            const emoji = getProductEmoji(item.name);
            message += `${emoji} ${item.name} x${item.quantity} - $${itemTotal}\n`;
        });
        message += `\n`;
    });
    
    // Resumen del pedido
    message += `📋 *RESUMEN DEL PEDIDO*\n`;
    message += `• Total de productos: ${totalItems}\n`;
    message += `• Categorías: ${Object.keys(categories).filter(cat => cat).length}\n`;
    message += `• *Total a pagar: $${total.toFixed(2)}*\n\n`;
    
    // Información de la pastelería
    message += `🏪 *INFORMACIÓN DE LA PASTELERÍA*\n`;
    message += `📍 Dirección: Nordelta, Tigre, Buenos Aires\n`;
    message += `📞 Teléfono: +1 (202) 531-8540\n`;
    message += `🕒 Horarios: Lunes a Domingo 8:00 AM - 8:00 PM\n\n`;
    
    // Mensaje personalizado según el contenido
    if (totalItems === 1) {
        message += `¡Me encantaría probar este producto! ¿Podrían confirmarme la disponibilidad? 😊`;
    } else if (totalItems <= 3) {
        message += `¡Se ve delicioso! ¿Podrían confirmarme la disponibilidad y el tiempo de entrega? 😋`;
    } else if (totalItems <= 6) {
        message += `¡Es para una celebración especial! ¿Podrían confirmarme la disponibilidad y el tiempo de entrega? 🎉`;
    } else {
        message += `¡Es para un evento grande! ¿Podrían confirmarme la disponibilidad y el tiempo de entrega? También me gustaría saber si hay descuentos por cantidad. 🎊`;
    }
    
    return message;
}

function getProductEmoji(productName) {
    const name = productName.toLowerCase();
    
    if (name.includes('cheesecake')) return '🧀';
    if (name.includes('torta rogel')) return '🎂';
    if (name.includes('billionaire shortbread')) return '🍪';
    if (name.includes('pasta frola')) return '🥧';
    if (name.includes('budín de limón') || name.includes('budin de limon')) return '🍋';
    if (name.includes('budín de banana') || name.includes('budin de banana')) return '🍌';
    if (name.includes('cookies') || name.includes('cookie')) return '🍪';
    if (name.includes('galleta')) return '🍪';
    if (name.includes('pastel') || name.includes('torta')) return '🎂';
    if (name.includes('chocolate')) return '🍫';
    if (name.includes('fruta') || name.includes('frutos')) return '🍓';
    if (name.includes('limón') || name.includes('limon')) return '🍋';
    if (name.includes('vainilla')) return '🌿';
    if (name.includes('coco')) return '🥥';
    if (name.includes('dulce de leche')) return '🥛';
    if (name.includes('banana')) return '🍌';
    if (name.includes('membrillo')) return '🍯';
    if (name.includes('merengue')) return '☁️';
    
    return '🍰'; // Emoji por defecto
}

// Add click handlers to product cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card, .menu-item');
    
    productCards.forEach(card => {
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'btn btn-primary add-to-cart-btn';
        addToCartBtn.textContent = 'Agregar al Carrito';
        addToCartBtn.style.cssText = `
            margin-top: 1rem;
            width: 100%;
        `;
        
        const productInfo = card.querySelector('.product-info, .item-info');
        if (productInfo) {
            const title = productInfo.querySelector('h3').textContent;
            const price = productInfo.querySelector('.price').textContent;
            const category = productInfo.querySelector('.category')?.textContent || '';
            const image = card.querySelector('img')?.src || null;
            
            addToCartBtn.addEventListener('click', () => {
                addToCart(title, price, image, category);
            });
            
            productInfo.appendChild(addToCartBtn);
        }
    });
    
    // Initialize cart functionality
    updateCartDisplay();
    
    // Add cart event listeners
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');
    const whatsappOrder = document.getElementById('whatsapp-order');
    
    if (cartToggle) cartToggle.addEventListener('click', toggleCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (whatsappOrder) whatsappOrder.addEventListener('click', sendWhatsAppOrder);
});

// Map functionality (if using Google Maps API)
function initMap() {
    // This would initialize Google Maps
    // For now, we'll just add a placeholder
    console.log('Map would be initialized here');
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                showMessage('Por favor, completa todos los campos requeridos.', 'error');
            }
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .menu-search:focus {
        border-color: #e91e63;
    }
    
    .cart-notification {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// Handle missing images
function handleMissingImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.background = 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)';
            this.style.color = '#e91e63';
            this.style.fontWeight = 'bold';
            this.style.fontSize = '1rem';
            this.style.textAlign = 'center';
            
            // Set different content based on image class or context
            if (this.classList.contains('logo-img')) {
                this.textContent = '🍰';
            } else if (this.alt.includes('hero') || this.alt.includes('pasteles')) {
                this.textContent = '🍰 Deliciosos Pasteles';
            } else if (this.alt.includes('alfajores')) {
                this.textContent = '🍪 Alfajores';
            } else if (this.alt.includes('cheesecake')) {
                this.textContent = '🧀 Cheesecake';
            } else if (this.alt.includes('pie')) {
                this.textContent = '🥧 Pie de Frutas';
            } else if (this.alt.includes('galletas')) {
                this.textContent = '🍪 Galletas';
            } else if (this.alt.includes('brigadeiros')) {
                this.textContent = '🍫 Brigadeiros';
            } else if (this.alt.includes('meringue')) {
                this.textContent = '☁️ Merengue';
            } else if (this.alt.includes('trufas')) {
                this.textContent = '🍫 Trufas';
            } else if (this.alt.includes('plaza') || this.alt.includes('museo') || this.alt.includes('parque')) {
                this.textContent = '📍 Atracción';
            } else {
                this.textContent = '🍰 Producto';
            }
        });
        
        // Check if image is already broken
        if (img.complete && img.naturalHeight === 0) {
            img.dispatchEvent(new Event('error'));
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dame Un Besito website loaded successfully!');
    
    // Handle missing images
    handleMissingImages();
    
    // Add some interactive elements
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('click', () => {
            logo.style.transform = 'scale(1.1)';
            setTimeout(() => {
                logo.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
}); 