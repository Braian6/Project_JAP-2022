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
                        <div class="col-3">
                            <img src="${product.image}" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col-9">
                            <div class="row d-flex">
                                <div class="col">
                                    <h4>${product.name + " - " + product.currency + product.cost}</h4>
                                    <p>${product.description}</p>
                                </div>
                                <div class="col-3">
                                    <p class="text-muted">${product.soldCount} vendidos</p>
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
            listProducts = resultObj.data.products;
            showProductList(listProducts);
            console.log(listProducts);
        }else{
            alert("Ha ocurrido un error");
        };
    });
});