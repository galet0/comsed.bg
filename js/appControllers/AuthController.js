(function(){

    var loginBtn = document.querySelector('.login-button');
    var registerBrn = document.querySelector('.register-link');
    //console.log(loginBtn);
  
    
  
    links = document.querySelectorAll('footer a, header a');
    
    Array.from(links).forEach(function(link){
        link.addEventListener('click', function(event){
            event.preventDefault();
            AppController.navigatePages(link.href);
        });
        
    })

    if(loginBtn){
        loginBtn.addEventListener('click', function(event){
            event.preventDefault();
        })
    }
    function initPage(){
        
          something.checkLogged('auth');
          loginBtn = document.querySelector('.login-button');
          loginBtn.addEventListener('click',initLogin);
          registerBrn = document.querySelector('.register-link');
          registerBrn.addEventListener('click',initRegister);

          // Login button clicked
          var main = document.querySelector('form'),
          email = main.querySelector('input[name="email"]'),
          password = main.querySelector('input[name="password"]'),
          error = document.querySelector('.error');

          if(loginBtn){
              loginBtn.addEventListener('click',function(event){
                  event.preventDefault();
                  initLogin();
              })
          }
    }
    
    // function login(){
    
    
    // document.querySelector('form').addEventListener('focus',function(event){
    //     event.preventDefault();
    //     AppController.getControler('auth');
    // })
    
    
    function initLogin() {
                    //event.preventDefault();
                    var main = document.querySelector('form'),
                    email = main.querySelector('input[name="email"]'),
                    password = main.querySelector('input[name="password"]'),
                    error = document.querySelector('.error');
                    if (email.value) {
                        if (password.value) {
                            if (user = UserModel.login(email.value, password.value)) {
                                //start session for logged user
                                //  ------- user.isAdmin  ---------
                                if(user.isAdmin){
                                    AppController.gotoPage('admin-index.html');
                                }
                                window.sessionStorage.setItem('isLogged',true);
                                window.sessionStorage.setItem('logged', email.value);
                                AppController.gotoPage('user-page.html');
                                            
                            } else {
                                email.value = '';
                                password.value = '';
                                error.textContent = "Няма такъв потребител";
                                error.style.display = 'block';
                                error.style.color = 'red';
                            }
                        } else {
                            email.value = '';
                            password.value = '';
                            error.textContent = "Моля, въведете парола!";
                            error.style.display = 'block';                
                            error.style.color = 'red';
                        }
                    } else {
                        email.value = '';
                        password.value = '';
                        error.textContent = "Моля, въведете е-поща!";
                        error.style.display = 'block';            
                        error.style.color = 'red';
                    }   


    }


    //********************REGISTER********************

    //    Register button clicked  
        function initRegister(event){
            event.preventDefault();
            
            AppController.gotoPage('register.html');
        }
  
    AppController.registerController('auth', {
        initPage : initPage
    });

})();
