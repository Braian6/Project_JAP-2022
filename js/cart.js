let cartProducts = [];

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
}

//------------------------------------------------------------------

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
});