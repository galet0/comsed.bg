var ShoppingCartModule = (function () {

    var cart = [];

    function Order(productID, price, quantity, userID){
        this.productList = [];
        this.productID = productID;
        this.price = price;
        this.quantity = quantity;
        this.userID = userID;
    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();

    return{
        findProductIndex: function (productID) {
            return this.productList.findIndex(function (prod) {
                return prod === productID;
            });
        },

        createOrder: function (productID, price, quantity, userID) {
            var productIndex = this.findProductIndex(productID);
            var order;
            if(productIndex === -1){
                order = new Order(productID, price, quantity, userID);
                this.productList.push(productID);
                cart.push(order);
            } else {
                order = cart.find(function (ord) {
                    return ord.productList.findIndex(function (prod) {
                        return prod === productID;
                    });
                });

                order.quantity += quantity;
            }

            saveCart();
        },

        addProductToCart: function (productID, price, quantity) {
            var order = new Order(productID, price, quantity);
            cart.push(order);
            saveCart();
        },

        removeProductFromCart: function (productID) {
            var productIndex = this.findProductIndex(productID);

            if(productIndex !== -1){
                this.productList.splice(productIndex, 1);
                saveCart();
            }
        },

        updateQuantityInCart: function (productID, quantity) {
            var productIndex = this.findProductIndex(productID);

            if(productIndex !== -1){
                this.quantity = quantity;
            }

            saveCart();
        },

        totalSumInCart: function () {
            return cart.forEach(function (order) {
                return order.quantity * order.price;
            });
        },

        viewCart: function () {
            cart.forEach(function (order) {
                //TODO
            })
        },

        clearCart: function () {
            cart = [];
            saveCart();
        }
    }
})();