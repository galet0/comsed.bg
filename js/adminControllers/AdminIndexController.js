(function () {
    function initPage() {
        //var main = document.querySelector('main');
        document.querySelector('.dashboard-btn').addEventListener('click', function (event) {
            event.preventDefault();

            window.location = '../../html/admin/admin-index.html';
        });

        document.querySelector('.category-btn').addEventListener('click', function (event) {
            event.preventDefault();

            window.location = '../../html/admin/show-categories-list.html';
        });

        document.querySelector('.product-btn').addEventListener('click', function (event) {
            event.preventDefault();

            window.location = '../../html/admin/show-product-list.html'
        });

        document.querySelector('.user-btn').addEventListener('click', function (event) {
            event.preventDefault();

            window.location = '../../html/admin/show-user-list.html'
        });

        document.querySelector('.sales-btn').addEventListener('click', function (event) {
            event.preventDefault();

            window.location = '../../html/admin/show-sales-list.html';
        });

       // console.log(AppController.getController('AdminIndexController'));
    }

    AppController.registerController('admin-index', {
        initPage: initPage
    })
})();
