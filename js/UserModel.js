var UserModel = (function(){

    function User(firstName, lastName, email, phone, address, town, county, password){
        this.userID = User.prototype.nextID++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.town = town;
        this.county = county;
        this.password = password;
    }

    User.prototype.nextID = 1;

    var users = JSON.parse(window.localStorage.getItem('users')) || [];

    var UserStorage = {
        register: function(firstName, lastName, email, phone, address, town, county, password) {
            var user = new User(firstName, lastName, email, phone, address, town, county, password);
            users.push(user);
            window.localStorage.setItem('users', JSON.stringify(users));
            return user;
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
        register: function(firstName, lastName, email, phone, address, town, county, password) {
            if (!UserStorage.hasUser(email)) {
                return UserStorage.register(firstName, lastName, email, phone, address, town, county,  password);
            }
        },
        login: UserStorage.login
    };
})();