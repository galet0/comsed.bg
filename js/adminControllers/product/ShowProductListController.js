(function() {
    var main = document.querySelector('main');

    function showAllProductsPage() {
        var products = JSON.parse(window.localStorage.getItem('products'));

        var indexProducts = AppController.getControllerTemplate('show-product-list', 'showProductList');
        var template = Handlebars.compile(indexProducts);
        document.querySelector('tbody').innerHTML = template({products: products});

        editProduct();

    }

    function showAddProductPage() {
        main.querySelector('.btn-add').addEventListener('click', function (event) {
            event.preventDefault();
            var types = JSON.parse(window.localStorage.getItem('types')),
                addProductTmpl = AppController.getControllerTemplate('show-product-list', 'addProduct'),
                template = Handlebars.compile(addProductTmpl),
                temp = template({types:types});

            if(addProductTmpl){
                main.innerHTML = temp;
            }

            saveProduct();
        });
    }

    function saveProduct() {
        main.querySelector('.btn-save').addEventListener('click', function (event) {
            event.preventDefault();

            var inputName = main.querySelector('input[name="name"]').value,
                inputImg = main.querySelector('input[name="image"]').value,
                inputDescription = main.querySelector('textarea').value,
                inputPrice = parseFloat(main.querySelector('input[name="price"]').value),
                inputBrand = main.querySelector('input[name="brand"]').value,
                inputType = parseInt(main.childNodes[1].childNodes[1].childNodes[3].childNodes[1][2].value),
                inputQuantity = parseInt(main.querySelector('input[name="quantity"]').value),
                inputMinAge = parseInt(main.querySelector('input[name="minAge"]').value),
                inputMaxAge = parseInt(main.querySelector('input[name="maxAge"]').value);

            if(ProductModule.addProduct(inputImg, inputName, inputPrice, inputDescription, inputBrand, inputType, inputQuantity, inputMinAge, inputMaxAge)){
                window.location = '../../html/admin/show-product-list.html';
            }

        });
    }

    function editProduct() {
        Array.from(document.querySelectorAll('.btn-edit')).forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                var types = JSON.parse(window.localStorage.getItem('types'));
                var productInput = btn.parentNode.parentNode.childNodes[1].children["0"].value;

                var productID = parseInt(productInput);
                var products = JSON.parse(window.localStorage.getItem('products'));
                var product = products.find(function (p) {
                    return p.id === productID;
                });

                var editProductTmpl = AppController.getControllerTemplate('show-product-list', 'editProduct');
                var template = Handlebars.compile(editProductTmpl);
                var prodEditTemp = template({types : types}, {product : product});

                if(editProductTmpl){
                    main.innerHTML = prodEditTemp;
                    var inputName = main.querySelector('input[name="name"]');
                    //if(inputName !== undefined && inputName !== null && inputName !== '') {
                        inputName.value = product.name;
                    //}
                    var inputImg = main.querySelector('input[name="image"]');
                    //if(inputName !== undefined && inputName !== null && inputName !== '') {
                        inputImg.value = product.image;
                    //}
                    var inputDescription = main.querySelector('textarea');
                    //if(inputDescription !== undefined && inputDescription !== null && inputDescription !== '') {
                        inputDescription.value = product.description;
                    //}
                    var inputPrice = main.querySelector('input[name="price"]');
                    //if(inputPrice !== undefined && inputPrice !== null && inputPrice !== '') {
                        inputPrice.value = parseFloat(product.price);
                    //}
                    var inputBrand = main.querySelector('input[name="brand"]');
                    //if(inputBrand !== undefined && inputBrand !== null && inputBrand !== '') {
                        inputBrand.value = product.brand;
                    //}
                    var inputTypeID = parseInt(main.childNodes[1].childNodes[1].childNodes[3].childNodes[1][2].value);
                    var inputType = types.find(function (type) {
                        return type.id === inputTypeID;
                    });
                    inputType.value = inputType.name;
                    var inputQuantity = main.querySelector('input[name="quantity"]');
                    //if(inputQuantity !== undefined && inputQuantity !== null && inputQuantity !== '') {
                        inputQuantity.value = product.quantity;
                    //}
                    var inputMinAge = main.querySelector('input[name="minAge"]');
                    //if(inputMinAge !== undefined && inputMinAge !== null && inputMinAge !== '') {
                        inputMinAge.value = product.minAge;
                    //}
                    var inputMaxAge = main.querySelector('input[name="maxAge"]');
                    //if(inputMaxAge !== undefined && inputMaxAge !== null && inputMaxAge !== '') {
                        inputMaxAge.value = product.maxAge;
                    //}

                    document.querySelector('.btn-save').addEventListener('click', function (event) {
                        event.preventDefault();

                        var newInputName = main.querySelector('input[name="name"]').value,
                            newInputImg = main.querySelector('input[name="image"]').value,
                            newInputDescription = main.querySelector('textarea').value,
                            newInputPrice = parseFloat(main.querySelector('input[name="price"]').value).toFixed(2),
                            newInputBrand = main.querySelector('input[name="brand"]').value,
                            newInputType = parseInt(main.childNodes[1].childNodes[1].childNodes[3].childNodes[1][2].value),
                            newInputQuantity = main.querySelector('input[name="quantity"]').value,
                            newInputMinAge = main.querySelector('input[name="minAge"]').value,
                            newInputMaxAge = main.querySelector('input[name="maxAge"]').value;
                        if(ProductModule.editProduct(productID, newInputImg, newInputName, newInputPrice, newInputDescription, newInputBrand, newInputType, newInputQuantity, newInputMinAge, newInputMaxAge)){
                            window.location = '../../html/admin/show-product-list.html';
                        }
                    });

                    document.querySelector('.btn-cancel').addEventListener('click', function (event) {
                        event.preventDefault();
                        window.location = '../../html/admin/show-product-list.html';
                    });
                }
            });
        });
    }

    function initPage() {
        showAddProductPage();
        showAllProductsPage();
    }

    AppController.registerController('show-product-list', {
        initPage: initPage
    })
})();

