document.addEventListener('DOMContentLoaded', function () {
   var main = document.querySelector('main');

    document.querySelector('.category-btn').addEventListener('click', function (event) {
        event.preventDefault();

        window.location = '../../html/admin/show-categories-list.html';
    })
});