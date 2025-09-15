// ===== Datos de prueba (después puedes traerlos de una API o JSON) =====
const blogs = [
    {
        id: 1,
        titulo: "Top 5 juegos más esperados del 2026",
        descripcion: "Los títulos que todos los gamers esperan para el próximo año.",
        imagen: "../assets/img/post.jpg",
        contenido: `
            <p>Los 5 juegos más esperados para 2026 son Grand Theft Auto VI, Resident Evil Requiem, Fable, Nioh 3 y 007 Primera Luz, según los análisis de Quartz y otros medios. Otros títulos muy esperados incluyen Lords of the Fallen 2, Onimusha Way of the Sword, y Resonance: A Plague Tale Legacy, un juego free-to-play con elementos similares a Pokémon y un regreso de la saga A Plague Tale.</p>

            <h3>1. Grand Theft Auto VI</h3>
            <p><strong>Desarrollador:</strong> Rockstar Games<br>
            <strong>Plataformas:</strong> PlayStation 5 y Xbox Series X/S<br>
            <strong>Descripción:</strong> La esperada secuela de la franquicia GTA, con lanzamiento previsto para 2026.</p>

            <h3>2. Resident Evil Requiem</h3>
            <p><strong>Plataformas:</strong> No especificadas<br>
            <strong>Descripción:</strong> La novena entrada principal de la serie, que contará con un nuevo protagonista y el regreso a la ciudad de Raccoon City.</p>

            <h3>3. Fable</h3>
            <p><strong>Desarrollador:</strong> Playground Games<br>
            <strong>Plataformas:</strong> Xbox Series<br>
            <strong>Descripción:</strong> El reinicio de la saga, cuyo lanzamiento se retrasó de 2025 a 2026.</p>

            <h3>4. Nioh 3</h3>
            <p><strong>Plataformas:</strong> PlayStation 5 y PC<br>
            <strong>Descripción:</strong> Este título de acción y aventura presenta un mundo abierto y dos estilos de combate, con lanzamiento a principios de 2026.</p>

            <h3>5. 007 Primera Luz</h3>
            <p><strong>Desarrollador:</strong> IO Interactive<br>
            <strong>Plataformas:</strong> No especificadas<br>
            <strong>Descripción:</strong> Un nuevo juego de la franquicia 007, con lanzamiento previsto para 2026.</p>
        `
    },
    {
        id: 2,
        titulo: "Guía para armar tu primer setup gamer",
        descripcion: "Consejos y recomendaciones para armar tu estación de juego sin gastar de más.",
        imagen: "../assets/img/pc.jpg",
        contenido: `
            <p>Armar un setup gamer puede ser costoso, pero no tiene por qué serlo. Con estos consejos, podrás crear una estación de juego cómoda, eficiente y atractiva, adaptada a tu presupuesto.</p>
            
            <h3>1. Escoge la base: escritorio y silla</h3>
            <p>Elige un escritorio espacioso y estable, preferiblemente con espacio para monitor, teclado y periféricos. La silla debe ser ergonómica para evitar molestias en sesiones largas de juego.</p>
            
            <h3>2. Hardware principal</h3>
            <ul>
                <li><strong>PC o consola:</strong> Define si quieres un setup basado en PC o consola según tus preferencias.</li>
                <li><strong>Monitor:</strong> Una pantalla con al menos 1080p y 60Hz. Si puedes, opta por 144Hz para juegos más fluidos.</li>
                <li><strong>Periféricos:</strong> Teclado mecánico, mouse ergonómico y auriculares cómodos.</li>
            </ul>
            
            <h3>3. Iluminación y ambiente</h3>
            <p>Una buena iluminación reduce la fatiga visual. Considera luces LED detrás del monitor y mantén el espacio ordenado.</p>
            
            <h3>4. Organización de cables</h3>
            <p>Usa bridas, canaletas o cajas organizadoras para que los cables no se enreden y tu escritorio luzca limpio.</p>
            
            <h3>5. Decoración y confort</h3>
            <p>Agrega elementos personales: posters, figuras, o plantas pequeñas. Mantén ventilación adecuada para tus dispositivos.</p>

            <blockquote>Tip: No siempre lo más caro es lo mejor. Prioriza ergonomía y eficiencia sobre estética si tu presupuesto es limitado.</blockquote>
        `
    }
];


// ===== Función para renderizar listado de blogs =====
function renderListado() {
    const blogContainer = document.getElementById("blog-container");
    if (!blogContainer) return;

    blogs.forEach((blog, index) => {
        const div = document.createElement("div");
        div.className = `blog-hero-container rounded shadow mb-5 ${index % 2 === 1 ? 'odd' : ''}`;
        div.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-6 text-center text-md-start mb-4">
                    <h3 class="blog-title">${blog.titulo}</h3>
                    <p class="blog-subtitle">${blog.descripcion}</p>
                    <button class="btn btn-primary ver-blog" data-id="${blog.id}">Leer más</button>
                </div>
                <div class="col-md-6 text-center">
                    <img src="${blog.imagen}" alt="${blog.titulo}" class="img-fluid blog-hero-img rounded">
                </div>
            </div>
        `;
        blogContainer.appendChild(div);
    });

    blogContainer.addEventListener("click", e => {
        if (e.target.classList.contains("ver-blog")) {
            const id = e.target.getAttribute("data-id");
            const blog = blogs.find(b => b.id == id);
            if (blog) {
                localStorage.setItem("blogSeleccionado", JSON.stringify(blog));
                window.location.href = "detalleBlog.html";
            }
        }
    });
}

// ===== Función para renderizar detalle del blog =====
function renderDetalle() {
    const blogDetalleEl = document.getElementById("blog-detalle");
    if (!blogDetalleEl) return;

    const blog = JSON.parse(localStorage.getItem("blogSeleccionado"));
    if (!blog) {
        blogDetalleEl.innerHTML = "<p>No se encontró el blog.</p>";
        return;
    }

    blogDetalleEl.innerHTML = `
        <div class="blog-header-wrapper">
            <img src="${blog.imagen}" alt="${blog.titulo}" class="blog-header-img">
            <div class="blog-header-text">
                <h2>${blog.titulo}</h2>
                <p>${blog.descripcion}</p>
            </div>
        </div>
        <div class="blog-body">
            ${blog.contenido}
        </div>
    `;
}

// ===== Ejecutar la función correspondiente según la página =====
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("blog-container")) {
        renderListado(); // Página de listado
    }
    if (document.getElementById("blog-detalle")) {
        renderDetalle(); // Página de detalle
    }
});
