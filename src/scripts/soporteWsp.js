// SCRIPT PARA MOSTRAR/OCULTAR EL CUADRO
document.getElementById("whatsapp-btn").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("whatsapp-confirm").style.display = "block";
});

document.getElementById("cancel-btn").addEventListener("click", function() {
  document.getElementById("whatsapp-confirm").style.display = "none";
});
