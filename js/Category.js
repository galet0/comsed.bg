var CategoryModule = (function () {
    var categories = {};

    function Category(name) {
        this.id = Category.prototype.categoryID++;
        this.name = name;
    }

    Category.prototype.categoryID = 1;

    return{
        createCategory: function (name) {
            var category = new Category(name);
            categories[category.id ] = category;
            return category.id;
        }
    }
})();