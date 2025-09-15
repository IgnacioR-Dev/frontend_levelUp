// global.js
document.addEventListener("DOMContentLoaded", () => {

    // ===== Obtener usuario actual =====
    function getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem("currentUser"));
        } catch (err) { return null; }
    }

    // ===== Carrito por usuario =====
    function getUserCart() {
        const user = getCurrentUser();
        if (!user) return []; // si no hay user devolvemos array vacío
        const cartKey = `cart_${user.email}`;
        try {
            return JSON.parse(localStorage.getItem(cartKey)) || [];
        } catch (err) {
            return [];
        }
    }

    function setUserCart(cart) {
        const user = getCurrentUser();
        if (!user) {
            // Si quieres soportar carrito para usuarios anónimos puedes guardar en 'cart' aquí.
            return;
        }
        const cartKey = `cart_${user.email}`;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartBadge();
    }

    function clearUserCart() {
        const user = getCurrentUser();
        if (!user) return;
        const cartKey = `cart_${user.email}`;
        localStorage.removeItem(cartKey);
        updateCartBadge();
    }

    // ===== Añadir producto al carrito (expuesto) =====
    window.addToCart = function(product, cantidad = 1) {
        const cart = getUserCart();
        const index = cart.findIndex(p => p.id === product.id);
        if (index > -1) {
            cart[index].quantity += cantidad;
        } else {
            cart.push({ ...product, quantity: cantidad });
        }
        setUserCart(cart);
        alert(`${cantidad} unidad(es) de ${product.name} agregadas al carrito.`);
    }

    // ===== Actualizar badge =====
    function updateCartBadge() {
        const badge = document.getElementById('carrito-badge') || document.querySelector('.btn-cart .badge');
        const cart = getUserCart();
        const total = cart.reduce((acc, p) => acc + (p.quantity || 0), 0);
        if (badge) badge.textContent = total;
    }

    // Exponer helpers globalmente para que otras páginas puedan llamarlos
    window._getCurrentUser = getCurrentUser;
    window._getUserCart = getUserCart;
    window._setUserCart = setUserCart;
    window._clearUserCart = clearUserCart;
    window._updateCartBadge = updateCartBadge;

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
            btnLogin.addEventListener("click", () => {
                localStorage.removeItem("currentUser");
                // opcional: cuando se cierra sesión también limpiar badge/local state
                window._updateCartBadge();
                window.location.href = loginHref;
            });
        } else {
            btnLogin.innerHTML = `Iniciar Sesión <i class="bi bi-box-arrow-in-right"></i>`;
            btnLogin.href = loginHref;
        }
    }

});
