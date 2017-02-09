/*! cookie.js - Simple javascript cookie class. - Version: 1.0.0 */
/**
 * Simple javascript cookie class.
 *
 * @class Cookie
 *
 * @type     {Object}
 * @property {Function} getData - Returns the stored data of the cookie or null.
 * @property {Function} save    - Saves the given value in the cookie.
 * @property {Function} remove  - Removes the cookie.
 *
 * @param {String} name - Name of the cookie
 * @param {Number} days - Days before cookie expires.
 *
 * @returns {Object}
 * @example
 * var cookie = new Cookie('customCookieName', 1);
 *
 * console.log('Cookie-Data, if exists: ', cookie.getData());
 *
 * cookie.save({
 *     customProperty1 : 1,
 *     customProperty2 : 'two',
 *     customProperty3 : [3, 'three']
 * });
 *
 * cookie.remove();
 */
function Cookie(name, days) {

    // ---------------------------------------------------------------------------------------- Preferences & Properties

    name = name || 'defaultCookieName'; //& Default cookie name
    days = days || 1;

    // ----------------------------------------------------------------------------------------- Internal module methods

   /*
    * Returns the public api.
    *
    * @private
    * @returns {Object}
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
     * Saves the given value in the cookie.
     *
     * @public
     * @param {*} value
     * @example
     * var cookie = new Cookie('customCookieName', 1);
     *
     * cookie.save({
     *     customProperty1 : 1,
     *     customProperty2 : 'two',
     *     customProperty3 : [3, 'three']
     * });
     */
    function save(value) {
        var cookieStringParts = [],
            date, expires;

        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

            expires = date.toGMTString();
        }
        else {
            expires = '';
        }

        cookieStringParts.push(name,      '=', JSON.stringify(value), ';');
        cookieStringParts.push('expires', '=', expires, ';');
        cookieStringParts.push('path',    '=', '/');

        document.cookie = cookieStringParts.join('');
    }


    /**
     * Returns the stored data of the cookie or null.
     *
     * @public
     * @returns {*|null}
     * @example
     * var cookie = new Cookie('customCookieName', 1),
     *     data;
     *
     * data = cookie.getData();
     *
     * console.log(data);
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


    /**
     * Removes the cookie.
     *
     * @public
     * @example
     * var cookie = new Cookie('customCookieName', 1);
     *
     * cookie.remove();
     */
    function remove() {
        days = -1;
        save('');
    }

    // ---------------------------------------------------------------------------------------------------------- Return

    return getPublicApi();
}
