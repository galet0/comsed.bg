var ProductModule = (function () {

    var products = JSON.parse(window.localStorage.getItem('products')) || [];
    Product.prototype.productID = 1;

    function Product(image, name, price, description, brand, typeID, quantity, minAge, maxAge) {
        this.id = Product.prototype.productID++;
        this.image = image;
        this.name = name;
        this.price = price;
        this.description = description;
        this.brand = brand;
        this.type = typeID;
        this.quantity = quantity;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.hasPromo = false;
    }



    Product.prototype.updateProductsList = function () {
        window.localStorage.setItem('products', products);
    };

    return {
        findProductByName: function (name) {
            return products.findIndex(function (product) {
                return product.name === name;
            });
        },

        findProductById: function (prodID) {
            return products.findIndex(function (prod) {
                return prod.id === prodID;
            })
        },

        getAllProducts: function () {
            var products = window.localStorage.getItem('products');
            console.log(products);
            products = JSON.parse(products);
            console.log(products);
            return products;
        },

        addProduct: function (image, name, price, description, brand, typeID, quantity, minAge, maxAge) {
            var prodIndex = this.findProductByName(name);
            if(prodIndex === -1){
                var product = new Product(image, name, price, description, brand, typeID, quantity, minAge, maxAge);
                products.push(product);
                window.localStorage.setItem('products', JSON.stringify(products));
                var type = TypeModule.findByTypeID(typeID);
                type.products.push(product);
                return product.id;
            } else {
                console.log('Вече съществува продукт с това име!');
            }
        },

        deleteProduct: function (productID, typeID) {
            var prodIndex = this.findProductById(productID);
            if(prodIndex !== -1){
                var type = TypeModule.findByTypeID(typeID);
                products.splice(prodIndex, 1);
                type.products.splice(prodIndex, 1);
            } else {
                console.log('Не съществува продукт с това име!');
            }
        },

        updateProduct: function (prodID, image, name, price, description, brand, typeID, quantity, minAge, maxAge) {
            var prodIndex = this.findProductById(prodID);
            if(prodIndex !== -1){
                var prod = products.slice(prodIndex, 1)[0];
                if(image !== undefined && image != null && image !== ''){
                    prod.image = image;
                }
                if(name !== undefined && name != null && name !== ''){
                    prod.name = name;
                }
                if(isNaN(price)){
                    prod.price = price;
                }
                if(description !== undefined && description != null && description !== ''){
                    prod.description = description;
                }
                if(brand !== undefined && brand != null && brand !== ''){
                    prod.brand = brand;
                }
                if(isNaN(typeID)){
                    prod.typeID = typeID;
                }
                if(isNaN(quantity)){
                    prod.quantity = quantity;
                }
                if(isNaN(minAge)){
                    prod.minAge = minAge;
                }
                if(isNaN(maxAge)){
                    prod.maxAge = maxAge;
                }

                products[prodIndex] = prod;
            } else {
                console.log('Не съществува продукт с това име!');
            }
        }
    }
})();


