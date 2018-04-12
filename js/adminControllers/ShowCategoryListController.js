document.addEventListener('DOMContentLoaded', function () {
    // var categories = JSON.parse(window.localStorage.getItem('categories'));
    // console.log(categories);
    // var indexCategories = getTemplate('showCategoriesList');
    // console.log(indexCategories);
    // var template = Handlebars.compile(indexCategories);
    // console.log(template);
    // var tmpl = template(categories);
    // console.log(tmpl);
    // document.querySelector('.table').innerHTML = tmpl;
    var categories = JSON.parse(window.localStorage.getItem('categories'));
    var indexCategory = getTemplate('showCategoriesList');
    console.log(indexCategory);
    var template = Handlebars.compile(indexCategory);
    console.log(template);
    var temp = template(categories);
    console.log(temp);
    document.querySelector('.tbody').innerHTML = temp;
});