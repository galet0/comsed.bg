(function(){

    var cart = JSON.parse(window.localStorage.getItem('cart'));
    console.log(cart);
    function initPage(){
        loadBasket();
    }

    var loggedUser = window.sessionStorage.getItem('logged');
    function loadBasket(){

        var total = 0;
        for(var i = 0; i < cart.length; i++){
            total += cart[i].totalPrice ;
        }
       
        var basketTemplate = AppController.getControllerTemplate('shopping-cart', 'cart'),
            template = Handlebars.compile(basketTemplate),
            temp = template({cart : cart, total: total});
            document.querySelector('main').innerHTML = temp;

            document.querySelector('.order').addEventListener('click',function(event){
                event.preventDefault();
                if(!loggedUser){
                    var error = document.querySelector('.error');
                    error.textContent = 'Моля влезте в профила си, за да приключите поръчката';
                    error.style.display = ' block';
                    error.style ="margin-left:662px";
                    error.style.color = 'red';
                }
            })
            
            document.querySelector('.btn-primary').addEventListener('click',function(event){
                event.preventDefault();
                console.log(event);
                var getInput = document.querySelector('input[name="quantity"]').value;
                console.log(getInput);
                var productID = event.target.id;
                console.log(event.target.id);
                ShoppingCartModule.updateQuantityInCart(parseInt(productID), getInput);
                var cart = JSON.parse(window.localStorage.getItem('cart'));

                for(var i = 0; i < cart.length; i++){
                    if(cart[i].productID === productID){
                        document.querySelector('input[name="quantity"]').value = cart[i].quantity;
                    }
                }

            })
    }

    AppController.registerController('shopping-cart',{
        initPage: initPage
    })
})()