
document.addEventListener('DOMContentLoaded', function () {
 
   // Get JSON
   

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
    }
        //showCategories();

        document.querySelector('.accountBtn').addEventListener('click',function(event){
            event.preventDefault();
            window.location = 'account.html';
        });
    
    //function showCategories(){
    // SHOW GATEGORIES
        var ul = document.querySelector('.navigation');
        var categories = localStorage.getItem('categories');
        var jsCat = JSON.parse(categories);
        jsCat.forEach(function(category){
            var li = document.createElement('LI');
            var a  =document.createElement('a');
            var text = document.createTextNode(category.name);
            a.appendChild(text);
            li.appendChild(a);
            ul.appendChild(li);
    });


});