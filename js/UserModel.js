var UserModel = (function(){
    function User(firstName, lastName, email,password){
        this.userID = User.prototype.nextID++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    User.prototype.nextID = 1;

    var UserStorage = {
        register: function(firstName, lastName,email, password) {
            var user = new User(firstName,lastName, email, password);
            users.push(user);
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
    var users = [];

    users.push(new User('ivan', '123456'));

    return {
        register: function(email, password) {
            if (!UserStorage.hasUser(email)) {
                return UserStorage.register(firstName, lastName, email, password);
            }
        },
        login: UserStorage.login
    };
})();