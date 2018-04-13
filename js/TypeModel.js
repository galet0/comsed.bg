//Подкатегории
var TypeModule = (function () {

   /* sendRequest('/json/types.json')
    .then(function(response) {
        if(response.length){
            window.localStorage.setItem('types',JSON.stringify(response));
        }
        return response;
    });
*/

    var types = JSON.parse(window.localStorage.getItem('types')) || [];
    var typeID = 0;

    function Type(name, description, categoryID) {
        this.id = ++typeID;
        this.categoryID = categoryID;
        this.name = name;
        this.description = description;
        this.products = [];
    }



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

        getAllTypes: function () {
            return types.forEach(function (type) {
                return type.name;
            });
        },

        addType: function (name, description, categoryID) {
            var typeIndex = this.findByTypeName(name);
            if(typeIndex === -1){
                var category = CategoryModule.findByCategoryID(categoryID);
               
                var type = new Type(name, description, categoryID);
                types.push(type);
                if(category){
                    var getCategory = JSON.parse(window.localStorage.getItem('categories'));
                    var index = getCategory.findIndex(category => category.id === categoryID);
                    getCategory[index].types.push(type);
                    category.types.push(type);
                    window.localStorage.setItem('categories',JSON.stringify(getCategory));  
                }              
                window.localStorage.setItem('types', JSON.stringify(types));
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

        editType: function (categoryID, typeID, name, description) {
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
