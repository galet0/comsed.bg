document.addEventListener('DOMContentLoaded', function () {
    var main = document.querySelector('main');

    document.querySelector('.btn-add').addEventListener('click', function (event) {
        event.preventDefault();

        var addCategoryTmpl = getTemplate('addCategory');
        if(addCategoryTmpl){
            main.innerHTML = addCategoryTmpl;
        }

        document.querySelector('.btn-save').addEventListener('click', function () {
            var form = document.querySelector('form'),
                categoryName = form.querySelector('input[name="categoryName"]').value,
                typeName = form.querySelector('input[name="typeName"]').value,
                description = form.querySelector('textarea[name="description"]').value;
            if(categoryName) {//if it has category name
                var category = CategoryModule.findByCategoryName(categoryName);
                //да помислякъде трябва да стои проверката има ли категория с такова име или не-в модела или в контролера
            } else {
                CategoryModule.addCategory(typeName, description);
            }

            window.location = '../../html/admin/show-categories-list.html';
        })
    });

});