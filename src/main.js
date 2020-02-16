const api = require("./targetApi.js");
var codes = process.env.CODE_INPUT;

for (var code of codes.split(',')) {
    api.assertCode(code);
}