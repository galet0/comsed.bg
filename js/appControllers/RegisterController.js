(function(){

    links = document.querySelectorAll('footer a, header a');
    
    Array.from(links).forEach(function(link){
        link.addEventListener('click', function(event){
            event.preventDefault();
            AppController.navigatePages(link.href);
        });
        
    })
   function initRegister(event){
        event.preventDefault();
        var form = document.querySelector('form'),
            firstName = form.querySelector('input[name="firstName"]').value,
            lastName = form.querySelector('input[name="lastName"]').value,
            email = form.querySelector('input[name="email"]').value,
            phone = form.querySelector('input[name="phone"]').value,
            addressForm = form.querySelector('input[name="address"]').value,
            town = form.querySelector('input[name="town"]').value,
            postCode = form.querySelector('input[name="town"]').value,
            county = form.querySelector('select').value,
            password = form.querySelector('input[name="password"]'),
            passwordConfirm = form.querySelector('input[name="passwordConfirm"]'),
            error = document.querySelector('.error');


            
        if (validateForm(firstName, lastName, email, phone, addressForm, town, county, password,passwordConfirm, error)) {
            if (password.value.length > 5) {
                if (password.value === passwordConfirm.value) {
                    if (user = UserModel.register(firstName, lastName, email, phone, addressForm, town, postCode, county, password.value)) {
                            error.textContent =' Вие се регистрирахте успешно!';
                            window.sessionStorage.setItem('isLogged',true);
                            window.sessionStorage.setItem('logged', email);
                            document.body.scrollTop = document.body.scrollTop = 0;
                            AppController.gotoPage('index.html');
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
                        error.style.color = 'red';
                    }
                } else {
                    password.value = '';
                    passwordConfirm.value = '';
                    error.textContent = "Паролите не съвпадат";
                    error.style.display = 'block';                    
                    error.style.color = 'red';
                }
            } else {
                password = '';
                passwordConfirm = '';
                error.textContent = "Паролaта е твърде кратка.";
                error.style.display = 'block';
            }
        }
    }   

        // Form validation
        function validateForm(firstName, lastName, email, phone, addressForm, town, county, password,passwordConfirm, error) {
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!firstName) {
                error.textContent = "Моля, въведете име";
                error.style.display = 'block';
                error.style.color = 'red';
                return false;
            }
            if (!lastName) {
                error.textContent = "Моля, въведете фамилия";
                error.style.display = 'block';                
                error.style.color = 'red';
                return false;
            }
            if (!re.test(email)) {
                error.textContent = "Моля, въведете валиден адрес на е-поща.";
                error.style.display = 'block';                
                error.style.color = 'red';
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
                error.style.color = 'red';
                return false;
            }
            if (!password.value) {
                error.textContent = "Моля, въведете парола";
                error.style.display = 'block';                
                error.style.color = 'red';
                return false;
            }
            return true;
        }
       
    function initPage(){
        something.checkLogged('register');
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
            
            document.querySelector('.register-btn').addEventListener('click',initRegister);
            document.querySelector('form').addEventListener('submit',function(event){
                event.preventDefault();
                var loggedUser = sessionStorage.getItem('logged'),
                    users = JSON.parse(window.localStorage.getItem('users'));
                    user = users.find(x => x.email === loggedUser);
                if(user){
                   AppController.gotoPage('index.html');
                }else{
                    initRegister(event);
                }
                
            })
        //AppController.getController('register');
    }
    //AppController.navigatePages();
    AppController.registerController('register',{
        initPage: initPage
    });
})();