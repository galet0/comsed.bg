(function() {
    var colorStyles = ['#f53434','#e88102','#3bc91f','#55068e','#069eeb','#069eeb','#069eeb','#069eeb'],
        categories = JSON.parse(window.localStorage.getItem('categories')),
        products = JSON.parse(window.localStorage.getItem('products')),
        loggedUser = sessionStorage.getItem('logged'),
        users,
        user;
        
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
                    li.innerHTML = '<a href="/html/products.html" name="type" id='+ type.id + '>' + type.name +'</a>';
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

    function linkClick (event) {
        event.preventDefault();
        var showProd = [],
            productsView = document.querySelector('.column-right');
        // show all products in the cattegory   
        if (this.name === 'category') {
            var types = TypeModule.getTypesByCategoryId(parseInt(this.id));
            for (var i = 0; i < types.length; i++) {
                showProd = showProd.concat(products.filter(product => product.type === types[i].id));
            }
        }
        //show all products for the clicked type
        if (this.name === 'type') {
            showProd = products.filter(product => product.type === parseInt(this.id));
        }
        
        if (showProd.length) {
            var prod = AppController.getNumberPage(showProd),
                productTemplate = AppController.getControllerTemplate('products', 'products'),
                template = Handlebars.compile(productTemplate),
                temp = template({ products: prod });
                productsView.innerHTML = temp;
                
                var items = productsView.querySelectorAll('a');
                console.log(items);
                
        } else {
            productsView.innerHTML = '<h1> Няма намерени продукти </h1>';
        }
    };

    function initPage() {
        if (categories) {
            initCategoriesNavigation();
        }
    }

    AppController.registerController('products', {
        initPage: initPage
    });
})();