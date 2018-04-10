
document.addEventListener('DOMContentLoaded', function () {

    function updateProductList(){
        var products = ProductModule.getAllProducts();
        console.log(products);
        var updateProdList = getTemplate('updateProdList');
        var template = Handlebars.compile(updateProdList);
        var html = template(products);
        if(updateProdList){
            var tr = document.querySelectorAll('tbody');
            console.log(tr);
            tr.innerHTML = html;
        }
    }



    if(updateProductList()){
        document.querySelector('#editBtn').addEventListener('click', function (event) {
            event.preventDefault();
            var editProductTmpl = getTemplate('editProduct');
            if(editProductTmpl){
                main.innerHTML = editProductTmpl;
            }
        });


        document.querySelector('#deleteBtn').addEventListener('click', function (event) {
            event.preventDefault();
            this.parentNode.parentNode.removeChild(this.parentNode);
            ProductModule.deleteProduct();
        });
    }


    document.querySelector('#addBtn').addEventListener('click', function (event) {
        event.preventDefault();

        var addProductTmpl = getTemplate('addProduct');
        if(addProductTmpl){
            main.innerHTML = addProductTmpl;
        }

        document.querySelector('#saveBtn').addEventListener('click', function (event) {
            event.preventDefault();
            var form = document.querySelector('form'),
                name = form.querySelector('input[name="name"]').value,
                image = form.querySelector('input[name="image"]').value,
                type = parseInt(form.querySelector('input[name="type"]').value),
                description = form.querySelector('textarea[name="description"]').value,
                price = form.querySelector('input[name="price"]').value,
                brand = form.querySelector('input[name="brand"]').value,
                quantity = form.querySelector('input[name="quantity"]').value,
                minAge = form.querySelector('input[name="minAge"]').value,
                maxAge = form.querySelector('input[name="maxAge"]').value;
            if(ProductModule.addProduct(image, name, price, description, brand, type, quantity, minAge, maxAge)){
               updateProductList();
            }

        });
    });

});


var main = document.querySelector('main');