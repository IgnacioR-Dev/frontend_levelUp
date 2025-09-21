document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', e => {
            const product = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price),
                imagen: btn.dataset.img,
                quantity: 1
            };

            // Validar que los datos del producto sean correctos
            if (!product.id || !product.name || isNaN(product.price) || product.price <= 0) {
                alert('Error: Información del producto inválida');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const index = cart.findIndex(p => p.id === product.id);
            
            if (index > -1) {
                // Incrementar cantidad pero validar que no exceda límites
                cart[index].quantity++;
                
                // Validar que no se exceda un máximo razonable (opcional)
                if (cart[index].quantity > 100) {
                    alert('No puedes agregar más de 100 unidades de un mismo producto');
                    cart[index].quantity = 100;
                }
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Actualizar badge del carrito si existe
            if (typeof updateCartBadge === 'function') {
                updateCartBadge();
            }
        });
    });
});