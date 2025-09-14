// Filtro por categoría
filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    if (value === "all") {
        renderCatalog(productos);
    } else {
        renderCatalog(productos.filter((p) => p.categoria === value));
    }
});

// Ordenar productos
sortSelect.addEventListener("change", () => {
    let sorted = [...productos];
    if (sortSelect.value === "low-price") {
        sorted.sort((a, b) => a.precio - b.precio);
    } else if (sortSelect.value === "high-price") {
        sorted.sort((a, b) => b.precio - a.precio);
    }
    renderCatalog(sorted);
});
