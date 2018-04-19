(function () {
    var main = document.querySelector('main');
    function initPage() {
        showAllUsersPage();
    }

    function showAllUsersPage() {
        var users = JSON.parse(window.localStorage.getItem('users')),
            indexUsers = AppController.getControllerTemplate('show-user-list', 'showAllUsers'),
            template = Handlebars.compile(indexUsers),
            temp = template({users: users});
        document.querySelector('tbody').innerHTML = temp;
    }

    AppController.registerController('show-user-list', {
        initPage: initPage
    })
})();