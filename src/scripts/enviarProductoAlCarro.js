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

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const index = cart.findIndex(p => p.id === product.id);
            if(index > -1){
                cart[index].quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} agregado al carrito`);
        });
    });
});
