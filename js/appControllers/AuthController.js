document.addEventListener('DOMContentLoaded', function () {


    // Register button clicked
    document.querySelector('.register-btn').addEventListener('click', function (event) {
        event.preventDefault();
        var form = document.querySelector('form'),
            firstName = form.querySelector('input[name="firstName"]').value,
            lastName = form.querySelector('input[name="lastName"]').value,
            email = form.querySelector('input[name="email"]').value,
            phone = form.querySelector('input[name="phone"]').value,
            addressForm = form.querySelector('input[name="address"]').value,
            town = form.querySelector('input[name="town"]').value,
            county = form.querySelector('select').value,
            password = form.querySelector('input[name="password"]'),
            passwordConfirm = form.querySelector('input[name="passwordConfirm"]'),
            error = document.querySelector('.error');

        if (validateForm()) {
            if (password.value.length > 5) {
                if (password.value === passwordConfirm.value) {
                    if (user = UserModel.register(firstName, lastName, email, phone, addressForm, town, county, password.value)) {
                        
                    } else {
                        firstName = '';
                        lastName = '';
                        password.value = '';
                        email = '';
                        addressForm = '';
                        town = '';
                        phone = '';
                        passwordConfirm.value = '';
                        error.textContent = 'Има такъв регистриран потребител';
                        error.style.display = 'block';
                    }
                } else {
                    password.value = '';
                    passwordConfirm.value = '';
                    error.textContent = "Паролите не съвпадат";
                    error.style.display = 'block';
                }
            } else {
                password = '';
                passwordConfirm = '';
                error.textContent = "Паролaта е твърде кратка.";
                error.style.display = 'block';
            }
        }

        // Form validation
        function validateForm() {
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!firstName) {
                error.textContent = "Моля, въведете име";
                error.style.display = 'block';
                return false;
            }
            if (!lastName) {
                error.textContent = "Моля, въведете фамилия";
                error.style.display = 'block';
                return false;
            }
            if (!re.test(email)) {
                error.textContent = "Моля, въведете валиден адрес на е-поща.";
                error.style.display = 'block';
                return false;
            }
            if (!phone.match(/^\d{10}$/)) {
                error.textContent = "Моля, въведете валиден телефонен номер";
                error.style.display = 'block';
                return false;
            }
            if (!addressForm) {
                error.textContent = "Моля, въведете адрес";
                error.style.display = 'block';
                return false;
            }
            if (!town) {
                error.textContent = "Моля, въведете населено място";
                error.style.display = 'block';
                return false;
            }
            if (!county) {
                error.textContent = "Моля, изберете област";
                error.style.display = 'block';
                return false;
            }
            if (!password.value) {
                error.textContent = "Моля, въведете парола";
                error.style.display = 'block';
                return false;
            }
            return true;
        }
    });
});
