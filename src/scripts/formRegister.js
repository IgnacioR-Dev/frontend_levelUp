// ============================
// OBJETO COMUNAS
// ============================
const comunas = { 
  "XV de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "I de Tarapacá": ["Alto Hospicio", "Iquique", "Huara", "Camiña", "Colchane", "Pica", "Pozo Almonte"],
  "II de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
  "III de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Freirina", "Huasco", "Alto del Carmen"],
  "IV de Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Vicuña", "Paihuano", "Ovalle", "Río Hurtado", "Monte Patria", "Combarbalá", "Punitaqui", "Illapel", "Salamanca", "Los Vilos", "Canela"],
  "V de Valparaíso": ["Valparaíso","Viña del Mar","Quilpué","Villa Alemana","Concón","Casablanca","Quintero","Puchuncaví","Quillota","La Cruz","Calera","Nogales","Hijuelas","Limache","Olmué","Isla de Pascua","Juan Fernández","San Antonio","Cartagena","El Tabo","El Quisco","Algarrobo","Santo Domingo","La Ligua","Petorca","Cabildo","Zapallar","Los Andes","San Esteban","Calle Larga","Rinconada","San Felipe","Putaendo","Santa María","Panquehue","Llaillay","Catemu"],
  "VI del Libertador General Bernardo O'Higgins": ["Rancagua","Machalí","Graneros","Codegua","Olivar","Requínoa","Rengo","Mostazal","Malloa","Quinta de Tilcoco","San Vicente","Pichidegua","Peumo","Coltauco","Coinco","Doñihue","Las Cabras","San Fernando","Chimbarongo","Placilla","Nancagua","Chépica","Santa Cruz","Lolol","Pumanque","Palmilla","Peralillo","Pichilemu","Navidad","Litueche","La Estrella","Marchihue","Paredones"],
  "VII del Maule": ["Talca","San Clemente","Pelarco","Río Claro","Maule","San Rafael","Empedrado","Pencahue","Curicó","Teno","Romeral","Molina","Sagrada Familia","Hualañé","Licantén","Vichuquén","Rauco","Constitución","Curepto","Linares","Yerbas Buenas","Colbún","Longaví","Parral","Retiro","Villa Alegre","San Javier","Cauquenes","Pelluhue","Chanco"],
  "VIII del Biobío": ["Concepción","Talcahuano","Penco","Tomé","Hualpén","Florida","Hualqui","Santa Juana","Lota","Coronel","San Pedro de la Paz","Chiguayante","Los Ángeles","Cabrero","Tucapel","Antuco","Quilleco","Santa Bárbara","Quilaco","Mulchén","Negrete","Nacimiento","Laja","San Rosendo","Chillán","Chillán Viejo","San Carlos","Ñiquén","San Fabián","Coihueco","Pinto","San Ignacio","El Carmen","Yungay","Pemuco","Bulnes","Quillón","Ránquil","Portezuelo","Coelemu","Treguaco","Cobquecura","Quirihue","Ninhue","Lebu","Arauco","Curanilahue","Los Álamos","Cañete","Contulmo","Tirúa"],
  "IX de la Araucanía": ["Temuco","Padre las Casas","Villarrica","Pucón","Curarrehue","Lautaro","Perquenco","Vilcún","Cholchol","Cunco","Gorbea","Loncoche","Pitrufquén","Freire","Angol","Renaico","Collipulli","Lonquimay","Curacautín","Ercilla","Victoria","Traiguén","Lumaco","Purén","Los Sauces","Toltén","Teodoro Schmidt","Saavedra","Carahue","Nueva Imperial","Galvarino"],
  "XIV de los Ríos": ["Valdivia","Mariquina","Lanco","Máfil","Corral","Panguipulli","Paillaco","Ranco","La Unión","Futrono","Río Bueno","Lago Ranco"],
  "X de los Lagos": ["Puerto Montt","Puerto Varas","Llanquihue","Frutillar","Puerto Octay","Fresia","Los Muermos","Maullín","Calbuco","Cochamó","Osorno","San Pablo","Puyehue","Purranque","Río Negro","San Juan de la Costa","Chiloé","Castro","Ancud","Quellón","Quemchi","Dalcahue","Curaco de Vélez","Quinchao","Puqueldón","Chonchi","Queilén","Palena","Chaitén","Hualaihué","Futaleufú"],
  "XI Aysén del General Carlos Ibáñez del Campo": ["Coyhaique","Lago Verde","Aysén","Cisnes","Guaitecas","Chile Chico","Río Ibáñez","Cochrane","O'Higgins","Tortel"],
  "XII de Magallanes y Antártica Chilena": ["Punta Arenas","Río Verde","Laguna Blanca","San Gregorio","Natales","Torres del Paine","Tierra del Fuego","Porvenir","Primavera","Timaukel","Antártica","Cabo de Hornos"],
  "Metropolitana de Santiago": ["Santiago","Providencia","Las Condes","Vitacura","Ñuñoa","Maipú","Peñalolén","La Florida","La Reina","Lo Barnechea","Independencia","Recoleta","Santiago Centro","Cerrillos","El Bosque","La Pintana","Puente Alto","San Bernardo","San Joaquín","Macul","San Miguel","La Granja","Huechuraba","Renca","Quinta Normal","Pudahuel","Lo Prado","Colina","Lampa","Tiltil","Pirque","Buin","Paine","Talagante","Peñaflor","Padre Hurtado","Isla de Maipo"]
};

