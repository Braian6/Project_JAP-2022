document.addEventListener('DOMContentLoaded',()=>{

    document.getElementById('login').addEventListener('click',()=>{
        iniciar();
    });
});

function iniciar() {
let usuario = {}
usuario.nombre = document.getElementById('usuario').value
usuario.clave = document.getElementById('clave').value

if (usuario.nombre === "" || usuario.clave === ""){
    alert ('Ingrese usuario y clave');
}else{
    usuario.correo=usuario.nombre+'@gmail.com';
    usuario.nivel = "Operador";
    localStorage.setItem('item',JSON.stringify(usuario));
    location.href="index.html";
}
}