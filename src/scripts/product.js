document.addEventListener("DOMContentLoaded", () => {
    const catalogContainer = document.getElementById("productos-container");
    const detalleContainer = document.getElementById("detalle-container");
    const recomendadosContainer = document.getElementById("recomendados-container");
    const carritoBadge = document.querySelector(".btn-cart .badge");

    // ===== Función para actualizar badge del carrito =====
    function actualizarCarritoBadge() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoBadge.textContent = carrito.length;
    }

    // ===== Renderizar catálogo =====
    function renderCatalog(productosArray) {
        if (!catalogContainer) return;
        catalogContainer.innerHTML = "";

        const categorias = [...new Set(productosArray.map(p => p.categoria))];

        categorias.forEach(cat => {
            const titulo = document.createElement("h4");
            titulo.className = "mb-4";
            titulo.textContent = cat;
            catalogContainer.appendChild(titulo);

            const row = document.createElement("div");
            row.className = "row row-cols-1 row-cols-md-3 g-4 mb-5";

            productosArray
                .filter(p => p.categoria === cat)
                .forEach(producto => {
                    const col = document.createElement("div");
                    col.className = "col";
                    col.innerHTML = `
                        <div class="card h-100 shadow-sm" data-category="${producto.categoria}" data-price="${producto.precio}">
                            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">$${producto.precio.toLocaleString("es-CL")} CLP</p>
                            </div>
                            <div class="card-footer text-center">
                                <button class="btn ver-detalle" data-id="${producto.id}">Ver Detalle</button>
                            </div>
                        </div>
                    `;
                    row.appendChild(col);
                });

            catalogContainer.appendChild(row);
        });

        // Evento para ver detalle desde catálogo
        catalogContainer.addEventListener("click", e => {
            if (e.target.classList.contains("ver-detalle")) {
                const idProducto = e.target.getAttribute("data-id");
                localStorage.setItem("productoSeleccionado", idProducto);
                window.location.href = "detalleProducto.html";
            }
        });
    }

    // ===== Renderizar detalle del producto =====
    function renderDetalle() {
        if (!detalleContainer) return;

        const idProducto = localStorage.getItem("productoSeleccionado");
        if (!idProducto) {
            detalleContainer.innerHTML = "<p class='text-center'>No se encontró el producto.</p>";
            return;
        }

        const producto = productos.find(p => p.id == idProducto);
        if (!producto) {
            detalleContainer.innerHTML = "<p class='text-center'>Producto no disponible.</p>";
            return;
        }

        detalleContainer.innerHTML = `
            <div class="row gx-4 gx-lg-5">
                <!-- Columna izquierda: Imagen principal y mini-galería -->
                <div class="col-lg-6">
                    <div class="card shadow-sm mb-3 detalle-card">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top main-img">
                    </div>
                    <div class="d-flex gap-2">
                        ${producto.imagenesAdicionales?.map(img => `
                            <div class="card shadow-sm mini-card" style="width: 70px; cursor: pointer;">
                                <img src="${img}" class="card-img-top" alt="${producto.nombre}">
                            </div>
                        `).join('') || ''}
                    </div>
                </div>

                <!-- Columna derecha: Información del producto -->
                <div class="col-lg-6 d-flex flex-column justify-content-start">
                    <h2>${producto.nombre}</h2>
                    <p class="precio">$${producto.precio.toLocaleString("es-CL")} CLP</p>
                    <p class="descripcion">${producto.descripcion || "Sin descripción disponible."}</p>

                    <label for="cantidad">Cantidad</label>
                    <input type="number" id="cantidad" class="form-control mb-3" value="1" min="1" style="max-width: 5rem;">

                    <button class="btn btn-primary btn-agregar" data-id="${producto.id}">
                        <i class="bi bi-cart-fill"></i> Añadir al carrito
                    </button>
                </div>
            </div>
        `;

        // Guardamos la imagen principal original
        const mainImg = detalleContainer.querySelector(".main-img");
        const imgPrincipal = mainImg.src;

        // Mini-galería: cambiar imagen principal
        detalleContainer.querySelectorAll(".mini-card img").forEach(img => {
            img.addEventListener("click", e => {
                if (e.target.src === imgPrincipal) {
                    mainImg.src = imgPrincipal; // volver a la original
                } else {
                    mainImg.src = e.target.src;
                }
            });
        });

    }

    // ===== Renderizar productos recomendados =====
    function renderRecomendados() {
        if (!recomendadosContainer) return;

        const idProducto = localStorage.getItem("productoSeleccionado");
        const productoActual = productos.find(p => p.id == idProducto);
        if (!productoActual) return;

        const recomendados = productos
            .filter(p => p.categoria === productoActual.categoria && p.id != productoActual.id)
            .slice(0, 4);

        recomendadosContainer.innerHTML = "";

        recomendados.forEach(producto => {
            const col = document.createElement("div");
            col.className = "col";
            col.innerHTML = `
                <div class="card h-100 shadow-sm" data-category="${producto.categoria}" data-price="${producto.precio}">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio.toLocaleString("es-CL")} CLP</p>
                    </div>
                    <div class="card-footer text-center">
                        <button class="btn ver-detalle" data-id="${producto.id}">Ver Detalle</button>
                    </div>
                </div>
            `;
            recomendadosContainer.appendChild(col);
        });

        // Evento para ver detalle desde recomendados
        recomendadosContainer.addEventListener("click", e => {
            if (e.target.classList.contains("ver-detalle")) {
                const idProducto = e.target.getAttribute("data-id");
                localStorage.setItem("productoSeleccionado", idProducto);
                window.location.href = "detalleProducto.html";
            }
        });
    }

    // ===== Filtros y orden catálogo =====
    const filterSelect = document.getElementById("filter-category");
    const sortSelect = document.getElementById("sort-products");

    if (catalogContainer) {
        filterSelect?.addEventListener("change", () => {
            const value = filterSelect.value;
            renderCatalog(value === "all" ? productos : productos.filter(p => p.categoria === value));
        });

        sortSelect?.addEventListener("change", () => {
            let sorted = [...productos];
            if (sortSelect.value === "low-price") sorted.sort((a, b) => a.precio - b.precio);
            else if (sortSelect.value === "high-price") sorted.sort((a, b) => b.precio - a.precio);
            renderCatalog(sorted);
        });
    }

    // ===== Inicialización =====
    if (catalogContainer) renderCatalog(productos);
    if (detalleContainer) {
        renderDetalle();
        renderRecomendados();
    }
    actualizarCarritoBadge();
});