// ============================
// SELECT REGIÓN Y COMUNA
// ============================
const regionSelectEl = document.getElementById("regionSelect");
const comunaSelectEl = document.getElementById("comunaSelect");

regionSelectEl.addEventListener("change", () => {
  const region = regionSelectEl.value;
  comunaSelectEl.innerHTML = "";
  if (region && comunas[region]) {
    comunaSelectEl.disabled = false;
    comunaSelectEl.innerHTML = '<option value="">Selecciona una comuna</option>';
    comunas[region].forEach(c => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      comunaSelectEl.appendChild(option);
    });
  } else {
    comunaSelectEl.disabled = true;
    comunaSelectEl.innerHTML = '<option value="">Selecciona primero la región</option>';
  }
});

// ============================
// Función para mostrar modales de error
// ============================
function showErrorModal(message) {
    if (typeof window._showMessage === 'function') {
        window._showMessage("Error de validación", message);
    } else {
        // Fallback: crear modal dinámicamente
        let modalElement = document.getElementById('messageModal');
        
        if (!modalElement) {
            const modalHTML = `
            <div class="modal fade" id="messageModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-danger text-white">
                            <h5 class="modal-title">Error de validación</h5>
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
            const modalBody = modalElement.querySelector('.modal-body');
            const modalHeader = modalElement.querySelector('.modal-header');
            
            if (modalBody) modalBody.textContent = message;
            if (modalHeader) modalHeader.className = 'modal-header bg-danger text-white';
        }
        
        // Mostrar el modal
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// ============================
// Función para mostrar modal de éxito
// ============================
function showSuccessModal(message) {
    if (typeof window._showMessage === 'function') {
        window._showMessage("¡Registro exitoso!", message);
    } else {
        // Fallback: crear modal dinámicamente
        let modalElement = document.getElementById('messageModal');
        
        if (!modalElement) {
            const modalHTML = `
            <div class="modal fade" id="messageModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">¡Registro exitoso!</h5>
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
            
            if (modalTitle) modalTitle.textContent = "¡Registro exitoso!";
            if (modalBody) modalBody.textContent = message;
            if (modalHeader) modalHeader.className = 'modal-header bg-success text-white';
        }
        
        // Mostrar el modal
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        
        // Redirigir después de cerrar el modal
        modalElement.addEventListener('hidden.bs.modal', function () {
            window.location.href = "../index.html";
        });
    }
}

// ============================
// VALIDACIONES DEL FORM
// ============================
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const run = document.getElementById("run").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const birthDate = document.getElementById("birthDate").value;
  const email = document.getElementById("email").value.trim();
  const confirmEmail = document.getElementById("confirmEmail").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const address = document.getElementById("address").value.trim();
  const region = regionSelectEl.value;
  const comuna = comunaSelectEl.value;

  // -------- VALIDACIÓN RUN --------
  const runRegex = /^[0-9]{7,8}[0-9Kk]$/;
  if (!runRegex.test(run)) {
    showErrorModal("RUN inválido. Debe tener 7 a 8 dígitos más dígito verificador (K o número), sin puntos ni guion.");
    return;
  }

  // -------- VALIDACIÓN NOMBRE Y APELLIDOS --------
  if (firstName.length === 0 || firstName.length > 50) {
    showErrorModal("Nombre inválido (máximo 50 caracteres).");
    return;
  }
  if (lastName.length === 0 || lastName.length > 100) {
    showErrorModal("Apellido inválido (máximo 100 caracteres).");
    return;
  }

  // -------- VALIDACIÓN CORREO --------
  const allowedDomains = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
  const emailDomain = email.split("@")[1];
  if (!allowedDomains.includes(emailDomain)) {
    showErrorModal("Correo no permitido. Debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
    return;
  }
  if (email !== confirmEmail) {
    showErrorModal("Los correos no coinciden.");
    return;
  }

  // -------- VALIDACIÓN CONTRASEÑAS --------
  if (password !== confirmPassword) {
    showErrorModal("Las contraseñas no coinciden.");
    return;
  }

  // -------- VALIDACIÓN FECHA NACIMIENTO (MAYOR DE 18) --------
  if (!birthDate) {
    showErrorModal("Debe ingresar su fecha de nacimiento.");
    return;
  }
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();
  if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
    showErrorModal("Debes ser mayor de 18 años para registrarte.");
    return;
  }

  // -------- VALIDACIÓN DIRECCIÓN --------
  if (address.length === 0 || address.length > 300) {
    showErrorModal("Dirección inválida (máximo 300 caracteres).");
    return;
  }

  // -------- VALIDACIÓN REGIÓN Y COMUNA --------
  if (!region) {
    showErrorModal("Debes seleccionar una región.");
    return;
  }
  if (!comuna) {
    showErrorModal("Debes seleccionar una comuna.");
    return;
  }

  // -------- SI TODO ESTÁ BIEN --------
  showSuccessModal("Registro completado. Bienvenido a LevelUp.");
});