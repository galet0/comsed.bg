var something = (function(){
    function checkLogged(page){
    var loggedUser = sessionStorage.getItem('logged');
    if(loggedUser){
     var users = JSON.parse(window.localStorage.getItem('users')),
     user = users.find(x => x.email === loggedUser);
     if(user){
         var userNav = AppController.getControllerTemplate(page,'indexProfile');
         var template = Handlebars.compile(userNav);
         var temp = template(user);
         document.querySelector('.headderAuth').innerHTML = temp;    
     }
     
     var count = document.querySelector('.prodCart');
     cart = JSON.parse(window.localStorage.getItem('cart'));
     if(cart !== null){
        if(count){
            count.textContent = '(' + cart.length + ')';
        }
    }

     document.querySelector('.accountBtn').addEventListener('click',function(event){
         event.preventDefault();
         AppController.gotoPage('user-page.html');
     });  
     
     basketBtn = document.querySelector('.basket');
     Array.from(document.querySelectorAll('div.dropdown-content a')).forEach(function(link){
         link.addEventListener('click',function(evenet){
             event.preventDefault();
             something.getCheckTemplate(link)
         });
     });
     
     var basketBtn = document.querySelector('.basket');
     if(basketBtn){
        basketBtn.addEventListener('click',function(event){
            event.preventDefault();
            AppController.gotoPage('shopping-cart.html');
        });
     }

     return loggedUser; 
    }else{
        var userNav = AppController.getControllerTemplate(page,'indexProfile1');
        var template = Handlebars.compile(userNav);
        var temp = template(user);
        document.querySelector('.headderAuth').innerHTML = temp; 

        document.querySelector('.auth').addEventListener('click',function(event){
            event.preventDefault();
            AppController.gotoPage('auth.html');
        })
        var basketBtn = document.querySelector('.basket');
        if  (basketBtn){
            basketBtn.addEventListener('click',function(event){
                event.preventDefault();
                AppController.gotoPage('shopping-cart.html');
            });
        }
        var count = document.querySelector('.prodCart');
     cart = JSON.parse(window.localStorage.getItem('cart'));
     if(cart !== null){
         if(count){
             count.textContent = '(' + cart.length + ')';
         }
     }

    }
}
    function getCheckTemplate(link){
        var loggedUser = sessionStorage.getItem('logged');
        if(loggedUser){
            var users = JSON.parse(window.localStorage.getItem('users')),
            user = users.find(x => x.email === loggedUser);
            if(user){        
                AppController.setControllerTemplates('user-page', container.querySelectorAll('script[type="text/x-handlebars-template"]'));
                var targetTemplate = AppController.getControllerTemplate('user-page', link.className),
                template = Handlebars.complile(targetTemplate),
                temp = template(user);
        
                document.querySelector('.clm-right').innerHTML = temp; 
            }
        }
           
    }
  

    

    return {
        checkLogged : checkLogged,
        getCheckTemplate : getCheckTemplate
    }


 })();
