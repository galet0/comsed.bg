(function () {
    function initPage() {
        //var main = document.querySelector('main');
        document.querySelector('.dashboard-btn').addEventListener('click', function (event) {
            event.preventDefault();

            window.location = 'admin-index.html';
        });

        document.querySelector('.category-btn').addEventListener('click', function (event) {
            event.preventDefault();

            window.location = 'show-categories-list.html';
        });

        document.querySelector('.product-btn').addEventListener('click', function (event) {
            event.preventDefault();

            window.location = 'show-product-list.html'
        });

        document.querySelector('.user-btn').addEventListener('click', function (event) {
            event.preventDefault();

            window.location = 'show-user-list.html'
        });

        document.querySelector('.sales-btn').addEventListener('click', function (event) {
            event.preventDefault();

            window.location = 'show-sales-list.html';
        });

        console.log(AppController.getController('AdminIndexController'));
    }

    AppController.registerController('AdminIndexController', {
        initPage: initPage
    })
})();
