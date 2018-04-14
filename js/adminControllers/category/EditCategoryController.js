document.addEventListener('DOMContentLoaded', function () {

    var main = document.querySelector('main');

    document.querySelector('.btn-edit').addEventListener('click', function (event) {
        event.preventDefault();
        var typeID = parseInt(document.querySelector('input[name="id"]').value);
        var type = TypeModule.findByTypeID(typeID);

        var editCategoryTmpl = getTemplate('editCategory');
        var template = Handlebars.compile(editCategoryTmpl);
        var temp = template({type : type});


        if(editCategoryTmpl){
            // var categoryName = document.querySelector('.category');
            // var typeName = document.querySelector('.type');
            // var description = document.querySelector('.description');
            var category = CategoryModule.findByCategoryID(type.categoryID);
            var form = document.querySelector('form'),
                categoryName = form.getElementById('.category').setItem('categoryName', category.name),
                typeName = form.getElementById('.type').setItem('typeName', type.name),
                description = form.getElementById('.description').setItem('description', type.description);
            TypeModule.editType(categoryName, typeName, description);
            main.innerHTML = temp;
        }
    })
});