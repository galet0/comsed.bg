(function() {


    var colorStyles = ['#f53434','#e88102','#3bc91f','#55068e','#069eeb','#069eeb','#069eeb','#069eeb'],
        categories = JSON.parse(window.localStorage.getItem('categories')),
        products = JSON.parse(window.localStorage.getItem('products')),
        loggedUser = sessionStorage.getItem('logged'),
        users,
        user,
        cart,
        selectOption;

        var searchBox =document.querySelector('header input');
        // var searchBox = document.querySelector('.search');
       
        searchBox.addEventListener('keyup', searchBar);
    
        function searchBar(event){
            event.preventDefault();
            var inputVal = event.target.value.toLowerCase();      
            var result = products.filter(function(product){
                return ((product.name.toLowerCase()).indexOf(inputVal) !== -1) || product.brand.toLowerCase().indexOf(inputVal) !== -1
            });
            visualizeProducts(result, document.querySelector('.column-right'))
        }
    

        links = document.querySelectorAll('footer a, header a');
    
        Array.from(links).forEach(function(link){
            link.addEventListener('click', function(event){
                event.preventDefault();
                AppController.navigatePages(link.href);
            });
            
        })

    function visualizeProducts(showProd, productsView, categoryType){

        if (showProd.length) {
            var selectItem = '<select id="select"><option label="Изберете"><option value="date">Дата</option><option value="priceUp">Цена възх.</option><option value="priceDown">Цена низх.</option></select>'
            var div = document.createElement('div'); 
            div.setAttribute('class','selectItem');
            div.innerHTML = selectItem;           
            productsView.innerHTML = div;

            var prod = AppController.getNumberPage(showProd),
                productTemplate = AppController.getControllerTemplate('products', 'products'),
                template = Handlebars.compile(productTemplate),
                temp;
            if ( categoryType === null){
                temp = template({ products: prod});
            } else {
                temp = template({ products: prod, categoryType : categoryType});
            }
           
           
            productsView.innerHTML = temp;

            //insert select for sorting products price, date
            var row= document.querySelector('.row');
            var newE = row.childNodes[3];
            newE.appendChild(div);


            showList(showProd, productsView, categoryType);

            selectOption = document.getElementById('select');
            selectOption.addEventListener('change', function(event){
                event.preventDefault();
                var result = [],
                    listProducts;
                if(this.value === 'date'){
                    
                }
                if(this.value === 'priceUp'){
                    showProd.sort((a,b) => a.price - b.price);

                    
                    var prod = AppController.getNumberPage(showProd),
                    productTemplate = AppController.getControllerTemplate('products', 'products'),
                    template = Handlebars.compile(productTemplate),
                    temp = template({ products: prod, categoryType : categoryType});
                    productsView.innerHTML = temp;

                    //insert select for sorting products price, date
                    var row= document.querySelector('.row');
                    var newE = row.childNodes[3];
                    newE.appendChild(div);

                    showList(showProd,productsView);

                } 
                if(this.value === 'priceDown'){
                    showProd.sort((a,b) => b.price - a.price);

                    
                    var prod = AppController.getNumberPage(showProd),
                    productTemplate = AppController.getControllerTemplate('products', 'products'),
                    template = Handlebars.compile(productTemplate),
                    temp = template({ products: prod, categoryType : categoryType});
                    productsView.innerHTML = temp;

                    //insert select for sorting products price, date
                    var row= document.querySelector('.row');
                    var newE = row.childNodes[3];
                    newE.appendChild(div);

                    showList(showProd,productsView);    
                }    
            });
            
        }else{
            
            productsView.innerHTML = '<h1> Няма намерени продукти </h1>'
        }
}

             

    // SHOW CATEGORIES AND TYPES   
    function initCategoriesNavigation(){    
        categories.forEach(function(category){
            var ul = document.querySelector('.navigation'),
                id = 0,
                li = document.createElement('li');
            li.innerHTML = '<a href="/html/products.html" name="category" id=' + category.id +'>' + category.name +'</a>';
            ul.appendChild(li);
            if(category.types){                  
                var ulIN= document.createElement('ul');             
                category.types.forEach(function(type){
                    var li = document.createElement('li');
                    li.innerHTML = '<a href="/html/products.html" name="typeID" id='+ type.id + '>' + type.name +'</a>';
                    li.style.backgroundColor = colorStyles[id];              
                    ulIN.appendChild(li);                    
                    id++;
                });
                li.appendChild(ulIN);
            }
        });


        function searchProducts(){
            var searchBox = document.querySelector('.search');
            searchBox.addEventListener('keyup', searchBar);

            function searchBar(event){
                event.preventDefault();
                var inputVal = event.target.value.toLowerCase(),      
                result = products.filter(function(product){
                    return ((product.name.toLowerCase()).indexOf(inputVal) !== -1) || product.brand.toLowerCase().indexOf(inputVal) !== -1
                });
                visualizeProducts(result, document.querySelector('.column-right'))
            }
        }
        var links = document.querySelectorAll('main .navigation a');
        Array.from(links).forEach(function (link) {
            link.addEventListener('click', linkClick);
        });
        // clicked first link
        links[0].click();
    }
   
    function getAllProducts(){
        var prod = AppController.getNumberPage(showProd),
        prod
        uctTemplate = AppController.getControllerTemplate('products', 'products'),
        template = Handlebars.compile(productTemplate),
        temp = template({ products: prod });
        productsView.innerHTML = temp;             
        

    }

    function linkClick (event) {
        event.preventDefault();
        var page = AppController.getUrlPage(this.href);
        var showProd = [],
            categoryType,
            productsView = document.querySelector('.column-right');
        // show all products in the cattegory   
        if (this.name === 'category') {
            var types = TypeModule.getTypesByCategoryId(parseInt(this.id));
            for (var i = 0; i < types.length; i++) {
                showProd = showProd.concat(products.filter(product => product.typeID === types[i].id));
                if(showProd.length){
                    categoryType = TypeModule.findByTypeID(showProd[0].typeID);
                } 
            }
        }
        //show all products for the clicked typeID
        if (this.name === 'typeID') {
            showProd = products.filter(product => product.typeID === parseInt(this.id));
            if(showProd.length){
                var getType = TypeModule.findByTypeID(showProd[0].typeID);
                categoryType = TypeModule.findByTypeID(getType.products[0].typeID);
            }
        }        
        if (showProd.length) {
            var selectItem = '<select id="select"><option label="Изберете"><option value="date">Дата</option><option value="priceUp">Цена възх.</option><option value="priceDown">Цена низх.</option></select>'
            var div = document.createElement('div'); 
            div.setAttribute('class','selectItem');
            div.innerHTML = selectItem;           
            productsView.innerHTML = div;

            var prod = AppController.getNumberPage(showProd),
            productTemplate = AppController.getControllerTemplate('products', 'products'),
            template = Handlebars.compile(productTemplate),
            temp = template({ products: prod, categoryType : categoryType});
            productsView.innerHTML = temp;

            //insert select for sorting products price, date
            var row= document.querySelector('.row');
            var newE = row.childNodes[3];
            newE.appendChild(div);
             
             // ***********************TAKE FIRST SHOW PRODUCTS *****************
          var buyBtn = document.querySelectorAll('.buy');
          console.log(buyBtn);
          if(buyBtn){
              Array.from(buyBtn).forEach(function(btn){
                 btn.addEventListener('click',addToCart)});
            
          }  

            showList(showProd, productsView, categoryType);


            
           
            selectOption = document.getElementById('select');
            selectOption.addEventListener('change', function(event){
                event.preventDefault();
                var result = [],
                    listProducts;
                if(this.value === 'date'){
                    
                }
                if(this.value === 'priceUp'){
                    showProd.sort((a,b) => a.price - b.price);

                    
                    var prod = AppController.getNumberPage(showProd),
                    productTemplate = AppController.getControllerTemplate('products', 'products'),
                    template = Handlebars.compile(productTemplate),
                    temp = template({ products: prod, categoryType : categoryType});
                    productsView.innerHTML = temp;

                    //insert select for sorting products price, date
                    var row= document.querySelector('.row');
                    var newE = row.childNodes[3];
                    newE.appendChild(div);

                    showList(showProd,productsView);

                } 
                if(this.value === 'priceDown'){
                    showProd.sort((a,b) => b.price - a.price);

                    
                    var prod = AppController.getNumberPage(showProd),
                    productTemplate = AppController.getControllerTemplate('products', 'products'),
                    template = Handlebars.compile(productTemplate),
                    temp = template({ products: prod, categoryType : categoryType});
                    productsView.innerHTML = temp;

                    //insert select for sorting products price, date
                    var row= document.querySelector('.row');
                    var newE = row.childNodes[3];
                    newE.appendChild(div);

                    showList(showProd,productsView); 
                    // ***************GET ALL BUY BUTTONS************************
        
          
                }
                    
            });
             
            
            

            var linkProducts = document.querySelectorAll('.column-right ul li button');
            
            console.log(linkProducts);
        
       
        
        
        
        } else {
            productsView.innerHTML = '<h1> Няма намерени продукти </h1>';
        } 
    }
       function showList(showProd, productsView, categoryType){

            var itemsPages = productsView.querySelectorAll('a[id]');
            if (itemsPages.length > 1){
    
                Array.from(itemsPages).forEach(function(page){
                    page.addEventListener('click',function(event){
                        event.preventDefault();
                        prod = AppController.getNumberPage(showProd);
                        prod = prod[this.id - 1].prod;
                        productTemplate = AppController.getControllerTemplate('products','productsPerPage');
                        template = Handlebars.compile(productTemplate),
                        temp = template({ products: prod});

                    productsView.querySelector('.productList').innerHTML = temp;
                    
                    buyBtn = document.querySelectorAll('.buy');      
                    if (buyBtn){
                        Array.from(buyBtn).forEach(function(btn){
                        btn.addEventListener('click',addToCart)});
                    }
                 
                })    
               
                     
            });  
          
          
        }
       
        return productsView; 
       
    } 

    
   


    ///**************ADD PRODUCTS TO CART**************** */
    function addToCart(event){        
        event.preventDefault();
        
        var product = ProductModule.findProdID(parseInt(event.target.value));
        if(ShoppingCartModule.addProductToCart(product.id, product.image, product.name, product.price, 1)){
            var count = document.querySelector('.prodCart');
            cart = JSON.parse(window.localStorage.getItem('cart'));
            count.textContent = '(' + cart.length + ')';
        }else{
            var mess = document.querySelector('.mess');
            mess.textContent = 'Продъктът не може да бъде добавен в кошницата';
                mess.style.display = 'inline-block';                
                setInterval(function(){
                    mess.style.display='none';
                    return mess;
            },1000)
            mess.style.display ='none';
           
        }
    }
   
	
   
        // if(basketBtn){
        //     basketBtn.addEventListener('click',function(event){
        //         event.preventDefault();
        //         AppController.gotoPage('shopping-cart.html');
        //         })
        // }

    function initPage() {
        initCategoriesNavigation();
        something.checkLogged('products');
        buyBtn = document.querySelectorAll('.buy');

        
    }
    var count = document.querySelector('.prodCart');
    cart = JSON.parse(window.localStorage.getItem('cart'));
    if(count){
        count.textContent = '(' + cart.length + ')';
    }
    basketBtn = document.querySelector('.basket');
    AppController.registerController('products', {
        initPage: initPage
        
    });

})();