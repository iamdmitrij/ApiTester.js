const cheerio = require('cheerio');
const qs = require('querystring');
const sanitizer = require('sanitizer');

module.exports.extractCsrfToken = function (response) {
    var $ = cheerio.load(response.data);
    return $('[name=_csrf]').val();
}

module.exports.getCookie = function (response) {
    var cookies = response.headers['set-cookie'];

    if (cookies) {
        return cookies[0];
    }
}

module.exports.prepHttpRequest = function (cookie, token, code) {
    var formData = {
        code: sanitizer.escape(code),
        _csrf: token
    };

    const config = {
        headers: {
            'Cookie': cookie,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var result = {
        formData: qs.stringify(formData),
        config
    }

    return result;
}