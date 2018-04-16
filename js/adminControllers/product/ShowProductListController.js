(function () {

    function initPage() {
        var main = document.querySelector('main');

        var products = JSON.parse(window.localStorage.getItem('products'));

        var indexProducts = AppController.getControllerTemplate('EditCategoryController', 'showProductList');
        var template = Handlebars.compile(indexProducts);
        var productListTemp = template({products: products});
        document.querySelector('tbody').innerHTML = productListTemp;

        Array.from(document.querySelectorAll('.btn-edit')).forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                var types = JSON.parse(window.localStorage.getItem('types'));
                var productInput = btn.parentNode.parentNode.childNodes[1].children["0"].value;

                var productID = parseInt(productInput);
                var products = JSON.parse(window.localStorage.getItem('products'));
                var product = products.find(prod => prod.id === productID);

                var editProductTmpl = AppController.getControllerTemplate('ShowProductListController', 'editProduct');
                var template = Handlebars.compile(editProductTmpl);
                var prodEditTemp = template({types : types}, {product : product});

                if(editProductTmpl){
                    main.innerHTML = prodEditTemp;
                    var inputName = main.querySelector('input[name="name"]');
                    inputName.value = product.name;
                    var inputImg = main.querySelector('input[name="image"]');
                    inputImg.value = product.image;
                    var inputDescription = main.querySelector('textarea');
                    inputDescription.value = product.description;
                    var inputPrice = main.querySelector('input[name="price"]');
                    inputPrice.value = parseFloat(product.price);
                    var inputBrand = main.querySelector('input[name="brand"]');
                    inputBrand.value = product.brand;
                    var inputTypeID = parseInt(main.childNodes[1].childNodes[1].childNodes[3].childNodes[1][2].value);
                    var inputType = types.find(function (type) {
                        return type.id === inputTypeID;
                    });
                    inputType.value = inputType.name;
                    var inputQuantity = main.querySelector('input[name="quantity"]');
                    inputQuantity.value = product.quantity;
                    var inputMinAge = main.querySelector('input[name="minAge"]');
                    inputMinAge.value = product.minAge;
                    var inputMaxAge = main.querySelector('input[name="maxAge"]');
                    inputMaxAge.value = product.maxAge;

                    main.querySelector('.btn-save').addEventListener('click', function (event) {
                        event.preventDefault();

                        var newInputName = main.querySelector('input[name="name"]').value,
                            newInputImg = main.querySelector('input[name="image"]').value,
                            newInputDescription = main.querySelector('textarea').value,
                            newInputPrice = main.querySelector('input[name="price"]').value,
                            newInputBrand = main.querySelector('input[name="brand"]').value,
                            newInputType = main.childNodes[1].childNodes[1].childNodes[3].childNodes[1][2].value,
                            newInputQuantity = main.querySelector('input[name="quantity"]').value,
                            newInputMinAge = main.querySelector('input[name="minAge"]').value,
                            newInputMaxAge = main.querySelector('input[name="maxAge"]').value;
                        if(ProductModule.editProduct(productID, newInputImg, newInputName, newInputPrice, newInputDescription, newInputBrand, newInputType, newInputQuantity, newInputMinAge, newInputMaxAge)){
                            window.location = 'html/show-product-list.html'
                        }

                        window.localStorage.setItem('products', JSON.stringify(products));
                    })
                }
            });
        });
    }

    AppController.registerController('ShowProductListController', {
        initPage: initPage
    })
})();

