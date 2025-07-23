// CARRITO SIMPLE Y AUTÓNOMO
console.log('🛒 Cargando carrito simple...');

// Variables globales
let cart = [];
let cartCount = 0;

// Función para agregar al carrito
function addToCartSimple(productName, price, imageSrc = null, category = '') {
    console.log('🛒 Agregando al carrito:', { productName, price, imageSrc, category });
    
    // Convertir precio a número
    let numericPrice = price;
    if (typeof price === 'string') {
        numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    }
    
    // Buscar si el producto ya existe
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
        console.log('📈 Cantidad actualizada:', existingItem.quantity);
    } else {
        cart.push({
            name: productName,
            price: numericPrice,
            quantity: 1,
            image: imageSrc,
            category: category
        });
        console.log('➕ Nuevo producto agregado');
    }
    
    // Actualizar contador
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Actualizar display
    updateCartDisplaySimple();
    
    // Mostrar notificación
    showNotification(`${productName} agregado al carrito`);
    
    console.log('🛒 Carrito actual:', cart);
    console.log('📦 Total de items:', cartCount);
}

// Función para actualizar el display del carrito
function updateCartDisplaySimple() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartEmptyElement = document.getElementById('cart-empty');
    const cartFooterElement = document.getElementById('cart-footer');
    const totalAmountElement = document.getElementById('total-amount');
    
    console.log('🔄 Actualizando display del carrito...');
    console.log('🔍 Elementos encontrados:', {
        cartCount: !!cartCountElement,
        cartItems: !!cartItemsElement,
        cartEmpty: !!cartEmptyElement,
        cartFooter: !!cartFooterElement,
        totalAmount: !!totalAmountElement
    });
    console.log('📊 Estado del carrito:', {
        itemsCount: cart.length,
        totalItems: cartCount,
        items: cart
    });
    
    // Actualizar contador
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    
    if (cart.length === 0) {
        // Carrito vacío
        if (cartEmptyElement) cartEmptyElement.style.display = 'block';
        if (cartFooterElement) cartFooterElement.style.display = 'none';
        if (cartItemsElement) cartItemsElement.innerHTML = '';
        console.log('🛒 Carrito vacío');
    } else {
        // Carrito con items
        if (cartEmptyElement) cartEmptyElement.style.display = 'none';
        if (cartFooterElement) cartFooterElement.style.display = 'block';
        
        // Calcular total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (totalAmountElement) {
            totalAmountElement.textContent = `$${total.toFixed(2)}`;
        }
        
        // Renderizar items
        if (cartItemsElement) {
            console.log('🎨 Renderizando', cart.length, 'items del carrito...');
            
            const itemsHTML = cart.map(item => {
                const itemTotal = (item.price * item.quantity).toFixed(2);
                console.log('📦 Renderizando item:', item.name, 'cantidad:', item.quantity, 'precio:', item.price);
                
                return `
                    <div class="cart-item" data-name="${item.name}" style="display: flex !important; visibility: visible !important; opacity: 1 !important;">
                        <div class="cart-item-image" style="display: flex !important; visibility: visible !important;">
                            ${item.image ? `<img src="${item.image}" alt="${item.name}" style="display: block !important; visibility: visible !important;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : ''}
                            <div style="display: ${item.image ? 'none' : 'flex'}; width: 100%; height: 100%; align-items: center; justify-content: center; background: linear-gradient(135deg, #fce4ec, #f8bbd9); border-radius: 10px; font-size: 2rem;">🍰</div>
                        </div>
                        <div class="cart-item-info" style="display: flex !important; visibility: visible !important;">
                            <div class="cart-item-title" style="display: block !important; visibility: visible !important;">${item.name}</div>
                            <div class="cart-item-price" style="display: block !important; visibility: visible !important;">$${item.price.toFixed(2)}</div>
                            <div class="cart-item-quantity" style="display: flex !important; visibility: visible !important;">
                                <button class="quantity-btn" onclick="updateQuantitySimple('${item.name}', ${item.quantity - 1})" title="Reducir cantidad" style="display: flex !important; visibility: visible !important;">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="quantity-display" style="display: block !important; visibility: visible !important;">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantitySimple('${item.name}', ${item.quantity + 1})" title="Aumentar cantidad" style="display: flex !important; visibility: visible !important;">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCartSimple('${item.name}')" title="Eliminar producto" style="display: flex !important; visibility: visible !important;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            }).join('');
            
            cartItemsElement.innerHTML = itemsHTML;
            cartItemsElement.style.display = 'block';
            cartItemsElement.style.visibility = 'visible';
            cartItemsElement.style.opacity = '1';
            
            console.log('✅ HTML del carrito generado:', itemsHTML.length, 'caracteres');
            console.log('🎯 Elementos del carrito encontrados después del render:', cartItemsElement.children.length);
        } else {
            console.error('❌ Elemento cart-items no encontrado!');
        }
        
        console.log('💰 Total:', total);
    }
}

