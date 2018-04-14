
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
    var loggedUser = sessionStorage.getItem('logged');
    if(loggedUser){
        var users = JSON.parse(window.localStorage.getItem('users'));
        var user = users.find(x => x.email === loggedUser);
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
        //showCategories();

       
    //function showCategories(){
    // SHOW GATEGORIES
       
        var categories = JSON.parse(window.localStorage.getItem('categories'));        
        var colorStyles = ['#f53434','#e88102','#3bc91f','#55068e','#069eeb','#069eeb','#069eeb','#069eeb'];
        
        categories.forEach(function(category){
            var ul = document.querySelector('.navigation');
            var id = 0;
            /*
            ul.appendChild(document.querySelector(a, a.textContent ))
            var li = document.createElement('LI');
            var a  =document.createElement('a');
            var text = document.createTextNode(category.name);
            a.appendChild(text);
            li.appendChild(a);
            ul.appendChild(li);
              */
             var li = document.createElement('li');
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
    });
