document.addEventListener('DOMContentLoaded', function () {

    function showCategories() {
        var categories = CategoryModule.getAllCategories();
        console.log(categories);
        var types = TypeModule.getAllTypes();
        console.log(types);
        var categoriesTmpl = getTemplate('showCategoriesList');
        if(categoriesTmpl){
            main.innerHTML = categoriesTmpl;
        }
    }

    document.querySelector('.btn-add').addEventListener('click', function (event) {
        event.preventDefault();

        var addCategoryTmpl = getTemplate('addCategory');
        if(addCategoryTmpl){
            main.innerHTML = addCategoryTmpl;
        }

        document.querySelector('.btn-save').addEventListener('click', function () {
            var form = document.querySelector('form'),
                parentName = form.querySelector('input[name="parent"]').value,
                categoryName = form.querySelector('input[name="categoryName"]').value,
                description = form.querySelector('textarea[name="description"]').value;
            if(parentName){//if it has category name
                var category = CategoryModule.findByCategoryName(parentName);
                TypeModule.addType(categoryName, description, category.id);
            } else {
                CategoryModule.addCategory(categoryName, description);
            }

            showCategories();
        })
    });

    document.querySelector('.btn-edit').addEventListener('click',function (event) {
        event.preventDefault();

    });

    var main = document.querySelector('main');
    showCategories();

});