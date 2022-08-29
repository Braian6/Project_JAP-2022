document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
  let usuario = JSON.parse(localStorage.getItem("item"));
  if (usuario == null) {
    alert("Debe Iniciar sesion");
    location.href = "login.html";
  }
  document.getElementById("chau").addEventListener("click", () => {
    localStorage.removeItem("item");
    alert("Gracias por visitar nuestro sitio!! HASTA PRONTO!");
    location.href = "login.html";
  });
});
