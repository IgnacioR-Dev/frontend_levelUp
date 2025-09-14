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
        alert("Correo inválido. Debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com y tener máximo 100 caracteres.");
        return false;
    }

    if (!validarPassword(password)) {
        alert("Contraseña inválida. Debe tener entre 4 y 10 caracteres.");
        return false;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert(`Bienvenido ${user.email}`);

        // Redirigir según rol
        if (user.role === "cliente") {
            window.location.href = "../index.html";
        } else if (user.role === "administrador") {
            window.location.href = "administrador.html";
        }

        return true;
    } else {
        alert("Correo o contraseña incorrectos");
        return false;
    }
}

// ==========================
// Logout
// ==========================
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// ==========================
// Obtener usuario actual
// ==========================
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

// ==========================
// Comprobar acceso según rol
// ==========================
function requireRole(role) {
    const user = getCurrentUser();
    if (!user || user.role !== role) {
        alert("No tienes permiso para acceder a esta página.");
        window.location.href = "login.html";
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
        btnLogin.addEventListener("click", () => logout());
    } else {
        btnLogin.innerHTML = `Iniciar Sesión <i class="bi bi-box-arrow-in-right"></i>`;
        btnLogin.href = "login.html";
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

    // Validar correo
    const validEmail = /^(.*@duoc\.cl|.*@profesor\.duoc\.cl|.*@gmail\.com)$/i;
    if (!validEmail.test(email)) {
        alert('Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com)');
        return;
    }

    if(name === "" || comment === "") {
        alert('Por favor completa todos los campos requeridos.');
        return;
    }

    // Aquí se puede enviar el formulario a un backend o API
    console.log({ name, email, comment });

    // Mostrar mensaje de éxito y resetear
    document.getElementById('successMessage').style.display = 'block';
    this.reset();
});