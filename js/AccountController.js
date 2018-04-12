
document.addEventListener('DOMContentLoaded', function () {
    var loggedUser = sessionStorage.getItem('logged');
    var users = JSON.parse(window.localStorage.getItem('users'));
    var user = users.find(x => x.email === loggedUser);

    var indexProfile = getTemplate('indexProfile');
    var template = Handlebars.compile(indexProfile);
    var temp = template(user);
    document.querySelector('.reg-cart').innerHTML = temp;



});