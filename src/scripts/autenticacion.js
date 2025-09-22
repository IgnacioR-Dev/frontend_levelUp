// ==========================
// Usuarios ficticios
// ==========================
const users = [
    {
        email: "cliente@duoc.cl",
        password: "cliente1",
        role: "cliente"
    },
    {
        email: "admin@gmail.com",
        password: "admin1",
        role: "administrador"
    }
];

// ==========================
// Función para mostrar modales
// ==========================
function showModal(title, message, isError = false) {
    // Usar la función global si existe
    if (typeof window._showMessage === 'function') {
        window._showMessage(title, message);
        return;
    }
    
    // Fallback: crear modal dinámicamente si no existe
    let modalElement = document.getElementById('messageModal');
    
    if (!modalElement) {
        // Crear modal dinámicamente
        const modalHTML = `
        <div class="modal fade" id="messageModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header ${isError ? 'bg-danger text-white' : 'bg-primary text-white'}">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${message}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modalElement = document.getElementById('messageModal');
    } else {
        // Actualizar modal existente
        const modalTitle = modalElement.querySelector('.modal-title');
        const modalBody = modalElement.querySelector('.modal-body');
        const modalHeader = modalElement.querySelector('.modal-header');
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.textContent = message;
        if (modalHeader) {
            modalHeader.className = isError ? 
                'modal-header bg-danger text-white' : 
                'modal-header bg-primary text-white';
        }
    }
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// ==========================
// Validación de email
// ==========================
function validarEmail(email) {
    if (!email) return false; // Requerido
    if (email.length > 100) return false; // Máximo 100 caracteres

    // Solo permitimos dominios específicos
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    return dominiosPermitidos.some(d => email.endsWith(d));
}

// ==========================
// Validación de contraseña
// ==========================
function validarPassword(password) {
    if (!password) return false; // Requerido
    return password.length >= 4 && password.length <= 10;
}

// ==========================
// Login
// ==========================
function login(email, password) {
    if (!validarEmail(email)) {
        showModal("Error de validación", "Correo inválido. Debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com y tener máximo 100 caracteres.", true);
        return false;
    }

    if (!validarPassword(password)) {
        showModal("Error de validación", "Contraseña inválida. Debe tener entre 4 y 10 caracteres.", true);
        return false;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        showModal("¡Bienvenido!", `Bienvenido ${user.email}`);

        // Redirigir según rol después de cerrar el modal
        setTimeout(() => {
            if (user.role === "cliente") {
                window.location.href = "../index.html";
            } else if (user.role === "administrador") {
                window.location.href = "../templates/administrador.html";
            }
        }, 1500); // Esperar 1.5 segundos para que el usuario vea el mensaje

        return true;
    } else {
        showModal("Error de acceso", "Correo o contraseña incorrectos", true);
        return false;
    }
}

// ==========================
// Logout
// ==========================
function logout() {
    // Mostrar confirmación con modal
    if (typeof window._showConfirm === 'function') {
        window._showConfirm("Cerrar sesión", "¿Estás seguro de que quieres cerrar sesión?")
            .then(confirmed => {
                if (confirmed) {
                    performLogout();
                }
            });
    } else {
        // Fallback a confirm nativo
        if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
            performLogout();
        }
    }
}

function performLogout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// ==========================
// Obtener usuario actual
// ==========================
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("currentUser"));
    } catch (e) {
        return null;
    }
}

// ==========================
// Comprobar acceso según rol
// ==========================
function requireRole(role) {
    const user = getCurrentUser();
    if (!user || user.role !== role) {
        showModal("Acceso denegado", "No tienes permiso para acceder a esta página.", true);
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }
}

// ==========================
// Actualizar botón de login en header
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.querySelector(".btn-login");
    const currentUser = getCurrentUser();

    if (!btnLogin) return;

    if (currentUser) {
        btnLogin.innerHTML = `Cerrar Sesión <i class="bi bi-box-arrow-right"></i>`;
        btnLogin.href = "#";
        
        // Remover event listeners previos y agregar uno nuevo
        btnLogin.replaceWith(btnLogin.cloneNode(true));
        const newBtn = document.querySelector(".btn-login");
        newBtn.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    } else {
        btnLogin.innerHTML = `Iniciar Sesión <i class="bi bi-box-arrow-in-right"></i>`;
        btnLogin.href = "login.html";
        btnLogin.onclick = null;
    }
});

// ==========================
// Valida el formulario de contacto
// ==========================

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment').value.trim();

    // Ocultar mensajes previos con animación
    hideMessages();

    let errorMessage = '';

    // Validaciones específicas
    if (name === "" || email === "" || comment === "") {
        errorMessage = 'Por favor completa todos los campos requeridos.';
    } else if (!/^(.*@duoc\.cl|.*@profesor\.duoc\.cl|.*@gmail\.com)$/i.test(email)) {
        errorMessage = 'Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com)';
    }

    if (errorMessage) {
        showError(errorMessage);
        return;
    }

    // Mostrar mensaje de éxito y resetear
    showSuccess();
    this.reset();
});

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <span>${message}</span>
        </div>
    `;
    errorElement.style.display = 'block';
    errorElement.classList.add('show');
}

function showSuccess() {
    const successElement = document.getElementById('successMessage');
    successElement.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-check-circle-fill me-2"></i>
            <span>¡Gracias! Tu mensaje ha sido enviado correctamente.</span>
        </div>
    `;
    successElement.style.display = 'block';
    successElement.classList.add('show');
}

function hideMessages() {
    const errorElement = document.getElementById('errorMessage');
    const successElement = document.getElementById('successMessage');
    
    errorElement.classList.remove('show');
    successElement.classList.remove('show');
    
    setTimeout(() => {
        errorElement.style.display = 'none';
        successElement.style.display = 'none';
    }, 2000);
}