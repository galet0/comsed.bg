document.addEventListener('DOMContentLoaded', function () {

    var loginBtn = document.querySelector('.login-button');
    console.log(loginBtn);

    // Login button clicked
    loginBtn.addEventListener('click', function (event) {
        event.preventDefault();
        initLogin();
    });

    function initLogin() {
        var main = document.querySelector('form'),
            email = main.querySelector('input[name="email"]'),
            password = main.querySelector('input[name="password"]'),
            error = document.querySelector('.error');
        if (email.value) {
            if (password.value) {
                if (user = UserModel.login(email.value, password.value)) {
                    //start session for logged user
                    sessionStorage.setItem('isLogged',true);
                    sessionStorage.setItem('logged', email.value);
                    window.location = "index.html";

                } else {
                    email.value = '';
                    password.value = '';
                    error.textContent = "Няма такъв потребител";
                    error.style.display = 'block';
                }
            } else {
                email.value = '';
                password.value = '';
                error.textContent = "Моля, въведете парола!";
                error.style.display = 'block';
            }
        } else {
            email.value = '';
            password.value = '';
            error.textContent = "Моля, въведете е-поща!";
            error.style.display = 'block';
        }
    }
});