var UserModel = (function(){

    var nextID = 1;
    function User(firstName, lastName, email, phone, address, town, postCode, county, password, isAdmin){
        this.userID = nextID++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.town = town;
        this.postCode = postCode || 0;
        this.county = county;
        this.password = password;
        this.isAdmin = isAdmin || false;
        this.cart = [];
        this.orders = [];
        this.favourites = [];
    }    
    
    var users = JSON.parse(window.localStorage.getItem('users')) || [];

    var UserStorage = {
        register: function(firstName, lastName, email, phone, address, town, postCode,county, password,isAdmin) {
            var user;
            if(users.length){
                user = new User(firstName, lastName, email, phone, address, town, postCode,county, password,isAdmin);
            }else{
                user = new User(firstName, lastName, email, phone, address, town, postCode,county, password,true);
            }
            users.push(user);
            window.localStorage.setItem('users', JSON.stringify(users));
            return user;
        },
        getUser : function(email){
            return users.find(user => user.email === email);
        },
        login: function(email, password) {
            return users.find(function(user) {
                return user.email === email && user.password === password;
            });
        },
        hasUser: function(email) {
            return !!users.find(function(user) {
                return user.email === email;
            });
        }
    };
    return {
        register: function(firstName, lastName, email, phone, address, town, postCode, county, password) {
            if (!UserStorage.hasUser(email)) {
                return UserStorage.register(firstName, lastName, email, phone, address, town, postCode,county, password);
            }
        },
        login: UserStorage.login,
        getUser : UserStorage.getUser
    };
})();