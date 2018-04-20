var ShoppingCartModule = (function () {
   
    
    var cart = JSON.parse(window.localStorage.getItem('cart')) || [];
    var products = JSON.parse(window.localStorage.getItem('products')) || [];
   

    function Product(productID, image, name, price, quantity){
        this.productID = productID;
        this.price = price;
        this.quantity = quantity;
        this.name = name;
        this.image = image;
        this.totalPrice = parseInt(quantity) * parseFloat(price).toFixed(2);
    }
    

    function Order(userID, price, date, productList){
        this.userID = userID;
        this.price = price;
        this.date = new Date();
        this.productList = [];
    }

    function saveCart() {
        if(window.localStorage){
            window.localStorage.setItem('cart',JSON.stringify(cart));
        }       
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("cart"));
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
                order = new Order(userId, price, date, productList);
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

        addProductToCart: function (productID, image, name, price, quantity) {
            var result = cart.find(product => product.productID === productID);
                if(result){
                        var product = products.find(item => item.id === productID);
                        if(product.quantity > result.quantity){
                            result.quantity += quantity;
                            result.totalPrice = price * result.quantity;
                            saveCart();
                            loadCart();
                            return true;
                        }else{
                            return false;
                        }
                      
                }else{
                    product = new Product(productID, image, name, price, quantity);      
                    cart.push(product);
                    saveCart();
                    loadCart();
                    return true;
                }
        },

        removeProductFromCart: function (productID) {
            var productIndex = this.findProductIndex(productID);

            if(productIndex !== -1){
                this.productList.splice(productIndex, 1);
                saveCart();
            }
        },

        updateQuantityInCart: function (productID, quantity) {
            var product = ProductModule.findProdID(productID);
            for(var i = 0; i < cart.length; i++){
                if(cart[i] === productID){
                    if( quantity < product.quantity )
                        cart[i].quantity === quantity;
                        saveCart();
                        loadCart();
                    }else{
                       break;
                    }                      
                
            }
            // var productIndex = this.findProductIndex(productID);

            // if(productIndex !== -1){
            //     this.quantity = quantity;
            // }

            // saveCart();
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