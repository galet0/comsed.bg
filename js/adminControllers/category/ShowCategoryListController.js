(function () {
    var main = document.querySelector('main');

    function showAddCategoryPage(){
        main.querySelector('.btn-add').addEventListener('click', function (event) {
            event.preventDefault();

            var addCategoryTmpl = AppController.getControllerTemplate('show-categories-list', 'addCategory');
            if(addCategoryTmpl){
                main.innerHTML = addCategoryTmpl;
            }

            saveCategoryOnBtnClick();
        });
    }

    function saveCategoryOnBtnClick() {
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

            window.location = '../html/admin/show-categories-list.html';
        })
    }

    function showAllCategoriesPage() {
        var categories = JSON.parse(window.localStorage.getItem('categories'));
        var types = JSON.parse(window.localStorage.getItem('types'));
        //console.log(categories);
        var indexCategory = AppController.getControllerTemplate('show-categories-list', 'showCategoriesList');
        //console.log(indexCategory);
        var template = Handlebars.compile(indexCategory);
        //console.log(template);
        var temp = template({categories: categories}, {types: types});
        console.log(temp);
        document.querySelector('tbody').innerHTML = temp;

        getEditCategoryPage()
    }

    function getEditCategoryPage() {
        Array.from(document.querySelectorAll('.btn-edit-typeID')).forEach(function(btn){
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

                var editCategoryTmpl = AppController.getControllerTemplate('show-categories-list', 'editCategory');
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
                        var newName = document.querySelector('input[name="typeID"]').value;
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
        showAddCategoryPage();
        showAllCategoriesPage();
    }

    AppController.registerController('show-categories-list', {
        initPage: initPage
    })
})();


