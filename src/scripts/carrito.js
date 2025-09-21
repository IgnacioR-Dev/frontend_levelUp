document.addEventListener("DOMContentLoaded", () => {
    const cartItemsEl = document.getElementById("cartItems");
    const cartTotalEl = document.getElementById("cartTotal");
    const clearCartBtn = document.getElementById("clearCart");
    const checkoutBtn = document.getElementById("checkout");

    // Helpers (simulados para este ejemplo)
    const getUserCart =
        window._getUserCart 

    const setUserCart =
        window._setUserCart ||
        ((c) => localStorage.setItem("cart", JSON.stringify(c)));
    const clearUserCart =
        window._clearUserCart || (() => localStorage.removeItem("cart"));
    const updateCartBadge = window._updateCartBadge || (() => {});

    // Función para sanitizar el carrito y eliminar elementos no válidos
    function sanitizeCart(cart) {
        return cart.filter((item) => item && item.quantity > 0 && item.price >= 0);
    }

    // Función para mostrar mensajes con modal
    function showMessage(title, message) {
        if (window._showMessage) {
            window._showMessage(title, message);
        } else {
            // Fallback a alert si la función no está disponible
            alert(`${title}: ${message}`);
        }
    }

    // Función para confirmaciones con modal
    async function showConfirm(title, message) {
        if (window._showConfirm) {
            return await window._showConfirm(title, message);
        } else {
            // Fallback a confirm si la función no está disponible
            return confirm(`${title}: ${message}`);
        }
    }

    function renderCart() {
        let cart = getUserCart() || [];
        // Sanitizar el carrito para eliminar elementos no válidos
        cart = sanitizeCart(cart);
        setUserCart(cart); // Guardar el carrito sanitizado

        cartItemsEl.innerHTML = "";

        if (!cart || cart.length === 0) {
            cartItemsEl.innerHTML = `
                <div class="alert alert-warning empty-cart" role="alert">
                    <i class="bi bi-cart4"></i> Tu carrito está vacío.
                </div>
            `;
            cartTotalEl.textContent = "0";
            updateCartBadge();
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            // Asegurar que la cantidad nunca sea menor a 1
            if (item.quantity < 1) item.quantity = 1;

            total += item.price * (item.quantity || 0);

            const itemEl = document.createElement("div");
            itemEl.className =
                "cart-item d-flex justify-content-between align-items-center";
            itemEl.innerHTML = `
                <img src="${item.imagen || "https://via.placeholder.com/70"}" alt="${item.name}" class="cart-item-img" style="width:70px;height:70px;object-fit:cover;">
                <div class="item-info flex-grow-1 ms-3">
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="mb-1 text-muted">Precio unitario: $${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <span class="me-2">Cantidad:</span>
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-outline-secondary decrease" data-index="${index}">-</button>
                            <span class="quantity-badge">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary increase" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger remove mt-2" data-index="${index}">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </div>
                <div class="text-end">
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
            `;

            cartItemsEl.appendChild(itemEl);
        });

        cartTotalEl.textContent = total.toFixed(2);
        updateCartBadge();

        // listeners para botones de incremento
        document.querySelectorAll(".increase").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.dataset.index, 10);
                const cart = getUserCart();
                if (cart[idx]) {
                    cart[idx].quantity = (cart[idx].quantity || 0) + 1;
                    
                    // Validar límite máximo
                    if (cart[idx].quantity > 100) {
                        showMessage("Límite alcanzado", "No puedes tener más de 100 unidades de un mismo producto");
                        cart[idx].quantity = 100;
                    }
                    
                    setUserCart(cart);
                    renderCart();
                }
            });
        });

        // listeners para botones de decremento
        document.querySelectorAll(".decrease").forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                const idx = parseInt(e.target.dataset.index, 10);
                const cart = getUserCart();
                if (cart[idx]) {
                    // Prevenir cantidades menores a 1
                    if (cart[idx].quantity > 1) {
                        cart[idx].quantity--;
                        setUserCart(cart);
                        renderCart();
                    } else {
                        // Si la cantidad es 1, preguntar si desea eliminar
                        const confirmed = await showConfirm(
                            "Eliminar producto", 
                            `¿Desea eliminar "${cart[idx].name}" del carrito?`
                        );
                        
                        if (confirmed) {
                            cart.splice(idx, 1);
                            setUserCart(cart);
                            renderCart();
                        }
                    }
                }
            });
        });

        // listeners para botones de eliminar
        document.querySelectorAll(".remove").forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                const idx = parseInt(e.target.dataset.index, 10);
                const cart = getUserCart();
                if (cart[idx]) {
                    const confirmed = await showConfirm(
                        "Eliminar producto", 
                        `¿Está seguro de eliminar "${cart[idx].name}" del carrito?`
                    );
                    
                    if (confirmed) {
                        cart.splice(idx, 1);
                        setUserCart(cart);
                        renderCart();
                    }
                }
            });
        });
    }

    // Vaciar carrito (con confirmación)
    clearCartBtn.addEventListener("click", async () => {
        const confirmed = await showConfirm(
            "Vaciar carrito", 
            "¿Seguro que quieres vaciar todo el carrito? Esta acción no se puede deshacer."
        );
        
        if (confirmed) {
            clearUserCart();
            renderCart();
        }
    });

    // Checkout (simulado)
    checkoutBtn.addEventListener("click", async () => {
        const cart = getUserCart();
        if (!cart || cart.length === 0) {
            showMessage("Carrito vacío", "Tu carrito está vacío.");
            return;
        }
        
        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        
        const confirmed = await showConfirm(
            "Finalizar compra", 
            `¿Desea finalizar la compra? Total: $${total.toFixed(2)}`
        );
        
        if (confirmed) {
            showMessage("Compra exitosa", `¡Gracias por su compra! Total: $${total.toFixed(2)}`);
            clearUserCart();
            renderCart();
        }
    });

    // Inicializar el carrito
    renderCart();
});