const http = require('axios');
const chalk = require('chalk');
const httpUtils = require("./httpUtils.js");
const log = console.log;
const baseUrl = process.env.TARGET_API;

module.exports.assertCode = function (code) {
    http.get(baseUrl)
        .then(response => {
            var cookie = httpUtils.getCookie(response);
            var token = httpUtils.extractCsrfToken(response);

            postCode(cookie, token, code);
        })
        .catch(error => {
            log(error);
        });
}

function postCode(cookie, token, code) {
    var url = `${baseUrl}/result.html`;
    var request = httpUtils.prepHttpRequest(cookie, token, code);

    http.post(url, request.formData, request.config)
        .then((response) => {
            validateCode(code, response.data);
        })
        .catch(error => {
            log(error);
        });
}

function validateCode(code, response) {
    if (response.error) {
        log(chalk.red(`Code "${code}" validation failed: "${response.error}".`));
    }
    else {
        log(chalk.green(`Code "${code}" validation passed with flying colors: "${response.result}".`));
    }
}