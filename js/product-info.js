let product = {};
let commentArray = [];

function showImagesGallery(array){
    
    for(let i = 0; i < array.length; i++){
            let htmlContentToAppend= "";
            htmlContentToAppend += `  
                        <div class="col-12 col-md-6 col-lg-6 overflow-hidden">
                            <img height="200px"src="${array[0]}" class="img-thumbnail">
                        </div>
                        <div class="col-12 col-md-6 col-lg-6 overflow-hidden">
                            <img height="200px"src="${array[1]}" class="img-thumbnail">
                        </div>
                        <div class="col-12 col-md-6 col-lg-6 overflow-hidden">
                            <img height="200px"src="${array[2]}" class="img-thumbnail">
                        </div>
                        <div class="col-12 col-md-6 col-lg-6 overflow-hidden">
                            <img height="200px"src="${array[3]}" class="img-thumbnail">
                        </div> 
                        `
            document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
        }};

function showCommentsList(){

        let htmlContentToAppend = "";
        for(let i = 0; i < commentArray.length; i++){
            let comment = commentArray[i];
             let stars = `<span class="fa fa-star checked"></span>`
                 htmlContentToAppend += `
                        <div class="row">
                            <div class="d-flex">                 
                                <div class="starsRating">${stars.repeat(comment.score)}
                            </div>
                        </div>
                        <div class="row">                       
                            <span><strong>${comment.user}</strong></span>
                            <p class="mb-1"><em>${comment.description}</em></p>
                            <p class="mb-1">${comment.dateTime}</p>
                            <hr>
                        </div>
                    `
                document.getElementById("comments").innerHTML = htmlContentToAppend;
            }};

let product_ID = localStorage.getItem("productID");

document.addEventListener('DOMContentLoaded',()=>{
    getJSONData(PRODUCT_INFO_URL + product_ID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
          product = resultObj.data;
          document.getElementById("productName").innerHTML = product.name;
          document.getElementById("productCost").innerHTML = product.currency + " " + product.cost;
          document.getElementById("productDescription").innerHTML = product.description;
          document.getElementById("productCategory").innerHTML = product.category;
          document.getElementById("productSoldCount").innerHTML = product.soldCount;

          showImagesGallery(product.images);
        } else {
          alert("Ha ocurrido un error");
        }
      });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + product_ID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
        commentArray = resultObj.data;            
        showCommentsList();
        }
    });
})