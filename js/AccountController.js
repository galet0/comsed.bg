
document.addEventListener('DOMContentLoaded', function () {
 
   // Get JSON

    // sendRequest('../json/products.json')
    //     .then(function(response) {
    //         if(response.length){
    //             window.localStorage.setItem('products',JSON.stringify(response));
    //         }
    //         return response;
    //     });
    // sendRequest('../json/types.json')
    //     .then(function(response) {
    //         if(response.length){
    //             window.localStorage.setItem('types',JSON.stringify(response));
    //         }
    //         return response;
    //     });
    // sendRequest('../json/categories.json')
    //     .then(function(response) {
    //         if(response.length){
    //             window.localStorage.setItem('categories',JSON.stringify(response));
    //         }
    //         return response;
    //     });

            
    var colorStyles = ['#f53434','#e88102','#3bc91f','#55068e','#069eeb','#069eeb','#069eeb','#069eeb'],
        categories = JSON.parse(window.localStorage.getItem('categories')),
        products = JSON.parse(window.localStorage.getItem('products')),
        loggedUser = sessionStorage.getItem('logged'),
        users,
        user;

    function showCategories(categories){
        categories.forEach(function(category){
            var ul = document.querySelector('.navigation'),
                id = 0,
                li = document.createElement('li');
            li.innerHTML = '<a href=' + category.id + '.html>' + category.name +'</a>';
            ul.appendChild(li);
            if(category.types){                  
                var ulIN= document.createElement('ul');             
                category.types.forEach(function(type){
                    var li = document.createElement('li');
                    li.innerHTML = '<a href=' + type.id + '.html>' + type.name +'</a>';
                    li.style.backgroundColor = colorStyles[id];              
                    ulIN.appendChild(li);                    
                    id++;
                });
                li.appendChild(ulIN);
            }
        });
    }   
    // Change button in logged user
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

    
    // SHOW GATEGORIES  
    if(categories){
        showCategories(categories);
    }
    
    //Get promo products and show in index page
    // var promoProducts = products.filter(product => product.hasPromo);
    // console.log(promoProducts);
    // var promoBrands = [];
    // if(promoProducts){
    //     promoProducts.forEach(function(product){
    //         if(promoBrands.indexOf(product.brand) === -1){
    //             promoBrands.push(product.brand);
    //         }
    //     });
    //     console.log(promoBrands);
    // }
   
    var firstCategoryProducts = products.filter(product => product.type === 1),
        div = document.querySelector('.firstCategory'),
        parent = document.querySelector('.row-slider');

    if(firstCategoryProducts.length > 5){
        // Add <h3> tag
        var header = document.createElement('h3');
        header.textContent = TypeModule.findByTypeID(firstCategoryProducts[0].type).name;
        parent.insertBefore(header, parent.children[0]);
        for(var i = 0; i < 5; i++){
        var childDiv = document.createElement('div');
        childDiv.className = 'img-column';
        childDiv.innerHTML = '<a href= ' + firstCategoryProducts[i].id
                                     + '.html ><img src =' + firstCategoryProducts[i].image + '></a><h3>' 
                                     + firstCategoryProducts[i].name +'</h3><h2>' + firstCategoryProducts[i].price.toFixed(2) +'лв'
                                     + '</h2><button> Купи </button>';
        div.appendChild(childDiv);
        }
                   

         
           
           


       }
    
    
});
