
document.addEventListener('DOMContentLoaded', function () {
    var loggedUser = sessionStorage.getItem('logged');
    var users = JSON.parse(window.localStorage.getItem('users'));
    var user = users.find(x => x.email === loggedUser);
    if(user){
        var indexProfile = getTemplate('indexProfile');
        var template = Handlebars.compile(indexProfile);
        var temp = template(user);
        document.querySelector('.headderAuth').innerHTML = temp;
        document.querySelector('.accountBtn').addEventListener('click',function(event){
            event.preventDefault();
            window.location = 'account.html';
        })
    }
    
    

});