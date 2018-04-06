var pageElement = document.querySelector('.container'),
    register = pageElement.querySelector('.register'),
    registerBtn = register.querySelector('.register-btn');


    function initRegister(){

        var form = document.querySelector('.register-form'),
            firstName = form.querySelector('input [name="firstName"]'),
            lastName = form.querySelector('input [name="lastName"]'),
            email = form.querySelector('input [name="email"]'),
            password = form.querySelector('input[name="password"]');
            passwordConfirm = form.querySelector('input [name="passwordConfirm"]'),
            error = form.querySelector('.error');

            form.addEventListener('submit', function(event){
                console.log(event);
                event.preventDefault();
                if(password.value === passwordConfirm.value){
                    if(password.value.length > 5){
                        if(user = UserModel.register(email.value,password.value)){
                            console.log('register confirm')
                        }else{
                            firstName.value = '';
                            password.value = '';
                            passwordConfirm.value = '';
                            error.textContent = 'That user already exists!';
                            error.style.display = 'block';
                        }
                    }else{
                        password.value = '';
                        passwordAgain.value = '';
                        error.textContent = 'Password is too short!';
                        error.style.display = 'block';
                    }
                }else{
                    password.value = '';
                    passwordAgain.value = '';
                    error.textContent = 'Passwords do not match!';
                    error.style.display = 'block';
                }
            });
    }

    registerBtn.addEventListener('click', function(event){
        event.preventDefault();
        console.log(event);
        initRegister();
    });