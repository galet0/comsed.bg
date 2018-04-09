var Storage = (function() {
    var data = {},
        supported = false;
    
    try {
        supported = 'localStorage' in window && window.localStorage !== null;
    } catch (e) {}

    return {
        setData: function(prop, value) {
            if (supported) {
                if (typeof value !== 'string') {
                    value = JSON.stringify(value);
                }
                localStorage.setItem(prop, value);
            } else {
                data[prop] = value;
            }
        },
        getData: function(prop) {
            if (supported) {
                var value = localStorage.getItem(prop);
                try {
					value = JSON.parse(value);
                } catch (err) {}
                return value;
            } else {
                return data[prop];
            }
        },
        removeData: function(prop) {
            if (supported) {
                return localStorage.removeItem(prop);
            } else {
                delete data[prop];
            }
        },
        clear: function() {
            if (supported) {
                return localStorage.clear();
            } else {
                data = {};
            }
        },
        keys: function() {
            var keys = [];
            if (supported) {
                for (var i = 0; i < localStorage.length; i++) {
                    keys.push(localStorage.key(i));
                }
            } else {
                keys = Object.keys(data);
            }
            return keys;
        }
    };
})();
