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
  "XIV de Los Ríos": ["Valdivia","Mariquina","Lanco","Máfil","Corral","Panguipulli","Paillaco","Ranco","La Unión","Futrono","Río Bueno","Lago Ranco"],
  "X de Los Lagos": ["Puerto Montt","Puerto Varas","Llanquihue","Frutillar","Puerto Octay","Fresia","Los Muermos","Maullín","Calbuco","Cochamó","Osorno","San Pablo","Puyehue","Purranque","Río Negro","San Juan de la Costa","Chiloé","Castro","Ancud","Quellón","Quemchi","Dalcahue","Curaco de Vélez","Quinchao","Puqueldón","Chonchi","Queilén","Palena","Chaitén","Hualaihué","Futaleufú"],
  "XI Aysén del General Carlos Ibáñez del Campo": ["Coyhaique","Lago Verde","Aysén","Cisnes","Guaitecas","Chile Chico","Río Ibáñez","Cochrane","O'Higgins","Tortel"],
  "XII de Magallanes y Antártica Chilena": ["Punta Arenas","Río Verde","Laguna Blanca","San Gregorio","Natales","Torres del Paine","Tierra del Fuego","Porvenir","Primavera","Timaukel","Antártica","Cabo de Hornos"],
  "Metropolitana de Santiago": ["Santiago","Providencia","Las Condes","Vitacura","Ñuñoa","Maipú","Peñalolén","La Florida","La Reina","Lo Barnechea","Independencia","Recoleta","Santiago Centro","Cerrillos","El Bosque","La Pintana","Puente Alto","San Bernardo","San Joaquín","Macul","San Miguel","La Granja","Huechuraba","Renca","Quinta Normal","Pudahuel","Lo Prado","Colina","Lampa","Tiltil","Pirque","Buin","Paine","Talagante","Peñaflor","Padre Hurtado","Isla de Maipo"]
};


const regionSelectEl = document.getElementById("regionSelect");
const comunaSelectEl = document.getElementById("comunaSelect");

regionSelectEl.addEventListener("change", () => {
  const region = regionSelectEl.value;
  comunaSelectEl.innerHTML = "";
  if (region && comunas[region]) {
    comunaSelectEl.disabled = false;
    comunaSelectEl.innerHTML =
      '<option value="">Selecciona una comuna</option>';
    comunas[region].forEach((c) => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      comunaSelectEl.appendChild(option);
    });
  } else {
    comunaSelectEl.disabled = true;
    comunaSelectEl.innerHTML =
      '<option value="">Selecciona primero la región</option>';
  }
});

// Validar correo y contraseña
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmEmail").value;
    const pass = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;

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
