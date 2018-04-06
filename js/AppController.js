
document.addEventListener('DOMContentLoaded', function () {

    var tmpls = {};

    function getTemplate(tmplName) {
        if(!tmpls[tmplName]){
            var tmpl = document.getElementById(tmplName + '_tmpl');
            if(tmpl){
                tmpls[tmplName] = tmpl.innerHTML;
            }
        }

        return tmpls[tmplName];
    }

    function showPage(xhr) {
        console.log('showPage', xhr);
        var startIndex = xhr.responseText.indexOf('<body');
        startIndex = xhr.responseText.indexOf('>', startIndex) + 1;
        var endIndex = xhr.responseText.indexOf('</body>');
        var pageContent = xhr.responseText.slice(startIndex, endIndex);
        console.log(pageContent);

        var container = document.createElement('div');
        container.innerHTML = pageContent;
        console.log(container.querySelector('main'));
        document.querySelector('main').innerHTML = container.querySelector('main').innerHTML;
    }

    function badPage(error) {
        console.log('badPage',error.message);
    }

    function sendRequest(url, success, error) {
        var xhr;
        try{
            xhr = new XMLHttpRequest();
        } catch (err){
            try{
                xhr= new ActiveXObject("Microsoft.XMLHTTP");
            } catch (err){
                error(new Error("No AJAX"));
            }
        }

        if(xhr){
            xhr.addEventListener('readystatechange', function (event) {
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
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

    sendRequest(location.href, showPage, badPage);
});