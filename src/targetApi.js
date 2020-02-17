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

            this.postCode(cookie, token, code);
        })
        .catch(error => {
            log(error);
            throw new Error(error);
        });
}

module.exports.postCode = function (cookie, token, code) {
    var url = `${baseUrl}/result.html`;
    var request = httpUtils.prepHttpRequest(cookie, token, code);

    http.post(url, request.formData, request.config)
        .then(response => {
            this.validateCode(code, response.data);
        })
        .catch(error => {
            log(error);
            throw new Error(error);
        });
}

module.exports.validateCode = function (code, response) {
    if (response.error) {
        log(chalk.red(`Code "${code}" validation failed: "${response.error}".`));
        return false;
    }
    else {
        if (!response.result) {
            log(chalk.red(`Code "${code}" validation failed: result is empty.`));
            return false;
        }
        log(chalk.green(`Code "${code}" validation passed with flying colors: "${response.result}".`));
        return true;
    }
}