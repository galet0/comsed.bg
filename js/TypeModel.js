//Подкатегории
var TypeModule = (function () {

    var types = JSON.parse(window.localStorage.getItem('types')) || [];

    function Type(name, description, categoryID) {
        this.id = Type.prototype.typeID++;
        this.categoryID = categoryID;
        this.name = name;
        this.description = description;
        this.products = [];
    }

    Type.prototype.typeID = 1;

    return{
        findByTypeName: function (name) {
            return types.findIndex(function (type) {
                return type.name === name;
            });
        },

        findByTypeID: function (typeID) {
            return types.find(function (type) {
                return type.id === typeID;
            })
        },

        addType: function (categoryID, name, description) {
            var typeIndex = this.findByTypeName(name);
            if(typeIndex === -1){
                var type = new Type(name, description);
                types.push(type);
                window.localStorage.setItem('types', JSON.stringify(types));
                var category = CategoryModule.findByCategoryID(categoryID);
                category.types.push(type);
                return type.id;
            } else {
                console.log('Вече съществува такава подкатегория!');
            }
        },

        deleteType: function (categoryID, typeID) {
            var typeIndex = this.findByTypeID(typeID);
            if(typeIndex !== -1){
                if(typeIndex.products.length === 0){
                    var category = CategoryModule.findByCategoryID(categoryID);
                    types.splice(typeIndex, 1);
                    category.types.splice(typeIndex, 1);
                } else {
                    console.log('В тази подкатегория има продукти! Не можете да я изтриете!');
                }
            } else {
                console.log('Няма такава подкатегория!');
            }
        },

        updateType: function (categoryID, typeID, name, description) {
            var typeIndex = this.findByTypeID(typeID);
            if(typeIndex !== -1){
                var type = types.slice(typeIndex, 1)[0];
                var category = CategoryModule.findByCategoryID(categoryID);
                var typeInCategory = category.types.slice(typeIndex, 1);
                if(name !== undefined && name !== null && name !== ''){
                    type.name = name;
                    typeInCategory.name = name;
                }
                if(description !== undefined && description !== null){
                    type.description = description;
                    typeInCategory.description = description;
                }
                types[typeIndex] = type;
                category.types[typeIndex] = type;
            } else {
                console.log('Няма такава подкатегория!');
            }
        }
    }
})();

var type1 = TypeModule.addType(1, 'type1', 'type1 description');
var type2 = TypeModule.addType(1, 'type2', 'type2 description');