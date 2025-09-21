// ===== FUNCIONES PARA MOSTRAR MODALES =====
function showMessage(title, message) {
  const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
  document.getElementById('messageModalTitle').textContent = title;
  document.getElementById('messageModalBody').textContent = message;
  messageModal.show();
}

function showConfirm(title, message) {
  return new Promise((resolve) => {
    const confirmModalEl = document.getElementById('confirmModal');
    const confirmModal = new bootstrap.Modal(confirmModalEl);
    document.getElementById('confirmModalTitle').textContent = title;
    document.getElementById('confirmModalBody').textContent = message;

    const confirmYesBtn = document.getElementById('confirmModalYes');
    let resolved = false; // 🔑 Evita múltiples resolve

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

    // Limpieza de listeners
    function cleanup() {
      confirmYesBtn.removeEventListener('click', handleConfirm);
      confirmModalEl.removeEventListener('hidden.bs.modal', handleClose);
    }

    confirmYesBtn.addEventListener('click', handleConfirm);
    confirmModalEl.addEventListener('hidden.bs.modal', handleClose);

    confirmModal.show();
  });
}

document.addEventListener("DOMContentLoaded", () => {

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
        if (!user || !user.email) return []; // si no hay user devolvemos array vacío
        
        const cartKey = `cart_${user.email}`;
        try {
            const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
            return sanitizeCart(cart); // Sanitizar al obtener
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

    // ===== Añadir producto al carrito  =====
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

    // Exponer helpers globalmente para que otras páginas puedan llamarlos
    window._getCurrentUser = getCurrentUser;
    window._getUserCart = getUserCart;
    window._setUserCart = setUserCart;
    window._clearUserCart = clearUserCart;
    window._updateCartBadge = updateCartBadge;
    window._sanitizeCart = sanitizeCart;
    window._showMessage = showMessage;
    window._showConfirm = showConfirm;

    // Llamada inicial
    updateCartBadge();

    // ===== Determinar rutas según ubicación de la página =====
    const isTemplate = location.pathname.includes("/templates/");
    const loginHref = isTemplate ? "login.html" : "templates/login.html";

    // ===== Actualizar botón de login =====
    const btnLogin = document.querySelector(".btn-login");
    const currentUser = getCurrentUser();

    if (btnLogin) {
        if (currentUser) {
            btnLogin.innerHTML = `Cerrar Sesión <i class="bi bi-box-arrow-right"></i>`;
            btnLogin.href = "#";
            btnLogin.onclick = async (e) => {
                e.preventDefault();
                
                // Preguntar confirmación antes de cerrar sesión
                const confirmed = await showConfirm(
                    "Cerrar sesión", 
                    "¿Estás seguro de que quieres cerrar la sesión?"
                );
                
                if (confirmed) {
                    localStorage.removeItem("currentUser");
                    // Limpiar carrito al cerrar sesión (opcional)
                    clearUserCart();
                    window.location.href = loginHref;
                }
            };
        } else {
            btnLogin.innerHTML = `Iniciar Sesión <i class="bi bi-box-arrow-in-right"></i>`;
            btnLogin.href = loginHref;
            btnLogin.onclick = null;
        }
    }

});
