// ===== FUNCIONES PARA MOSTRAR MODALES =====
function showMessage(title, message) {
    // Verificar si Bootstrap está disponible
    if (typeof bootstrap === 'undefined' || !bootstrap.Modal) {
        alert(`${title}: ${message}`);
        return;
    }
    
    const messageModalEl = document.getElementById('messageModal');
    if (!messageModalEl) {
        alert(`${title}: ${message}`);
        return;
    }
    
    const messageModal = new bootstrap.Modal(messageModalEl);
    const titleEl = document.getElementById('messageModalTitle');
    const bodyEl = document.getElementById('messageModalBody');
    
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = message;
    
    messageModal.show();
}

function showConfirm(title, message) {
    return new Promise((resolve) => {
        // Verificar si Bootstrap está disponible
        if (typeof bootstrap === 'undefined' || !bootstrap.Modal) {
            const confirmed = confirm(`${title}: ${message}`);
            resolve(confirmed);
            return;
        }
        
        const confirmModalEl = document.getElementById('confirmModal');
        if (!confirmModalEl) {
            const confirmed = confirm(`${title}: ${message}`);
            resolve(confirmed);
            return;
        }

        const confirmModal = new bootstrap.Modal(confirmModalEl);
        const titleEl = document.getElementById('confirmModalTitle');
        const bodyEl = document.getElementById('confirmModalBody');
        const confirmYesBtn = document.getElementById('confirmModalYes');
        
        if (titleEl) titleEl.textContent = title;
        if (bodyEl) bodyEl.textContent = message;

        let resolved = false;

        const handleConfirm = () => {
            if (resolved) return;
            resolved = true;
            cleanup();
            resolve(true);
            confirmModal.hide();
        };

        const handleClose = () => {
            if (resolved) return;
            resolved = true;
            cleanup();
            resolve(false);
        };

        function cleanup() {
            if (confirmYesBtn) {
                confirmYesBtn.removeEventListener('click', handleConfirm);
            }
            confirmModalEl.removeEventListener('hidden.bs.modal', handleClose);
        }

        if (confirmYesBtn) {
            // Clonar el botón para evitar listeners duplicados
            const newConfirmYesBtn = confirmYesBtn.cloneNode(true);
            confirmYesBtn.parentNode.replaceChild(newConfirmYesBtn, confirmYesBtn);
            newConfirmYesBtn.addEventListener('click', handleConfirm);
        }
        
        confirmModalEl.addEventListener('hidden.bs.modal', handleClose);
        confirmModal.show();
    });
}

// ===== Obtener usuario actual =====
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("currentUser"));
    } catch (err) { 
        console.error("Error al obtener usuario:", err);
        return null; 
    }
}

// ===== Función para sanitizar el carrito =====
function sanitizeCart(cart) {
    if (!Array.isArray(cart)) return [];
    
    return cart.filter(item => 
        item && 
        typeof item === 'object' &&
        item.id && 
        item.name &&
        typeof item.quantity === 'number' && 
        item.quantity > 0 && 
        !isNaN(item.quantity) &&
        typeof item.price === 'number' && 
        item.price >= 0 &&
        !isNaN(item.price)
    );
}

// ===== Carrito por usuario =====
function getUserCart() {
    const user = getCurrentUser();
    if (!user || !user.email) return [];
    
    const cartKey = `cart_${user.email}`;
    try {
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        return sanitizeCart(cart);
    } catch (err) {
        console.error("Error al obtener carrito:", err);
        return [];
    }
}

function setUserCart(cart) {
    const user = getCurrentUser();
    if (!user || !user.email) {
        return;
    }
    
    const sanitizedCart = sanitizeCart(cart);
    const cartKey = `cart_${user.email}`;
    
    try {
        localStorage.setItem(cartKey, JSON.stringify(sanitizedCart));
        updateCartBadge();
    } catch (err) {
        console.error("Error al guardar carrito:", err);
    }
}

function clearUserCart() {
    const user = getCurrentUser();
    if (!user || !user.email) return;
    
    const cartKey = `cart_${user.email}`;
    try {
        localStorage.removeItem(cartKey);
        updateCartBadge();
    } catch (err) {
        console.error("Error al limpiar carrito:", err);
    }
}

