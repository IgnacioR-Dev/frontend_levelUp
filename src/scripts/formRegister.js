const comunas = {
  Metropolitana: ["Santiago", "Providencia", "Las Condes", "Maipú", "Ñuñoa"],
  Valparaiso: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
  Biobio: ["Concepción", "Chiguayante", "Los Ángeles", "Talcahuano"],
  Araucania: ["Temuco", "Villarrica", "Angol", "Pucón"],
  LosLagos: ["Puerto Montt", "Puerto Varas", "Osorno", "Castro"],
  Atacama: ["Copiapó", "Vallenar", "Caldera"],
  // agregar el resto de regiones y comunas
};

const regionSelect = document.getElementById("regionSelect");
const comunaSelect = document.getElementById("comunaSelect");

regionSelect.addEventListener("change", () => {
  const region = regionSelect.value;
  comunaSelect.innerHTML = "";
  if (region && comunas[region]) {
    comunaSelect.disabled = false;
    comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';
    comunas[region].forEach((c) => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      comunaSelect.appendChild(option);
    });
  } else {
    comunaSelect.disabled = true;
    comunaSelect.innerHTML =
      '<option value="">Selecciona primero la región</option>';
  }
});

// Validar correo y contraseña al enviar
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    const email = document.getElementById("registerEmail").value;
    const confirmEmail = document.getElementById("registerConfirmEmail").value;
    const pass = document.getElementById("registerPassword").value;
    const confirmPass = document.getElementById(
      "registerConfirmPassword"
    ).value;

    if (email !== confirmEmail) {
      e.preventDefault();
      alert("Los correos no coinciden.");
      return;
    }
    if (pass !== confirmPass) {
      e.preventDefault();
      alert("Las contraseñas no coinciden.");
      return;
    }
  });
