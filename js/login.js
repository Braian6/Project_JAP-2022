
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login").addEventListener("click", () => {

    let form = document.getElementById("form");

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      iniciar();
    }
    form.classList.add('was-validated')
    
  });
    
    
  });


function iniciar() {

  
  let dato =  JSON.parse(sessionStorage.getItem("datosUser"));
  console.log(dato);
  if(dato === null){
    let usuario = {};
      usuario.email = document.getElementById("email").value;
      usuario.pass = document.getElementById("pass").value;
      usuario.lvl = "Usuario";
      usuario.name = "";
      usuario.secondName = "";
      usuario.lastName = "";
      usuario.secondlastName = "";
      usuario.phoneNumber = "";
      localStorage.setItem("datosUser", JSON.stringify(usuario));
      sessionStorage.setItem("datosUser", JSON.stringify(usuario));
      console.log(usuario);
      location.href = "index.html";
    }else{
      location.href = "index.html";
    }
  }
  
