document.addEventListener("DOMContentLoaded", () => {
    const catalogContainer = document.getElementById("productos-container");
    const detalleContainer = document.getElementById("detalle-container");
    const recomendadosContainer = document.getElementById("recomendados-container");
    const filterSelect = document.getElementById("filter-category");
    const sortSelect = document.getElementById("sort-products");

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

            productosArray.filter(p => p.categoria === cat).forEach(producto => {
                const col = document.createElement("div");
                col.className = "col";
                col.innerHTML = `
                    <div class="card h-100 shadow-sm" data-category="${producto.categoria}" data-price="${producto.precio}">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$${producto.precio.toLocaleString("es-CL")} CLP</p>
                        </div>
                        <div class="card-footer text-center d-flex justify-content-between">
                            <button class="btn ver-detalle" data-id="${producto.id}">Ver Detalle</button>
                            <button class="btn btn-success add-to-cart" 
                                data-id="${producto.id}" 
                                data-name="${producto.nombre}" 
                                data-price="${producto.precio}" 
                                data-img="${producto.imagen}">
                                <i class="bi bi-cart-fill"></i> Añadir
                            </button>
                        </div>
                    </div>
                `;
                row.appendChild(col);
            });

            catalogContainer.appendChild(row);
        });

        // Delegación de eventos para ver detalle y agregar al carrito
        catalogContainer.addEventListener("click", e => {
            if (e.target.classList.contains("ver-detalle")) {
                const idProducto = e.target.getAttribute("data-id");
                localStorage.setItem("productoSeleccionado", idProducto);
                window.location.href = "detalleProducto.html";
            } else if (e.target.closest(".add-to-cart")) {
                const btn = e.target.closest(".add-to-cart");
                const product = {
                    id: btn.dataset.id,
                    name: btn.dataset.name,
                    price: parseFloat(btn.dataset.price),
                    imagen: btn.dataset.img
                };
                window.addToCart(product);
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

        const mainImg = detalleContainer.querySelector(".main-img");
        const imgPrincipal = mainImg.src;

        detalleContainer.querySelectorAll(".mini-card img").forEach(img => {
            img.addEventListener("click", e => {
                mainImg.src = e.target.src === imgPrincipal ? imgPrincipal : e.target.src;
            });
        });

        // Botón agregar al carrito
        const btnAgregar = detalleContainer.querySelector(".btn-agregar");
        btnAgregar.addEventListener("click", () => {
            const cantidad = parseInt(detalleContainer.querySelector("#cantidad").value) || 1;
            const product = {
                id: producto.id,
                name: producto.nombre,
                price: producto.precio,
                imagen: producto.imagen
            };
            window.addToCart(product, cantidad);
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

        recomendadosContainer.addEventListener("click", e => {
            if (e.target.classList.contains("ver-detalle")) {
                const idProducto = e.target.getAttribute("data-id");
                localStorage.setItem("productoSeleccionado", idProducto);
                window.location.href = "detalleProducto.html";
            }
        });
    }

    // ===== Filtros y orden catálogo =====
    if (catalogContainer) {
        let productosFiltrados = [...productos];
        let productosOriginales = [...productosFiltrados];

        filterSelect?.addEventListener("change", () => {
            const value = filterSelect.value;
            productosFiltrados = value === "all" ? [...productos] : productos.filter(p => p.categoria === value);
            productosOriginales = [...productosFiltrados];
            if (sortSelect) sortSelect.value = "default";
            renderCatalog(productosFiltrados);
        });

        sortSelect?.addEventListener("change", () => {
            if (!sortSelect) return;

            if (sortSelect.value === "low-price") {
                productosFiltrados.sort((a, b) => a.precio - b.precio);
            } else if (sortSelect.value === "high-price") {
                productosFiltrados.sort((a, b) => b.precio - a.precio);
            } else {
                productosFiltrados = [...productosOriginales];
            }

            renderCatalog(productosFiltrados);
        });

        // Aplicar categoría seleccionada desde index automáticamente
        const categoriaSeleccionada = localStorage.getItem("categoriaSeleccionada");
        if (categoriaSeleccionada && categoriaSeleccionada !== "all") {
            filterSelect.value = categoriaSeleccionada;
            productosFiltrados = productos.filter(p => p.categoria === categoriaSeleccionada);
            productosOriginales = [...productosFiltrados];
            renderCatalog(productosFiltrados);

            setTimeout(() => {
                const tituloCategoria = Array.from(document.querySelectorAll('#productos-container h4'))
                    .find(h4 => h4.textContent.trim() === categoriaSeleccionada);

                if (tituloCategoria) {
                    const headerOffset = document.querySelector('header')?.offsetHeight || 0;
                    const elementPosition = tituloCategoria.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }

                localStorage.removeItem("categoriaSeleccionada");
            }, 50);
        } else {
            productosFiltrados = [...productos];
            productosOriginales = [...productosFiltrados];
            renderCatalog(productosFiltrados);
        }
    }

    // ===== Inicialización detalle y recomendados =====
    if (detalleContainer) {
        renderDetalle();
        renderRecomendados();
    }
});
