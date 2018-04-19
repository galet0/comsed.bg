(function() {
    var colorStyles = ['#f53434','#e88102','#3bc91f','#55068e','#069eeb','#069eeb','#069eeb','#069eeb'],
        categories = JSON.parse(window.localStorage.getItem('categories')),
        products = JSON.parse(window.localStorage.getItem('products')),
        loggedUser = sessionStorage.getItem('logged'),
        users,
        user,
        selectOption;

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
            
            var linkProducts = document.querySelectorAll('.column-right ul li button');
            
            console.log(linkProducts);
            Array.from(linkProducts.querySelectorAll('button')).forEach(function(button){
                button.addEventListener('click', function(event){
                    event.preventDefault();

                    console.log(button.childNodes);
                })
            })

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
                    })                       
            });   
        }
        return productsView;              
    } 
    
   
    function initPage() {
        AppController.navigatePages();
        initCategoriesNavigation();        
    }
    AppController.registerController('products', {
        initPage: initPage
        
    });
})();