const ORDER_ASC_BY_COST = "Menor Precio";
const ORDER_DESC_BY_COST = "Mayor Precio";
const ORDER_BY_PROD_RELEVANCE = "Relevancia";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

function sortProducts(criteria, array) {
  let result = [];

  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_RELEVANCE) {
    result = array.sort(function (a, b) {
      let aSoldCount = a.soldCount;
      let bSoldCount = b.soldCount;

      if (aSoldCount > bSoldCount) {
        return -1;
      }
      if (aSoldCount < bSoldCount) {
        return 1;
      }
      return 0;
    });
  }
  return result;
}

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}

let listProducts = [];

function showProductList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < listProducts.length; i++) {
    let product = listProducts[i];

    if (((minCost == undefined) || (minCost != undefined && product.cost >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && product.cost <= maxCost))) {

        htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
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
             </div> 
        `;
    }
    document.getElementById("car-list-container").innerHTML =htmlContentToAppend;
  }
}

function sortAndShowProductsList(sortCriteria, listProducts) {
  currentSortCriteria = sortCriteria;

  if (listProducts != undefined) {
    currentProductsArray = listProducts;
  }

  currentProductsArray = sortProducts(currentSortCriteria,currentProductsArray);
  
  showProductList();
}

let cat_ID = localStorage.getItem("catID");

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(PRODUCTS_URL + cat_ID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      listProducts = resultObj.data.products;
      showProductList(listProducts);
      sortAndShowProductsList(ORDER_BY_PROD_RELEVANCE, listProducts);
      console.log(listProducts);
    } else {
      alert("Ha ocurrido un error");
    }
  });
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProductsList(ORDER_ASC_BY_COST);
    });
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProductsList(ORDER_DESC_BY_COST);
    });
    document.getElementById("sortByRelevance").addEventListener("click", function () {
        sortAndShowProductsList(ORDER_BY_PROD_RELEVANCE);
    });
    document.getElementById("rangeFilterCost").addEventListener("click", function () {

        //Obtiene los valores ingresados en las casillas de min y max.
        minCost = document.getElementById("rangeFilterMinCost").value;
        maxCost = document.getElementById("rangeFilterMaxCost").value;

        //Control para parsear valor de costo, convierte un valor en formato string a valor numerico(solo si se ingresa).
        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }
        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }
        showProductList();
    });
    document.getElementById("clearFilters").addEventListener("click", function () {
        document.getElementById("rangeFilterMinCost").value = "";
        document.getElementById("rangeFilterMaxCost").value = "";
        minCost = undefined;
        maxCost = undefined;
        showProductList();
    });
});
