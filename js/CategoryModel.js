var CategoryModule = (function () {

    /*sendRequest('/json/categories.json')
    .then(function(response) {
        if(response.length){
            window.localStorage.setItem('categories',JSON.stringify(response));
        }
        return response;
    });
*/  //updateCategories();
    var types = JSON.parse(window.localStorage.getItem('types')) || [];
    var categories = JSON.parse(window.localStorage.getItem('categories')) || [];
    var categoryID = 0;

    function Category(name, description) {
        this.id = ++categoryID;
        this.name = name;
        this.description = description;
        this.types = [];
    }

    return{
        findByCategoryName: function (name) {
            return categories.find(function (category) {
                return category.name === name;
            });
        },

        findByCategoryID: function (categoryID) {
            return categories.find(function (category) {
                return category.id === categoryID;
            });
        },

        getAllCategories: function () {
            return categories.forEach(function (category) {
                return category.name;
            });
        },

        addCategory: function (name, description) {
            var category = this.findByCategoryName(name);
            if(!category){
                var newCategory = new Category(name, description);
                categories.push(newCategory);
                window.localStorage.setItem('categories', JSON.stringify(categories));
                return newCategory.id;
            } else {
                console.log('Вече има такава категория!');
            }

        },
        deleteCategory: function (categoryID) {
            var category = this.findByCategoryID(categoryID);
            if(category !== -1){
                if(category.types.length === 0){
                    categories.splice(category, 1);
                } else {
                    console.log('В тази категория има подкатегории! Не можете да я изтриете!');
                }
            } else {
                console.log('Не съществува такава категория!');
            }
        },

        editCategory: function (categoryID, name, description) {
            var category = this.findByCategoryID(categoryID);
            if(category !== -1){
                var category = categories.slice(category, 1)[0];
                if(name !== undefined && name !== null && name !== ''){
                    category.name = name;
                }
                if(description !== undefined && description !== null){
                    category.description = description;
                }
                categories.push(category);
            } else {
                console.log('Не съществува такава категория!');
            }
        }
    }
})();



