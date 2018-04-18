   
 (function(){

    function initPage(){
        //SHOW PRODUCTS FROM FIRST TYPE ON INDEX PAGE
       if (categories){
            showCategories();
        } 
        getProductsSlider();        
       // AppController.navigatePages();
    
    }
   
    AppController.navigatePages();
    function getProductsSlider(){
        var firstCategoryProducts = products.filter(product => product.type === 1),
            div = document.querySelector('.firstCategory'),
            parent = document.querySelector('.row-slider');
            console.log(div);
            console.log(document);
        if(firstCategoryProducts.length > 5){
        // Add <h3> tag
            var header = document.createElement('a'),
                textContent = document.createTextNode(TypeModule.findByTypeID(firstCategoryProducts[0].type).name);
            header.setAttribute('href', 'products.html');
            header.appendChild(textContent);
            console.log(parent);
            parent.insertBefore(header, parent.children[0]);
            for (var i = 0; i < 15; i++){
                var childDiv = document.createElement('div');
                childDiv.className = 'img-column';
                childDiv.innerHTML = '<a href="/html/view-product.html" name="product" value="'+ firstCategoryProducts[i].id + '"><img src =' + firstCategoryProducts[i].image + '></a><h3>' 
                                    + firstCategoryProducts[i].name +'</h3><h2>' + firstCategoryProducts[i].price +'лв'
                                    + '</h2><button  value="'+ firstCategoryProducts[i].id+'"> Купи </button>';
                div.appendChild(childDiv);
            }
        }
        moveProducts();
    }
    // Get JSON
    
   
                 
    var colorStyles = ['#f53434','#e88102','#3bc91f','#55068e','#069eeb','#069eeb','#069eeb','#069eeb'],
        categories = JSON.parse(window.localStorage.getItem('categories')),
        products = JSON.parse(window.localStorage.getItem('products')),
        loggedUser = sessionStorage.getItem('logged'),
        users,
        user;
       
    // SHOW CATEGORIES AND TYPES   
    function showCategories(){    
        categories.forEach(function(category){
            var ul = document.querySelector('.navigation'),
                id = 0,
                li = document.createElement('li');
            li.innerHTML = '<a href="/html/products.html" name="category" id=' + category.id +'>' + category.name +'</a>';
            ul.appendChild(li);
            if (category.types){                  
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
       
        var nav = document.querySelectorAll('header a');
        Array.from(nav).forEach(function (link) {
            link.addEventListener('click', function(event){
                console.log(link.href);
                AppController.gotoPage(link.href);
            })
        })

        var links = document.querySelectorAll('main .navigation a');        
        Array.from(links).forEach(function (item) {
            item.addEventListener('click', linkClick)});  
    }

    function linkClick (event) {
        event.preventDefault();
        
        if (this.name === 'type') {
            AppController.gotoPage(this.href);
        }if (this.name === 'category'){
            AppController.gotoPage(this.href);
        }if(this.name === 'view-product'){

        }
        
        // } else {
        //     productsView.innerHTML = '<h1> Няма намерени продукти </h1>';
        // }
    }
   
    // SHOW GATEGORIES  
     if(loggedUser){
            users = JSON.parse(window.localStorage.getItem('users'));
            user = users.find(x => x.email === loggedUser);
            if(user){
                var indexProfile = getTemplate('indexProfile');
                var template = Handlebars.compile(indexProfile);
                var temp = template(user);
                document.querySelector('.headderAuth').innerHTML = temp;    
            }
            document.querySelector('.accountBtn').addEventListener('click',function(event){
                event.preventDefault();
                window.location = 'account.html';
            });    
        }     
  
  
    // WHEN ARROWS CLICKED CHANGE ITEMS
    var arrowButtons = document.querySelectorAll('button');
    var count = 0;
    Array.from(arrowButtons).forEach(function(button){
        button.addEventListener('click',function(event){
            event.preventDefault();   
            var narrow = button.firstElementChild.classList["1"];           
            getAll = document.querySelectorAll('.img-column');
            if(count === getAll.length){
                count = 0;
            }
            //console.log(getAll);            
            if(narrow === "left"){
                ++count;
               for(var i = 0; i < 4; i++){
                    getAll[i].innerHTML = '<a href="/html/view-product.html value='+ firstCategoryProducts[count+i].id  
                    + '><img src =' + firstCategoryProducts[count+i].image + '></a><h3>' 
                    + firstCategoryProducts[count+i].name +'</h3><h2>' + firstCategoryProducts[count+i].price.toFixed(2) +'лв'
                    + '</h2><button value="'+ firstCategoryProducts[i].id+'"> Купи </button>';
                }
            }else{
                ++count;
                for(var i = 0; i < 4; i++){
                    getAll[i].innerHTML = '<a href="/html/view-product.html value="' + firstCategoryProducts[count-i].id + '"><img src =' + firstCategoryProducts[count-i].image + '></a><h3>' 
                    + firstCategoryProducts[count-i].name +'</h3><h2>' + firstCategoryProducts[count-i].price.toFixed(2) +'лв'
                    + '</h2><button value="'+ firstCategoryProducts[i].id+'"> Купи </button>';
                }
            }
        });
    }); 
    
   
         function moveProducts(){  
            var firstCategoryProducts = products.filter(product => product.type === 1);
             var arrowButtons = document.querySelectorAll('button');
             var count = 0;
             Array.from(arrowButtons).forEach(function(button){
                 button.addEventListener('click',function(event){
                     event.preventDefault();   
                     var narrow = button.firstElementChild.classList["1"];           
                     getAll = document.querySelectorAll('.img-column');
                     if(count === getAll.length){
                         count = 0;
                     }
                     //console.log(getAll);            
                     if(narrow === "left"){
                         ++count;
                        for(var i = 0; i < 4; i++){
                             getAll[i].innerHTML = '<a href="/html/view-product.html value="'+ firstCategoryProducts[count+i].id + '"><img src =' + firstCategoryProducts[count+i].image + '></a><h3>' 
                             + firstCategoryProducts[count+i].name +'</h3><h2>' + firstCategoryProducts[count+i].price.toFixed(2) +'лв'
                             + '</h2><button> Купи </button>';
                         }
                     }else{
                         ++count;
                         for(var i = 0; i < 4; i++){
                             getAll[i].innerHTML = '<a href="/html/view-product.html value="' + firstCategoryProducts[count-i].id + '"><img src =' + firstCategoryProducts[count-i].image + '></a><h3>' 
                             + firstCategoryProducts[count-i].name +'</h3><h2>' + firstCategoryProducts[count-i].price.toFixed(2) +'лв'
                             + '</h2><button> Купи </button>';
                         }
                     }
                 });
             }); 
         }
        AppController.registerController('index', {
            initPage : initPage
        })    
 })();


        // //JSON 
    // function sendRequest(url) {
    //     return new Promise(function(resolve, reject) {
    //         var xhr;
    //         try {
    //             xhr = new XMLHttpRequest();
    //         } catch (err) {
    //             try {
    //                 // code for old IE browsers
    //                 xhr = new ActiveXObject("Microsoft.XMLHTTP");
    //             } catch (err) {
    //                 error(new Error('no ajax sorry'));
    //             }
    //         }
    
    //         if (xhr) {
    //             xhr.addEventListener('readystatechange', function(event) {
    //                 //console.log('readystatechange', xhr.readyState, xhr.status);
    //                 if (xhr.readyState === 4) {
    //                     if (xhr.status === 200) {
    //                         resolve(JSON.parse(xhr.responseText));
    //                     } else {
    //                         reject(new Error(xhr.status));
    //                     }
    //                 }
    //             });
    //             xhr.open('GET', url, true);
    //             xhr.send(null);
    //        }
    //     });
    // }
     
    //      sendRequest('../json/products.json')
    //          .then(function(response) {
    //              if(response.length){
    //                  window.localStorage.setItem('products',JSON.stringify(response));
    //              }
    //              return response;
    //          });
    //      sendRequest('../json/types.json')
    //          .then(function(response) {
    //              if(response.length){
    //                  window.localStorage.setItem('types',JSON.stringify(response));
    //              }
    //              return response;
    //          });
    //      sendRequest('../json/categories.json')
    //          .then(function(response) {
    //              if(response.length){
    //                  window.localStorage.setItem('categories',JSON.stringify(response));
    //              }
    //              return response;
    //          });
     