//Array que recepciona los datos recibidos:
let listProducts = [];
//En esta funcion, se recibe un array con los datos, y son mostrados en pantalla mediante el DOM:
function showProductList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < listProducts.length; i++){
        let product = listProducts[i];
        htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3 onclick="setProductInfo('${product.id}');" style="cursor: pointer;">
                            <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="row d-flex">
                                <div class="col-9" onclick="setProductInfo('${product.id}');" style="cursor: pointer;">
                                    <h4 class="mb-2">${product.name}</h4>
                                    <div>${product.description}</div>
                                </div>
                                <div class="col-3">
                                    <p class="text-info text-right my-1">${product.currency + " " + product.cost}</p>
                                </div>
                            </div>
                            <div class="row d-flex">
                                <div class="col text-right mt-2">
                                    <button type="button" class="btn btn-info btn-sm" onclick="addProdtoCart(${product.id},'${product.name}', '${product.cost}', '${product.currency}', '${product.imgSrc}')">Agregar al carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
            document.getElementById("car-list-container").innerHTML = htmlContentToAppend;
    };
};

document.addEventListener('DOMContentLoaded',()=>{
    getJSONData(PRODUCT_URL_AUTOS).then(function (resultObj) {
        if (resultObj.status === "ok"){
            listProducts = resultObj.data;
            showProductList(listProducts);
            console.log(listProducts);
        }else{
            alert("Ha ocurrido un error");
        };
    });
});