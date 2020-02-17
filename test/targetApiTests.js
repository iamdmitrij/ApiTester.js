var sut = require('../src/targetApi.js');
const expect = require('chai').expect;
const moxios = require('moxios');
const axios = require('axios');

describe('targetApi.validateCode()', function () {
    it('empty code should be invalid', function () {
        // Arrange
        var response = {
        };

        // Act
        var actual = sut.validateCode("", response);

        // Assert
        expect(actual, "code is valid").to.be.false;
    });

    it('REB002 code should be valid', function () {
        // Arrange
        var response = {
            result: "The code: REB002",
            error: null
        };

        // Act
        var actual = sut.validateCode("REB002", response);

        // Assert
        expect(actual, "code is valid").to.be.true;
    });


    it('REB009 code should be invalid', function () {
        // Arrange
        var response = {
            error: 'Bad input'
        };

        // Act
        var actual = sut.validateCode("REB009", response);

        // Assert
        expect(actual, "code is not valid").to.be.false;
    });
});
