document.addEventListener('DOMContentLoaded', function () {
    //var categories = JSON.parse(window.localStorage.getItem('categories'));
    var types = JSON.parse(window.localStorage.getItem('types'));
    //console.log(categories);
    var indexCategory = getTemplate('showCategoriesList');
    console.log(indexCategory);
    var template = Handlebars.compile(indexCategory);
    console.log(template);
    var temp = template({types: types});
    console.log(temp);
    document.querySelector('tbody').innerHTML = temp;
});