// global.js

document.addEventListener("DOMContentLoaded", () => {

    // ===== Obtener usuario actual =====
    function getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"));
    }

    // ===== Carrito por usuario =====
    function getUserCart() {
        const user = getCurrentUser();
        if (!user) return [];
        const cartKey = `cart_${user.email}`;
        return JSON.parse(localStorage.getItem(cartKey)) || [];
    }

    function setUserCart(cart) {
        const user = getCurrentUser();
        if (!user) return;
        const cartKey = `cart_${user.email}`;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartBadge();
    }

    // ===== Añadir producto al carrito =====
    window.addToCart = function(product, cantidad = 1) {
        const cart = getUserCart();
        const index = cart.findIndex(p => p.id === product.id);
        if(index > -1){
            cart[index].quantity += cantidad;
        } else {
            cart.push({...product, quantity: cantidad});
        }
        setUserCart(cart);
        alert(`${cantidad} unidad(es) de ${product.name} agregadas al carrito.`);
    }

    // ===== Actualizar badge =====
    function updateCartBadge() {
        const badge = document.getElementById('carrito-badge');
        const cart = getUserCart();
        const total = cart.reduce((acc, p) => acc + p.quantity, 0);
        if(badge) badge.textContent = total;
    }

    updateCartBadge();

    // ===== Determinar rutas según ubicación de la página =====
    const isTemplate = location.pathname.includes("/templates/");
    const loginHref = isTemplate ? "login.html" : "templates/login.html";
    const indexHref = isTemplate ? "index.html" : "../index.html";

    // ===== Actualizar botón de login =====
    const btnLogin = document.querySelector(".btn-login");
    const currentUser = getCurrentUser();

    if(btnLogin){
        if(currentUser){
            btnLogin.innerHTML = `Cerrar Sesión <i class="bi bi-box-arrow-right"></i>`;
            btnLogin.href = "#";
            btnLogin.addEventListener("click", () => {
                localStorage.removeItem("currentUser");
                window.location.href = indexHref; // redirige correctamente al index
            });
        } else {
            btnLogin.innerHTML = `Iniciar Sesión <i class="bi bi-box-arrow-in-right"></i>`;
            btnLogin.href = loginHref; // abre login correctamente
        }
    }

});
