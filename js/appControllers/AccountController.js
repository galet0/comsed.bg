   
 (function(){



    function initPage(){


        
    }
        // Get JSON
     
        //  sendRequest('../json/products.json')
        //      .then(function(response) {
        //          if(response.length){
        //              window.localStorage.setItem('products',JSON.stringify(response));
        //          }
        //          return response;
        //      });
        //  sendRequest('../json/types.json')
        //      .then(function(response) {
        //          if(response.length){
        //              window.localStorage.setItem('types',JSON.stringify(response));
        //          }
        //          return response;
        //      });
        //  sendRequest('../json/categories.json')
        //      .then(function(response) {
        //          if(response.length){
        //              window.localStorage.setItem('categories',JSON.stringify(response));
        //          }
        //          return response;
        //      });
     
                 
         var colorStyles = ['#f53434','#e88102','#3bc91f','#55068e','#069eeb','#069eeb','#069eeb','#069eeb'],
             categories = JSON.parse(window.localStorage.getItem('categories')),
             products = JSON.parse(window.localStorage.getItem('products')),
             loggedUser = sessionStorage.getItem('logged'),
             users,
             user;
            //  var ul = document.querySelector('.navigation');
            //  var navTemplate = getTemplate('navigation');
            //  var template = Handlebars.compile(navTemplate);
            //  var temp = template({categories : categories, products: products, colorStyles: colorStyles});
            //  ul.innerHTML = temp;
         // SHOW CATEGORIES AND TYPES   
         function showCategories(){    
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
         }
     
         if(categories){
             showCategories();
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
     
         //SHOW PRODUCTS FROM FIRST TYPE ON INDEX PAGE
         var firstCategoryProducts = products.filter(product => product.type === 1),
             div = document.querySelector('.firstCategory'),
             parent = document.querySelector('.row-slider');
     
         if(firstCategoryProducts.length > 5){
             // Add <h3> tag
             var header = document.createElement('a');
             //header.href = TypeModule.findByTypeID(firstCategoryProducts[0].type) + '.html';
             var textContent = document.createTextNode(TypeModule.findByTypeID(firstCategoryProducts[0].type).name);
             header.setAttribute('href', '/html/products.html');
             header.appendChild(textContent);
             parent.insertBefore(header, parent.children[0]);
             for(var i = 0; i < 15; i++){
                 var childDiv = document.createElement('div');
                 childDiv.className = 'img-column';
                 childDiv.innerHTML = '<a href="/html/view-product.html" name="product" value="'+ firstCategoryProducts[i].id + '"><img src =' + firstCategoryProducts[i].image + '></a><h3>' 
                                          + firstCategoryProducts[i].name +'</h3><h2>' + firstCategoryProducts[i].price +'лв'
                                          + '</h2><button> Купи </button>';
                 div.appendChild(childDiv);
             }
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
         
         function getNumberPage(products){
             var page = 12;
             var pages = Math.ceil(products.length/12);
             var productPage =[];
             if(pages !== 0){
                 for(var i = 0; i < pages; i++){
                    productPage.push(
                       {
                           i : i + 1,
                           prod : products.slice(i * 12, 12 *(i+1))
                       }
                     );       
                 }
             }
             return productPage;
         }        
          // SHOW PRODUCTS PAGE 
 
         var links = document.querySelectorAll('a');
         Array.from(links).forEach(function(link){
             link.addEventListener('click',function(event){
                 event.preventDefault();
                 var showProd,
                     getHref = AppController.getUrlPage(link.href),
                     aside = document.querySelector('.column-right');
                 // show all products in the cattegory   
                 if(link.name === 'category'){
                    var types = TypeModule.getTypesByCategoryId(parseInt(link.id));
                    for(var i = 0; i < types.length; i++){
                         showProd += products.filter(product => product.type === types[i].id);
                     }
                     var prod = getNumberPage(showProd);           
                     var productTemplate = getTemplate('products'),
                         template = Handlebars.compile(productTemplate),
                         temp = template({products: prod});
                     aside.innerHTML = temp;
                     history.pushState({ getHref: getHref }, getHref.slice(0, 1).toUpperCase() + getHref.slice(1), link.href);
                     
                    }
                 //show all products for the clicked type
                 if(link.name ==='type'){ 
                     showProd = [];
                     showProd = products.filter(product => product.type === parseInt(link.id));
                     if(showProd.length){
                         var prod = getNumberPage(showProd);
                         var productTemplate = getTemplate('products'),
                         template = Handlebars.compile(productTemplate),
                         temp = template({products: prod});
                         aside.innerHTML = temp;
                    
                     }else{
                         var h1 = '<h1> Няма намерени продукти </h1>';
                         aside.innerHTML = h1;
                         
                     }
                 }
                 //show product page
                 if(link.name === 'product'){     
     
                 }
             })
         })
        
        AppController.registerController('index', {
            initPage : initPage
        })    
 })();