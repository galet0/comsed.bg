document.addEventListener('DOMContentLoaded', function () {
    
    var loginBtn = document.querySelector('.login-button');
    console.log(loginBtn);
    
    // Login button clicked
    loginBtn.addEventListener('click', function (event) {
        event.preventDefault();

        var main = document.querySelector('.login'),
            email = main.querySelector('input[name="email"]'),
            password = main.querySelector('input[name="password"]'),
            error = document.querySelector('.error');

        if (email.value) {
            if (password.value) {
                if (user = UserModel.login(email.value, password.value)) {
                     gotoPage('/html/register.html');
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
    });

});