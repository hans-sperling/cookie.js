/**
 *
 */
function Cookie(name, days) {

    // ---------------------------------------------------------------------------------------- Preferences & Properties

    name = name || 'defaultCookieName';
    days = days || 1;

    // ----------------------------------------------------------------------------------------- Internal module methods

    /**
     *
     */
    function init() {
        console.log('Cookie ', name, ' created');
        createCookie('', days);
    }


    /**
     *
     * @returns {{getData: getData, save: save, remove: remove}}
     */
    function getPublicApi() {
        return {
            getData : getData,
            save    : save,
            remove  : remove
        };
    }

    // --------------------------------------------------------------------------------------------------------- Methods

    /**
     *
     * @param {*}      value
     * @param {Number} expires
     */
    function createCookie(value, expires) {
        days = expires;
        save(value);
    }


    /**
     *
     * @param {*} value
     */
    function save(value) {
        var date, expires;

        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

            expires = '; expires=' + date.toGMTString();
        }
        else {
            expires = '';
        }

        document.cookie = name + '=' + JSON.stringify(value) + expires + '; path=/';
    }


    /**
     *
     * @returns {Object|null}
     */
    function getData() {
        var nameEQ = name + '=',
            ca     = document.cookie.split(';'),
            c, i;

        for(i = 0; i < ca.length; i++) {
            c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) == 0) {
                return JSON.parse(c.substring(nameEQ.length,c.length));
            }
        }

        return null;
    }


    function remove() {
        createCookie('', -1);
    }

    // ----------------------------------------------------------------------------- Initial & Constructor call / Return

    (init)();

    return getPublicApi();
}
