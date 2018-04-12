document.addEventListener('DOMContentLoaded', function () {

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

            window.location = "../../html/admin/show-categories-list.html";
        })
    });

    var main = document.querySelector('main');

});