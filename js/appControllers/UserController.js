(function(){
   var users = JSON.parse(window.localStorage.getItem('users'));

    function initPage(){        
        
        something.checkLogged('user-page');    
        var user = UserModel.getUser(sessionStorage.getItem('logged'));
            var getUserIndex = users.findIndex(us => us.email === user.email);
        
        isAdmin(user,getUserIndex);

        var allLinks = document.querySelectorAll('a');
        console.log(allLinks);
        switchBetweenTemplates();    
    }
    
    
    var loggedUser = sessionStorage.getItem('logged');
    console.log(loggedUser);
        //getUserIndex = users.findIndex(us => us.email === user.email);


    function switchBetweenTemplates(){
        var main = document.querySelector('main');
        var nav = main.querySelectorAll('a');
        Array.from(nav).forEach(function(link){
            link.addEventListener('click',function(event){
                event.preventDefault();
                var selectCurrent = document.querySelector('.current');
                selectCurrent.setAttribute('class', '');

                link.classList.add('current');
            })
        });
    }
   
    function isAdmin(user,getUserIndex){
        if(!user.isAdmin){
            var page = document.querySelector('.clm-right');
            //load on init account page 

            Handlebars.registerHelper("countyName", function(county){
                       counties = ['Благоевград','Бургас','Варна','Велико Търново','Видин','Габрово','Добрич','Кърджали','Кюстендил','Ловеч','Монтана','Пазарджик','Перник','Плевен','Пловдив','Разград','Русе','Силистра','Сливен','Смолян','Софийска','София - град','Стара Загора','Търговище','Хасково','Шумен','Ямбол'];
                    return counties[county - 1];
                })
         
             

            var accountTemplate = AppController.getControllerTemplate('user-page', 'info'),
                accTemplate = Handlebars.compile(accountTemplate),
                temp = accTemplate(user);
            page.innerHTML = temp;
            var active = document.getElementsByClassName('active')[0],
                infoPage = document.querySelector('.info-page'); 
            

            // **********************ACCOUNT INFO CLICKED**********************************
            infoPage.addEventListener('click', function(event){
                event.preventDefault();

                var user = UserModel.getUser(sessionStorage.getItem('logged'));
                var getUserIndex = users.findIndex(us => us.email === user.email);

                document.querySelector('.active').removeAttribute('class','active');
                document.getElementById('info-page').className = 'active';

                var accountTemplate = AppController.getControllerTemplate('user-page', 'info'),
                accTemplate = Handlebars.compile(accountTemplate),
                temp = accTemplate(user);
                page.innerHTML = temp;                    
            })

            //******************************EDIT ADDRESS *************************
            Array.from(document.querySelectorAll('.editAddress')).forEach(function(link){
                link.addEventListener('click',function(event){
                    event.preventDefault();

                    var user = UserModel.getUser(sessionStorage.getItem('logged'));
                    var getUserIndex = users.findIndex(us => us.email === user.email);    

                    
                    document.querySelector('.active').removeAttribute('class','active');
                    document.getElementById('edit-address').className = 'active';


                    var editAddressTemplate = AppController.getControllerTemplate('user-page','address'),
                        editAddress = Handlebars.compile(editAddressTemplate),
                        temp = editAddress(user);
                        page.innerHTML = temp;
                        window.history.replaceState({'user-page': 'user-page'}, 'Edit address', "/address.html" )

                    
                    document.querySelector('.save-btn').addEventListener('click',function(event){
                        event.preventDefault();
                        var form = document.querySelector('form'),
                        address = form.querySelector('input[name="address"]').value,
                        town = form.querySelector('input[name="town"]').value,
                        // postCode = form.querySelector('input[name="postCode"]').value,
                        county= form.querySelector('select').value,
                        error = document.querySelector('.error');
                    
                        if(validateAddressForm(address, town, error)){
                          
                            users[getUserIndex].address = address;
                            users[getUserIndex].county = county;
                            users[getUserIndex].town = town;
                            // users[getUserIndex].postCode = postCode;                            
                            error.textContent = 'Промените бяха успешно записани';
                            error.style.display = 'block';
                            error.style.color = 'red';
                            window.localStorage.setItem('users', JSON.stringify(users));
                            AppController.getController('user-page');
                        }
                    })
                })
            })

            //*****************************EDIT PROFILE******************************
            Array.from(document.querySelectorAll('.editLink')).forEach(function(link){
                link.addEventListener('click',function(event){
                    event.preventDefault();    

                    var user = UserModel.getUser(sessionStorage.getItem('logged'));
                    var getUserIndex = users.findIndex(us => us.email === user.email);
    
                    document.querySelector('.active').removeAttribute('class','active');         
                    document.getElementById('edit-page').className = 'active';
                    var editTemplate = AppController.getControllerTemplate('user-page', 'edit'),
                        editTmpl = Handlebars.compile(editTemplate),
                        temp = editTmpl(user);
                        
                    page.innerHTML = temp;
                    window.history.replaceState({'user-page' : 'user-page'}, 'Edit profile', "/edit.html" )
                    

                    document.querySelector('.save-btn').addEventListener('click',function(event){
                        event.preventDefault();
                        
                        var form = page.querySelector('form'),
                            firstName = form.querySelector('input[name="firstName"]').value,
                            lastName = form.querySelector('input[name="lastName"]').value,
                            phone = form.querySelector('input[name="phone"]').value,
                            password = form.querySelector('input[name="password"]').value,
                            newPassword = form.querySelector('input[name="newPassword"]').value,
                            passwordConfirmNew = form.querySelector('input[name="passwordConfirmNew"]').value;
                            error = document.querySelector('.error');
                            
                        if (validateInputs(firstName, lastName, phone, error)){
                            if (!password) {
                                if(newPassword || passwordConfirmNew){
                                    error.textContent = "Не може да смените паролата, без да въведете текущата";
                                    error.style.display = 'block';                
                                    error.style.color = 'red';
                                }else{
                                    users[getUserIndex].firstName = firstName;
                                    users[getUserIndex].lastName = lastName;
                                    users[getUserIndex].phone = phone;
                                    window.localStorage.setItem('users', JSON.stringify(users));
                                    error.textContent = "Промените бяха успешно записани";
                                    error.style.display = 'block';                
                                    error.style.color = 'red';
                                }
                            }else{
                                if(user.password === password){
                                    if(newPassword === passwordConfirmNew){
                                        users[getUserIndex].firstName = firstName;
                                        users[getUserIndex].lastName = lastName;
                                        users[getUserIndex].phone = phone;
                                        users[getUserIndex].password = newPassword;
                                        window.localStorage.setItem('users', JSON.stringify(users));
                                        error.style.textContent = 'Промените бяха успешно записани';
                                        error.style.display = 'block';
                                        error.style.color = 'red';
                                } else{
                                    passwordConfirmNew = '';
                                    newPassword = '';
                                    error.textContent = 'Нововъведените пароли не съвпадат';
                                    error.style.display = 'block';
                                    error.style.color = 'red';
                                }
                            }else{
                                password = '';
                                error.textContent = 'Текущата парола не съвпада с въведената';
                                error.style.display = 'block';
                                error.style.color = 'red';                            
                            }
                        }
                    }   
                    })
                }); 
              
                
            });


            //*****************************SEE ORDERS***************************
            document.querySelector('.ordersHistory').addEventListener('click',function(event){
                event.preventDefault();

                var user = UserModel.getUser(sessionStorage.getItem('logged'));
                var getUserIndex = users.findIndex(us => us.email === user.email);

                document.querySelector('.active').removeAttribute('class','active');
                document.getElementById('orders-history').className = 'active';

                var editAddressTemplate = AppController.getControllerTemplate('user-page','orders'),
                    editAddress = Handlebars.compile(editAddressTemplate),
                    temp = editAddress(user);
                    page.innerHTML = temp;

                    window.history.replaceState({'user-page': 'user-page'}, 'Orders History', "/orders.html" )
                    
                    
            });

             // *********************FAVOURITES*****************************
             document.querySelector('.favourites'). addEventListener('click', function(event){
                event.preventDefault();

                var user = UserModel.getUser(sessionStorage.getItem('logged'));
                var getUserIndex = users.findIndex(us => us.email === user.email);

                document.querySelector('.active').removeAttribute('class','active');
                document.getElementById('favourites-products').className = 'active';

                var accountTemplate = AppController.getControllerTemplate('user-page', 'favourites'),
                accTemplate = Handlebars.compile(accountTemplate),
                temp = accTemplate(user);
                page.innerHTML = temp;
                window.history.replaceState({'user-page' : 'user-page'}, 'Favourites', "/favourites.html" )
                    
            });

            


        }
    }
    function validateAddressForm(address, town, error){
        //only numbers
        var reg = /^\d+$/;
        if (!address){
            error.textContent = "Моля, въведете адрес";
            error.style.display = 'block';
            error.style.color = 'red';  
            return false;                          
        }
        if (!town){
            error.textContent = "Моля, въведете град";
            error.style.display = 'block';
            error.style.color = 'red';  
            return false;
        }
        // if(postCode){
        //     if(postCode.match(reg)){
        //         error.textContent = "Невалиден пощенски код, моля използвайте само цифри";
        //         error.style.display = 'block';
        //         error.style.color = 'red';  
        //         return false;
        //     }
        //     if(parseInt(postCode) >= 0000 && parseInt(postCode)<= 9999){
        //         error.textContent = "Невалиден пощенски код, моля въведете 4 само цифри ";
        //         error.style.display = 'block';
        //         error.style.color = 'red';  
        //         return false;
        //     }
        //     return true;    
        // }
        return true;
        
    }
    function validateInputs(firstName, lastName, phone, error){
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
        if (!phone.match(/^\d{10}$/)) {
            error.textContent = "Моля, въведете валиден телефонен номер";
            error.style.display = 'block';
            return false;
        }
        return true;
    }

    AppController.registerController('user-page',{
        initPage : initPage
    })
})();