// Función para actualizar cantidad
function updateQuantitySimple(productName, newQuantity) {
    console.log('📊 Actualizando cantidad:', productName, 'a', newQuantity);
    
    if (newQuantity <= 0) {
        removeFromCartSimple(productName);
    } else {
        const item = cart.find(item => item.name === productName);
        if (item) {
            item.quantity = newQuantity;
            cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            updateCartDisplaySimple();
        }
    }
}

// Función para remover del carrito
function removeFromCartSimple(productName) {
    console.log('🗑️ Removiendo del carrito:', productName);
    
    cart = cart.filter(item => item.name !== productName);
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateCartDisplaySimple();
    showNotification('Producto removido del carrito');
}

// Función para mostrar notificaciones
function showNotification(message) {
    console.log('🔔 Notificación:', message);
    
    // Crear notificación
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
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Función para alternar el carrito
function toggleCartSimple() {
    console.log('🔄 Alternando carrito');
    
    const cartSidebar = document.getElementById('cart-sidebar');
    
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
        
        // NO aplicar sombreado a toda la página
        // El carrito se abre sin afectar el resto de la página
    }
}

// Función para cerrar el carrito
function closeCartSimple() {
    console.log('❌ Cerrando carrito');
    
    const cartSidebar = document.getElementById('cart-sidebar');
    
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando carrito simple...');
    
    // Buscar botones de agregar al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    console.log('🔍 Botones encontrados:', addToCartButtons.length);
    
    // Agregar event listeners a cada botón
    addToCartButtons.forEach((button, index) => {
        console.log(`🔘 Botón ${index + 1}:`, {
            name: button.getAttribute('data-name'),
            price: button.getAttribute('data-price'),
            image: button.getAttribute('data-image')
        });
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🖱️ Botón clickeado:', this.getAttribute('data-name'));
            
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            const productImage = this.getAttribute('data-image');
            const productCategory = this.closest('.menu-item')?.getAttribute('data-category') || '';
            
            if (!productName || !productPrice) {
                console.error('❌ Datos faltantes:', { productName, productPrice });
                showNotification('Error: Datos del producto incompletos');
                return;
            }
            
            // Agregar al carrito
            addToCartSimple(productName, productPrice, productImage, productCategory);
            
            // Feedback visual
            this.classList.add('added');
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
            
            // Resetear botón después de 2 segundos
            setTimeout(() => {
                this.classList.remove('added');
                this.innerHTML = originalHTML;
            }, 2000);
            
            // Abrir carrito en móviles
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    toggleCartSimple();
                }, 500);
            }
        });
    });
    
    // Agregar event listeners para el carrito
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    
    if (cartToggle) {
        cartToggle.addEventListener('click', toggleCartSimple);
        console.log('✅ Event listener agregado a cart-toggle');
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', closeCartSimple);
        console.log('✅ Event listener agregado a cart-close');
    }
    
                // Inicializar display del carrito
            updateCartDisplaySimple();
            
            // Agregar event listener para el botón de WhatsApp
            const whatsappButton = document.getElementById('whatsapp-order');
            if (whatsappButton) {
                whatsappButton.addEventListener('click', sendWhatsAppOrder);
                console.log('✅ Event listener agregado a whatsapp-order');
            }
            
            console.log('✅ Carrito simple inicializado correctamente');
});

// Función para enviar pedido por WhatsApp
function sendWhatsAppOrder() {
    console.log('📱 Enviando pedido por WhatsApp...');
    
    if (cart.length === 0) {
        showNotification('El carrito está vacío');
        return;
    }
    
    // Calcular total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Crear mensaje
    let message = '🍰 *PEDIDO - DAME UN BESITO* 🍰\n\n';
    message += 'Hola! Quiero hacer el siguiente pedido:\n\n';
    
    // Agregar cada producto
    cart.forEach((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        message += `${index + 1}. *${item.name}*\n`;
        message += `   Cantidad: ${item.quantity}\n`;
        message += `   Precio unitario: $${item.price.toFixed(2)}\n`;
        message += `   Subtotal: $${itemTotal}\n\n`;
    });
    
    // Agregar total
    message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    message += `💰 *TOTAL DEL PEDIDO: $${total.toFixed(2)}* 💰\n\n`;
    message += '📞 Por favor, confirma mi pedido y coordina la entrega.\n';
    message += '📍 Dirección de entrega: [Especificar dirección]\n';
    message += '📱 Mi número: [Especificar número]\n\n';
    message += '¡Gracias! 😊';
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Número de WhatsApp (reemplazar con tu número)
    const phoneNumber = '12025318540'; // Número de USA: +1 (202) 531-8540
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    console.log('📱 URL de WhatsApp generada:', whatsappURL);
    console.log('📝 Mensaje:', message);
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Mostrar notificación
    showNotification('Abriendo WhatsApp...');
}

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .add-to-cart-btn.added {
        background: #4caf50 !important;
        transform: scale(1.05);
    }
    
    .cart-notification {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

console.log('✅ Carrito simple cargado completamente'); 