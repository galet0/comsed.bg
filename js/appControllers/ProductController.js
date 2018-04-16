document.addEventListener('DOMContentLoaded',function(){

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

var showProd,
    getHref = getUrlPage(link.href),
    aside = document.querySelector('.column-right');
showProd = [];
showProd = products.filter(product => product.type === parseInt(link.id));
if(showProd.length){
    var prod = getNumberPage(showProd);
    var productTemplate = getTemplate('products'),
    template = Handlebars.compile(productTemplate),
    temp = template({products: prod});
aside.innerHTML = temp;
}
})
