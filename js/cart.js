let cartProducts = [];
let comissionPercentage = 0.15;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)"; 
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let MSG = "FUNCIONALIDAD NO IMPLEMENTADA";

function showCartProduct(){
  let htmlContentToAppend = "";
  for (let i = 0; i < cartProducts.length; i++) {
    let product = cartProducts[i];

    htmlContentToAppend += `
      <td><img  src="${product.image}" width="80" class="img-thumbnail"></td>
      <td>${product.name}</td>
      <td><span>${product.currency}</> <span class="unitPrice">${product.unitCost}</span></td>
      <td><input onchange="subtotalizar()" name="inputCount" type="number" value="1" min="1" style="width : 50px; heigth : 1px"></td>
      <th><span>${product.currency} </span><span class="subtotales"></span></th>
    `;  
    }
    document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
  }

//------------------------------------------------------------------

function subtotalizar(){
  let productCount = document.getElementsByName("inputCount");
  let price = document.getElementsByClassName("unitPrice");
  let subtotalHTML = document.getElementsByClassName("subtotales");
  
  let variable = 0;
  for (let i=0; i<productCount.length; i++){
    variable = parseFloat(price[i].innerHTML) * parseFloat(productCount[i].value);
    subtotalHTML[i].innerHTML = variable;
  };
  document.getElementById("sumSubtotales").innerHTML = DOLLAR_SYMBOL + variable;
  document.getElementById("comissionSend").innerHTML = DOLLAR_SYMBOL + (variable * comissionPercentage).toFixed(0);
  document.getElementById("totalCost").innerHTML = DOLLAR_SYMBOL + (variable + (variable * comissionPercentage));

}

function comprado(){

  let completado= "";
    completado += `
    <div class="alert alert-success" role="alert">
    ¡Has comprado con éxito! Volver al <a href="index.html" >Inicio</a>
  </div> `

  document.getElementById("completed").innerHTML = completado;
}

function validarOpPay() {

  let term1VL = document.getElementById("terminos1").checkValidity();
  let numberCardVL = document.getElementById("numberCard").value;
  let numberCardState = document.getElementById("numberCard").disabled;
  let numberCodeVL = document.getElementById("codeNumber").value;
  let numberCodeState = document.getElementById("codeNumber").disabled;
  let numberExpVL = document.getElementById("expNumber").value;
  let numberExpState = document.getElementById("expNumber").disabled;
  let term2VL = document.getElementById("terminos2").checkValidity();
  let numberCountVL = document.getElementById("countNumber").value;
  let numberCountState = document.getElementById("countNumber").disabled;

  
  if(term1VL===true && numberCountState === true && numberCardVL!="" && numberCodeVL!="" && numberExpVL!="") {
      document.getElementById("validar").style.display = "none" ;
  }else if(term2VL===true && numberCardState === true && numberCodeState === true && numberExpState === true && numberCountVL!=""){
    document.getElementById("validar").style.display = "none" ;
  }else{
    document.getElementById("validar").style.display = "inline";
  }
}
//validar formulario
  var form = document.getElementById("formulario");
form.addEventListener('submit', function (event) {

  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }else{
    comprado();
    alert("estoy aca");
  }
 
  form.classList.add('was-validated')
});

function desabilitar(){

  if(document.getElementById("terminos1").checked === true){
    document.getElementById("numberCard").disabled = false;
    document.getElementById("codeNumber").disabled = false;
    document.getElementById("expNumber").disabled = false;
    document.getElementById("countNumber").disabled = true;
  }else{
    document.getElementById("countNumber").disabled = false;
    document.getElementById("numberCard").disabled = true;
    document.getElementById("codeNumber").disabled = true;
    document.getElementById("expNumber").disabled = true;
  }
  
}

document.addEventListener('DOMContentLoaded',()=>{
    getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
          cartProducts = resultObj.data.articles;
          console.log(cartProducts);
          showCartProduct();
          subtotalizar();
        } else { 
          alert("Ha ocurrido un error");
        }
    });

    document.getElementById("premiumradio").addEventListener("change", function(){
      comissionPercentage = 0.15;
      subtotalizar();
  });
  
  document.getElementById("expressradio").addEventListener("change", function(){
      comissionPercentage = 0.07;
      subtotalizar();
  });

  document.getElementById("standardradio").addEventListener("change", function(){
      comissionPercentage = 0.05;
      subtotalizar();
  });

  document.getElementById("terminos1").addEventListener("click", function(){
    desabilitar();
  })

  document.getElementById("terminos2").addEventListener("click", function(){
    desabilitar();
  })

});