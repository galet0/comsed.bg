document.addEventListener('DOMContentLoaded', function () {
    var main = document.querySelector('main');

    function showCategories() {

    }

    document.querySelector('#addBtn').addEventListener('click', function (event) {
        event.preventDefault();

        var addCategoryTmpl = getTemplate('addCategory');
        if(addCategoryTmpl){
            main.innerHTML = addCategoryTmpl;
        }



        document.querySelector('#saveBtn').addEventListener('click', function () {
            var form = document.querySelector('form'),
                parentName = form.querySelector('input[name="parent"]').value,
                categoryName = form.querySelector('input[name="categoryName"]').value,
                description = form.querySelector('textarea[name="description"]').value;
            if(parentName){//if it has category name
                var category = CategoryModule.findByCategoryName(parentName);
                TypeModule.addType(category.id, categoryName, description);
            } else {
                CategoryModule.addCategory(categoryName, description);
            }

            showCategories();
        })
    });


    document.querySelector('#editBtn').addEventListener('click',function (event) {
        event.preventDefault();

    })

});