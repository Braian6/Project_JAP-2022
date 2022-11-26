let datosUser = JSON.parse(sessionStorage.getItem("datosUser"));

 function validar(){

    if(document.getElementById("firstName").value === "") {
        document.getElementById("firstName").classList.add('is-invalid');
    }else{
        document.getElementById("firstName").classList.remove('is-invalid');
        document.getElementById("firstName").classList.add('is-valid');
    }
    if(document.getElementById("firstSurname").value === "") {
        document.getElementById("firstSurname").classList.add('is-invalid');
    }
    else{
        document.getElementById("firstSurname").classList.remove('is-invalid');
        document.getElementById("firstSurname").classList.add('is-valid');
    }
    if(document.getElementById("numberCont").value === "") {
        document.getElementById("numberCont").classList.add('is-invalid');
    }
    else{
        document.getElementById("numberCont").classList.remove('is-invalid');
        document.getElementById("numberCont").classList.add('is-valid');
    }
 }

 function guardar(){

    let guardado= "";
      guardado += `
      <div class="alert alert-success" role="alert">
      ¡Los cambios han sido guardados! Volver al <a href="index.html" >Inicio</a>
    </div> `
  
    document.getElementById("guardado").innerHTML = guardado;
  }

 function saveDates(){
     let name = document.getElementById("firstName");
     let secondName = document.getElementById("secondName");
     let lastName = document.getElementById("firstSurname");
     let secondlastName = document.getElementById("secondSurname");
     let phoneNumber = document.getElementById("numberCont");
    if (name.checkValidity() && lastName.checkValidity() && phoneNumber.checkValidity()){

        datosUser.name = name.value;
        datosUser.secondName = secondName.value;
        datosUser.lastName = lastName.value;
        datosUser.secondlastName = secondlastName.value;
        datosUser.phoneNumber = phoneNumber.value;
        sessionStorage.setItem("datosUser", JSON.stringify(datosUser));
        guardar()

    }
 }

document.addEventListener('DOMContentLoaded', ()=>{

    let datosUser = JSON.parse(sessionStorage.getItem("datosUser"));
    document.getElementById("email").value = datosUser.email;
    document.getElementById("firstName").value = datosUser.name;
    document.getElementById("secondName").value = datosUser.secondName;
    document.getElementById("firstSurname").value = datosUser.lastName;
    document.getElementById("secondSurname").value = datosUser.secondlastName;
    document.getElementById("numberCont").value = datosUser.phoneNumber;
    if(datosUser.name === undefined){
        document.getElementById("firstName").value = "";
    }else if(datosUser.secondName === undefined){
        document.getElementById("secondName").value = "";
    }else if(datosUser.lastName === undefined){
        document.getElementById("firstSurname").value = "";
    }else if(datosUser.secondlastName === undefined){
        document.getElementById("secondSurname").value = "";
    }else if(datosUser.phoneNumber === undefined){
        document.getElementById("numberCont").value = "";
    }

    document.getElementById("saveChanges").addEventListener("click", () =>{
        validar();
        saveDates();
        
    });
});


