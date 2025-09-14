document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("filter-category");
  const sortSelect = document.getElementById("sort-products");
  const productsContainer = document.getElementById("productosSection");

  // Guardamos el orden original de todas las columnas
  const allRows = Array.from(productsContainer.querySelectorAll(".row"));
  const originalOrder = allRows.map(row => Array.from(row.querySelectorAll(".col")));

  function filterAndSort() {
    const selectedCategory = categorySelect.value;
    const sortOrder = sortSelect.value;

    allRows.forEach((row, rowIndex) => {
      const cols = Array.from(row.querySelectorAll(".col"));
      
      // Filtrar columnas según la categoría
      cols.forEach(col => {
        const card = col.querySelector(".card");
        col.style.display = (selectedCategory === "all" || card.dataset.category === selectedCategory) ? "" : "none";
      });

      // Ordenar columnas visibles por precio dentro de la fila
      const visibleCols = cols.filter(col => col.style.display !== "none");

      if (sortOrder === "low-price") {
        visibleCols.sort((a, b) => {
          const priceA = parseInt(a.querySelector(".card").dataset.price.replace(/\D/g, ""));
          const priceB = parseInt(b.querySelector(".card").dataset.price.replace(/\D/g, ""));
          return priceA - priceB;
        });
      } else if (sortOrder === "high-price") {
        visibleCols.sort((a, b) => {
          const priceA = parseInt(a.querySelector(".card").dataset.price.replace(/\D/g, ""));
          const priceB = parseInt(b.querySelector(".card").dataset.price.replace(/\D/g, ""));
          return priceB - priceA;
        });
      } else {
        // Restaurar orden original dentro de la fila
        visibleCols.sort((a, b) => originalOrder[rowIndex].indexOf(a) - originalOrder[rowIndex].indexOf(b));
      }

      // Reinsertar columnas visibles en orden correcto sin mover filas
      visibleCols.forEach(col => row.appendChild(col));

      // Mostrar/ocultar título de la categoría (h4 anterior a la fila)
      const title = row.previousElementSibling;
      if (title && title.tagName === "H4") {
        const anyVisible = visibleCols.length > 0;
        title.style.display = anyVisible ? "" : "none";
      }
    });
  }

  categorySelect.addEventListener("change", filterAndSort);
  sortSelect.addEventListener("change", filterAndSort);

  // Inicializar mostrando todo
  filterAndSort();
});





// Obtener la categoría de la query string
const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');

if (categoria && categoria !== 'all') {
    const selectCategory = document.getElementById('filter-category');
    selectCategory.value = categoria;

    // Disparar el filtro automáticamente
    filterProductsByCategory(categoria);

    // Hacer scroll directo a la sección de productos
    const productosSection = document.getElementById('productosSection');
    if (productosSection) {
        // Scroll suave a la sección
        productosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Función que filtra productos por categoría
function filterProductsByCategory(cat) {
    const cards = document.querySelectorAll('#productosSection .card');
    cards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
            card.parentElement.style.display = 'block';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
}

// Actualizar filtro si el usuario cambia el select manualmente
document.getElementById('filter-category').addEventListener('change', (e) => {
    filterProductsByCategory(e.target.value);
});
