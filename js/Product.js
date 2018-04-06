var ProductModel = (function () {

    var products = [];

    function Product(name, price, brand, category, type, quantity) {
        this.id = Product.prototype.productID++;
        this.name = name;
        this.price = price;
        this.brand = brand;
        this.category = category;
        this.type = type;
        this.quantity = quantity;
    }

    Product.prototype.productID = 1;

    return {
        createProduct: function (name, price, brand, category, type, quantity) {
            var product = new Product(name, price, brand, category, type, quantity);
            products.push(product);
            return product.id;
        },

        getAllProducts: function () {
            return products;
        },

        getProductsByCategory: function (categoryName) {
            return products.filter(function (prod) {
                return prod.category.name === categoryName;
            });
        },

        getProductsByType: function (type) {
            return products.filter(function (prod) {
                return prod.type === type;
            })
        }
    }
})();
