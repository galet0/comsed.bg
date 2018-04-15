document.addEventListener('DOMContentLoaded', function () {

    var products = JSON.parse(window.localStorage.getItem('products'));
    var types = JSON.parse(window.localStorage.getItem('types'));

    var indexProducts = getTemplate('showProductList');
    var template = Handlebars.compile(indexProducts);
    var temp = template({products: products});
    document.querySelector('tbody').innerHTML = temp;

    var main = document.querySelector('main');


});