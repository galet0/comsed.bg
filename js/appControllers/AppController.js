var AppController = (function() {

    var tmpls = {},
        controllers = {};

    function getTemplate(tmplName) {
        if (!tmpls[tmplName]) {
            var tmpl = document.getElementById(tmplName + '_tmpl');
            if (tmpl) {
                tmpls[tmplName] = tmpl.innerHTML;
            }
        }
        return tmpls[tmplName];
    }

    // controllers
    function registerController(name, controller) {
        if (!controllers[name]) {
            controllers[name] = {
                controller: controller,
                templates: {}
            };
        } else {
            console.error(`Controller "${name}" already exists!`);
        }
    }

    function getController(name) {
        if (controllers[name]) {
            return controllers[name].controller;
        } else {
            console.error(`Controller "${name}" doesn't exists!`);
        }
    }

    function setControllerTemplates(name, list) {
        if (controllers[name]) {
            Array.from(list).forEach(function(item) {
                console.log('controller: ' + name, 'tmpl: ' + item.id.replace('_tmpl', ''));
                controllers[name].templates[item.id.replace('_tmpl', '')] = item.innerHTML;
            });
        } else {
            console.error(`Controller "${name}" doesn't exists!`);
        }
    }

    function getControllerTemplate(name, tmplName) {
        if (controllers[name]) {
            if (controllers[name].templates[tmplName]) {
                return controllers[name].templates[tmplName];
            } else {
                console.error(`Template "${tmplName}" doesn't exists for controller "${name}"!`);
            }
        } else {
            console.error(`Controller "${name}" doesn't exists!`);
        }
    }

    // pages
    function gotoPage(address) {
        var page = getUrlPage(address);
        if (page !== currentPage) {
           //showPage(page);
            sendRequest(address, onPageSuccess.bind(this, page), onPageError);
            history.pushState({ page: page }, page.slice(0, 1).toUpperCase() + page.slice(1), address);
        }
    }

    // function showPage(page, pageContent) {
    //     pageElement.classList.remove(currentPage);
    //     currentPage = page;
    //     pageElement.classList.add(currentPage);
    //     updateNavigations();
    //     mainElement.innerHTML = pageContent;
    //     // update the title
    //     document.head.getElementsByTagName('title')[0].textContent = page.slice(0, 1).toUpperCase() + page.slice(1);
    // }

    function showPage(page, pageContent){
        var controller = getController(page);
        if(controller){
            if(pageContent){
                mainElement.innerHTML = pageContent;
            }else{
               
                sendRequest(location.href, onPageSuccess.bind(this, getUrlPage(location.href)), onPageError);
               
            }
            controller.initPage();
        }else{
            pageElement.classList.remove(currentPage);
            currentPage = page;
            pageElement.classList.add(currentPage);
            mainElement.innerHTML = pageContent;
            // update the title
            document.head.getElementsByTagName('title')[0].textContent = page.slice(0, 1).toUpperCase() + page.slice(1);
        }        
        updateNavigations();
    }
    
    // utils
    function getUrlPage(address) {
        return address.split('/').pop().split('.')[0];
    }
    
    function getNumberPage(list) {
        var itemsPerPage = 12;
        var result = [];
        if (list.length) {
            var pages = Math.ceil(list.length / itemsPerPage);
            for (var i = 0; i < pages; i++) {
                result.push({
                    i : i + 1,
                    prod : list.slice(i * itemsPerPage, itemsPerPage * (i + 1))
                });       
            }
        }
        return result;
    }   

    // nav
    function updateNavigations() {
        Array.from(document.querySelectorAll('a')).forEach(function(link) {
            if (getUrlPage(link.href) === currentPage) {
                link.parentNode.classList.add('current');
            } else {
                link.parentNode.classList.remove('current');
            }
        });
    }

    function onPageSuccess(page, xhr) {
        console.log('onPageSuccess', page, xhr);
        var startIndex = xhr.responseText.indexOf('<body');
        startIndex = xhr.responseText.indexOf('>', startIndex) + 1;
        var endIndex = xhr.responseText.indexOf('</body>');
        var container = document.createElement('div');
        container.innerHTML = xhr.responseText.slice(startIndex, endIndex);
        setControllerTemplates(page, container.querySelectorAll('script[type="text/x-handlebars-template"]'));
        showPage(page, container.querySelector('main').innerHTML);
    }

    function onPageError(error) {
        console.log('onPageError', error.message);
    }

    function sendRequest(url, success, error) {
        var xhr;
        try {
            xhr = new XMLHttpRequest();
        } catch (err) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (err) {
                error(new Error('no ajax sorry'));
            }
        }
        if (xhr) {
            xhr.addEventListener('readystatechange', function(event) {
                if (xhr.readyState === 4) { 
                    if (xhr.status === 200) {
                        success(xhr);
                    } else {
                        error(new Error(xhr.status));
                    }
                }
            });
            xhr.open('GET', url, true);
            xhr.send(null);
        }
    }

    function navigatePages(){
        var nav = pageElement.querySelectorAll('header a');
        Array.from(nav).forEach(function (link) {
            link.addEventListener('click', function(event){
                console.log(link.href);
                AppController.gotoPage(link.href);
            })
        })
    }
 
    var pageElement = document.querySelector('.page');
    var mainElement = pageElement.querySelector('main');
    var currentPage = getUrlPage(location.href);
    var navigations = document.querySelectorAll('a');
    

    Array.from(document.querySelectorAll('a')).forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            gotoPage(this.href);
        });
    });

    window.addEventListener('popstate', function(event) {
        showPage(getUrlPage(location.href));
        sendRequest(location.href, onPageSuccess.bind(this, getUrlPage(location.href)), onPageError);
    });

    window.addEventListener('DOMContentLoaded', function() {
        console.log(getUrlPage(location.href));
        var page = getUrlPage(location.href),
            controller = getController(page);
        
        if (controller) {
            setControllerTemplates(page, document.querySelectorAll('script[type="text/x-handlebars-template"]'));
            controller.initPage();
        }
    });


    return {
        registerController: registerController,
        getController: getController,
        getControllerTemplate: getControllerTemplate,
        setControllerTemplates: setControllerTemplates,
        getTemplate: getTemplate,
        getUrlPage : getUrlPage,
        getNumberPage: getNumberPage,
        gotoPage : gotoPage,
        navigatePages : navigatePages
    };

})();