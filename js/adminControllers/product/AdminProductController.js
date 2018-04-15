
document.addEventListener('DOMContentLoaded', function () {
    var main = document.querySelector('main');

    document.querySelector('.btn-add').addEventListener('click', function (event) {
        event.preventDefault();
        var types = JSON.parse(window.localStorage.getItem('types')),
            addProductTmpl = getTemplate('addProduct'),
            template = Handlebars.compile(addProductTmpl),
            temp = template({types:types});

        if(addProductTmpl){
            main.innerHTML = temp;
        }

        main.querySelector('.btn-save').addEventListener('click', function (event) {
            event.preventDefault();

            var inputName = main.querySelector('input[name="name"]').value,
                inputImg = main.querySelector('input[name="image"]').value,
                inputDescription = main.querySelector('textarea').value,
                inputPrice = parseInt(main.querySelector('input[name="price"]').value),
                inputBrand = main.querySelector('input[name="brand"]').value,
                inputType = parseInt(main.childNodes[1].childNodes[1].childNodes[3].childNodes[1][2].value),
                inputQuantity = parseInt(main.querySelector('input[name="quantity"]').value),
                inputMinAge = parseInt(main.querySelector('input[name="minAge"]').value),
                inputMaxAge = parseInt(main.querySelector('input[name="maxAge"]').value);

            if(ProductModule.addProduct(inputImg, inputName, inputPrice, inputDescription, inputBrand, inputType, inputQuantity, inputMinAge, inputMaxAge)){
                window.location = '../../html/admin/show-product-list.html';
            }

        })
    })
    

});

