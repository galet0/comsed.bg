// var tmpls = {};
// var pages = JSON.parse(window.localStorage.getItem('pages')) || [];
// var pageObj = {};
// function getTemplate(tmplName) {
//     if (!tmpls[tmplName]) {
//         var tmpl = document.getElementById(tmplName + '_tmpl');
//         if (tmpl) {
//             tmpls[tmplName] = tmpl.innerHTML;
//         }
//     }
//     return tmpls[tmplName];
// }
//
// function gotoPage(address) {
//     var page = getUrlPage(address);
//     if (pages.findIndex(x => x.page === page) === -1) {
//         pageObj.page = page;
//     }
//     if (page !== currentPage) {
//         //showPage(page);
//         sendRequest(address, onPageSuccess.bind(this, page), onPageError);
//         history.pushState({ page: page }, page.slice(0, 1).toUpperCase() + page.slice(1), address);
//     }
// }
//
// function showPage(page) {
//     pageElement.classList.remove(currentPage);
//     currentPage = page;
//     pageElement.classList.add(currentPage);
//     updateNavigations();
//     //var template = Handlebars.compile(getTemplate(page));
//     //mainElement.innerHTML = template({});
//     mainElement.innerHTML = pageObj.content;
//     // update the title
//     document.head.getElementsByTagName('title')[0].textContent = page.slice(0, 1).toUpperCase() + page.slice(1);
// }
//
// function getUrlPage(address) {
//     return address.split('/').pop().split('.')[0];
// }
//
// function updateNavigations() {
//     Array.from(document.querySelectorAll('a')).forEach(function (link) {
//         if (getUrlPage(link.href) === currentPage) {
//             link.parentNode.classList.add('current');
//         } else {
//             link.parentNode.classList.remove('current');
//         }
//     });
// }
//
// function onPageSuccess(page, xhr) {
//     console.log('onPageSuccess', page, xhr);
//     var startIndex = xhr.responseText.indexOf('<body');
//     startIndex = xhr.responseText.indexOf('>', startIndex) + 1;
//     var endIndex = xhr.responseText.indexOf('</body>');
//     var container = document.createElement('div');
//     container.innerHTML = xhr.responseText.slice(startIndex, endIndex);
//
//     pageObj.page = page;
//     pageObj.content = container.querySelector('main').innerHTML;
//     if (pages.indexOf(pageObj.page) !== -1) {
//         pages.push(pageObj);
//     }
//     window.localStorage.setItem('pages', JSON.stringify(pages));
//     console.log(container.querySelectorAll('script[type="text/x-handlebars-template"]'));
//     showPage(page);
// }
//
// function onPageError(error) {
//     console.log('onPageError', error.message);
// }
//
// function sendRequest(url, success, error) {
//     var xhr;
//     try {
//         xhr = new XMLHttpRequest();
//     } catch (err) {
//         try {
//             xhr = new ActiveXObject("Microsoft.XMLHTTP");
//         } catch (err) {
//             error(new Error('no ajax sorry'));
//         }
//     }
//     if (xhr) {
//         xhr.addEventListener('readystatechange', function (event) {
//             if (xhr.readyState === 4) {
//                 if (xhr.status === 200) {
//                     success(xhr);
//                 } else {
//                     error(new Error(xhr.status));
//                 }
//             }
//         });
//         xhr.open('GET', url, true);
//         xhr.send(null);
//     }
// }
//
// var pageElement = document.querySelector('.page'),
//     mainElement = pageElement.querySelector('main'),
//     currentPage = getUrlPage(location.href),
//     navigations = document.querySelectorAll('a');
//
// Array.from(document.querySelectorAll('a')).forEach(function (link) {
//     link.addEventListener('click', function (event) {
//         event.preventDefault();
//         gotoPage(this.href);
//     });
// });
//
// window.addEventListener('popstate', function (event) {
//     //showPage(getUrlPage(location.href));
//     sendRequest(location.href, onPageSuccess.bind(this, getUrlPage(location.href)), onPageError);
// });

    var tmpls = {};

    function getTemplate(tmplName) {
        if (!tmpls[tmplName]) {
            var tmpl = document.getElementById(tmplName + '_tmpl');
            if (tmpl) {
                tmpls[tmplName] = tmpl.innerHTML;
            }
        }
        return tmpls[tmplName];
    }

    function gotoPage(address) {
        var page = getUrlPage(address);
        if (page !== currentPage) {
            //showPage(page);
            sendRequest(address, onPageSuccess.bind(this, page), onPageError);
            history.pushState({ page: page }, page.slice(0, 1).toUpperCase() + page.slice(1), address);
        }
    }

    function showPage(page, pageContent) {
        pageElement.classList.remove(currentPage);
        currentPage = page;
        pageElement.classList.add(currentPage);
        updateNavigations();
        //var template = Handlebars.compile(getTemplate(page));
        //mainElement.innerHTML = template({});
        mainElement.innerHTML = pageContent;
        // update the title
        document.head.getElementsByTagName('title')[0].textContent = page.slice(0, 1).toUpperCase() + page.slice(1);
    }

    function getUrlPage(address) {
        return address.split('/').pop().split('.')[0];
    }

    function updateNavigations() {
        Array.from(document.querySelectorAll('nav a')).forEach(function(link) {
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
        console.log(container.querySelectorAll('script[type="text/x-handlebars-template"]'));
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

    var pageElement = document.querySelector('.page');
        console.log(pageElement);
        var mainElement = pageElement.querySelector('main');
        console.log(mainElement);
        var currentPage = getUrlPage(location.href);
console.log(currentPage);
        var navigations = document.querySelectorAll('a');
console.log(navigations);

    Array.from(document.querySelectorAll('a')).forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            gotoPage(this.href);
        });
    });
    window.addEventListener('popstate', function(event) {
        //showPage(getUrlPage(location.href));
        sendRequest(location.href, onPageSuccess.bind(this, getUrlPage(location.href)), onPageError);
    });

    //JSON 
    // function sendRequest(url) {
    //     return new Promise(function(resolve, reject) {
    //         var xhr;
    //         try {
    //             xhr = new XMLHttpRequest();
    //         } catch (err) {
    //             try {
    //                 // code for old IE browsers
    //                 xhr = new ActiveXObject("Microsoft.XMLHTTP");
    //             } catch (err) {
    //                 error(new Error('no ajax sorry'));
    //             }
    //         }
    //
    //         if (xhr) {
    //             xhr.addEventListener('readystatechange', function(event) {
    //                 //console.log('readystatechange', xhr.readyState, xhr.status);
    //                 if (xhr.readyState === 4) {
    //                     if (xhr.status === 200) {
    //                         resolve(JSON.parse(xhr.responseText));
    //                     } else {
    //                         reject(new Error(xhr.status));
    //                     }
    //                 }
    //             });
    //             xhr.open('GET', url, true);
    //             xhr.send(null);
    //        }
    //     });
    // }

