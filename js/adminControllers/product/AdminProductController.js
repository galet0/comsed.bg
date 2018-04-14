
document.addEventListener('DOMContentLoaded', function () {
    console.log(document);
    function showProductList(){
        var products = ProductModule.getAllProducts();
        console.log(products);
        var showProductList = getTemplate('showProductList');
        if(showProductList){

            Handlebars.registerHelper("getValue", function(val) {
                if(val === undefined) {
                    return "null";
                }
                return val;
            });
            var template = Handlebars.compile(showProductList);
            var html = template(products);   
            var table = main.querySelector('.panel-body'); 
            table.innerHTML = html;

            Array.from(document.querySelectorAll('.btn-edit')).forEach(function(btn) {
                btn.addEventListener('click', function (event) {
                    event.preventDefault();
                    var editProductTmpl = getTemplate('editProduct');
                    if(editProductTmpl){
                        main.innerHTML = editProductTmpl;
                    }
                });
            });

            Array.from(document.querySelectorAll('.btn-delete')).forEach(function(btn) {
                btn.addEventListener('click', function (event) {
                    event.preventDefault();
                    this.parentNode.parentNode.removeChild(this.parentNode);
                    ProductModule.deleteProduct();
                });
            });
        }
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
                price = parseFloat(form.querySelector('input[name="price"]').value),
                brand = form.querySelector('input[name="brand"]').value,
                quantity = parseInt(form.querySelector('input[name="quantity"]').value),
                minAge = parseInt(form.querySelector('input[name="minAge"]').value),
                maxAge = parseInt(form.querySelector('input[name="maxAge"]').value);
            if(ProductModule.addProduct(image, name, price, description, brand, type, quantity, minAge, maxAge)){
                console.log('added');
                showProductList();
            }
            console.log('save');
        });
    });

    var main = document.querySelector('main');
    showProductList();
    // init
    

    
    

});

