
document.addEventListener('DOMContentLoaded', function () {
    var loggedUser = sessionStorage.getItem('logged');
    var users = JSON.parse(window.localStorage.getItem('users'));
    var user = users.find(x => x.email === loggedUser);
    if(user){
        Handlebars.registerHelper("getValue", function(val) {
            if(val === undefined) {
                return "null";
            }
            return val;
        });

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