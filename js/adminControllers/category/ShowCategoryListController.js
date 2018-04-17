(function () {
    var main = document.querySelector('main');

    function showAllCategoriesPage() {
        var categories = JSON.parse(window.localStorage.getItem('categories'));
        var types = JSON.parse(window.localStorage.getItem('types'));
        //console.log(categories);
        var indexCategory = AppController.getControllerTemplate('AdminCategoriesController', 'showCategoriesList');
        //console.log(indexCategory);
        var template = Handlebars.compile(indexCategory);
        //console.log(template);
        var temp = template({categories: categories}, {types: types});
        console.log(temp);
        document.querySelector('tbody').innerHTML = temp;

        getEditCategoryPage()
    }

    function getEditCategoryPage() {
        Array.from(document.querySelectorAll('.btn-edit-type')).forEach(function(btn){
            btn.addEventListener('click', function (event) {
                event.preventDefault();

                var typeInput ;//= document.querySelector('input[name="typeId"]');

                typeInput = btn.parentNode.parentNode.childNodes[1].children["0"].value;
                // console.log(typeInput);
                // console.log(typeInput.parentNode);
                // console.log(typeInput.parentNode.firstChild);
                // console.log(typeInput.parentNode.firstChild.nodeType);

                var typeID = parseInt(typeInput);
                var types = JSON.parse(window.localStorage.getItem('types')) || [];
                var type = types.find(type => type.id === typeID);

                var editCategoryTmpl = AppController.getControllerTemplate('ShowCategoryListController', 'editCategory');
                var template = Handlebars.compile(editCategoryTmpl);
                var temp = template(type);

                var categoryName = CategoryModule.findByCategoryID(type.categoryID).name;

                if (editCategoryTmpl) {
                    main.innerHTML = temp;
                    var inputCategory = main.querySelector('input[name="category"]');
                    inputCategory.value = categoryName;
                    inputCategory.disabled = true;

                    main.querySelector('.btn-save').addEventListener('click', function (event) {
                        event.preventDefault();
                        var newName = document.querySelector('input[name="type"]').value;
                        var newDescription = document.querySelector('textarea').value;
                        type.name = newName;
                        type.description = newDescription;

                        if(TypeModule.editType(type.categoryID, typeID, newName, newDescription)){
                            window.location = '../../html/admin/show-categories-list.html';
                        }
                        window.localStorage.setItem('types', JSON.stringify(types));
                    });

                }
            });
        });
    }

    function initPage() {
        showAllCategoriesPage();
    }

    AppController.registerController('editCategory', {
        initPage: initPage
    })
})();