// ===== Añadir producto al carrito =====
window.addToCart = async function(product, cantidad = 1) {
    // Validaciones del producto
    if (!product || !product.id || !product.name) {
        console.error("Producto inválido:", product);
        showMessage("Error", "Producto inválido");
        return false;
    }
    
    // Validaciones de cantidad
    if (typeof cantidad !== 'number' || isNaN(cantidad) || cantidad <= 0) {
        console.error("Cantidad inválida:", cantidad);
        showMessage("Error", "Cantidad inválida");
        return false;
    }
    
    // Validaciones de precio
    if (typeof product.price !== 'number' || isNaN(product.price) || product.price < 0) {
        console.error("Precio inválido:", product.price);
        showMessage("Error", "Precio inválido");
        return false;
    }
    
    const cart = getUserCart();
    const index = cart.findIndex(p => p.id === product.id);
    
    if (index > -1) {
        // Incrementar cantidad pero validar máximo
        const nuevaCantidad = cart[index].quantity + cantidad;
        
        // Validar límite máximo (100 unidades por producto)
        if (nuevaCantidad > 100) {
            showMessage("Límite alcanzado", `No puedes tener más de 100 unidades de ${product.name}. Se ajustará al máximo permitido.`);
            cart[index].quantity = 100;
        } else {
            cart[index].quantity = nuevaCantidad;
        }
    } else {
        // Validar que no se exceda el máximo al agregar nuevo producto
        if (cantidad > 100) {
            showMessage("Límite alcanzado", `No puedes agregar más de 100 unidades de ${product.name}. Se ajustará al máximo permitido.`);
            cantidad = 100;
        }
        cart.push({ ...product, quantity: cantidad });
    }
    
    setUserCart(cart);
    showMessage("Producto agregado", `${cantidad} unidad(es) de ${product.name} agregadas al carrito.`);
    return true;
}

// ===== Actualizar badge =====
function updateCartBadge() {
    const badge = document.getElementById('carrito-badge') || document.querySelector('.btn-cart .badge');
    if (!badge) return;
    
    const cart = getUserCart();
    const total = cart.reduce((acc, p) => acc + (p.quantity || 0), 0);
    
    // Actualizar badge y mostrar/ocultar según contenido
    badge.textContent = total;
    if (total > 0) {
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

// ===== Función para eliminar producto del carrito =====
window.removeFromCart = async function(productId) {
    const cart = getUserCart();
    const product = cart.find(item => item.id === productId);
    
    if (!product) return cart;
    
    // Usar confirmación modal
    const confirmed = await showConfirm(
        "Eliminar producto", 
        `¿Estás seguro de que quieres eliminar ${product.name} del carrito?`
    );
    
    if (confirmed) {
        const newCart = cart.filter(item => item.id !== productId);
        setUserCart(newCart);
        showMessage("Producto eliminado", `${product.name} ha sido eliminado del carrito.`);
        return newCart;
    }
    
    return cart;
}

// ===== Función para actualizar cantidad =====
window.updateCartQuantity = async function(productId, newQuantity) {
    if (newQuantity <= 0) {
        return await removeFromCart(productId);
    }
    
    // Validar límite máximo
    if (newQuantity > 100) {
        showMessage("Límite alcanzado", "No puedes tener más de 100 unidades de un mismo producto");
        newQuantity = 100;
    }
    
    const cart = getUserCart();
    const index = cart.findIndex(item => item.id === productId);
    
    if (index > -1) {
        cart[index].quantity = newQuantity;
        setUserCart(cart);
    }
    
    return cart;
}

// ===== Configurar botón de login =====
function setupLoginButton() {
    const btnLogin = document.querySelector(".btn-login");
    if (!btnLogin) return;
    
    const currentUser = getCurrentUser();
    const isTemplate = window.location.pathname.includes("/templates/");
    const loginHref = isTemplate ? "login.html" : "templates/login.html";
    
    // Clonar el botón para eliminar event listeners previos
    const newBtnLogin = btnLogin.cloneNode(true);
    btnLogin.parentNode.replaceChild(newBtnLogin, btnLogin);

    if (currentUser) {
        newBtnLogin.innerHTML = `Cerrar Sesión <i class="bi bi-box-arrow-right"></i>`;
        newBtnLogin.href = "#";
        newBtnLogin.onclick = async (e) => {
            e.preventDefault();
            
            // Preguntar confirmación antes de cerrar sesión
            const confirmed = await showConfirm(
                "Cerrar sesión", 
                "¿Estás seguro de que quieres cerrar la sesión?"
            );
            
            if (confirmed) {
                localStorage.removeItem("currentUser");
                clearUserCart();
                window.location.href = loginHref;
            }
        };
    } else {
        newBtnLogin.innerHTML = `Iniciar Sesión <i class="bi bi-box-arrow-in-right"></i>`;
        newBtnLogin.href = loginHref;
        newBtnLogin.onclick = null;
    }
}

// ===== Inicialización =====
function initializeApp() {
    // Llamada inicial
    updateCartBadge();
    setupLoginButton();
    
    // Exponer helpers globalmente para que otras páginas puedan llamarlos
    window._getCurrentUser = getCurrentUser;
    window._getUserCart = getUserCart;
    window._setUserCart = setUserCart;
    window._clearUserCart = clearUserCart;
    window._updateCartBadge = updateCartBadge;
    window._sanitizeCart = sanitizeCart;
    window._showMessage = showMessage;
    window._showConfirm = showConfirm;
}

// ===== Event Listener Principal =====
document.addEventListener("DOMContentLoaded", initializeApp);

// También inicializar si el DOM ya está cargado
if (document.readyState !== 'loading') {
    setTimeout(initializeApp, 100);
}