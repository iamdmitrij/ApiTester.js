var sut = require('../src/httpUtils.js');
const should = require('chai').should();

describe('httpUtils.extractCsrfToken(content)', function () {
    it('should extract _csrf token', function () {
        // Arrange
        var token = {
            data: '<input type="hidden" name="_csrf" value="abc">'
        };

        // Act
        var actual = sut.extractCsrfToken(token);

        // Assert
        should.exist(actual);
    });
    it('should not csrf token', function () {
        // Arrange
        var token = {
            data: '<input type="hidden" name="csrf" value="abc">'
        };

        // Act
        var actual = sut.extractCsrfToken(token);

        // Assert
        should.not.exist(actual);
    });
    it('should not extract token', function () {
        // Arrange
        var token = {
            data: "<div></div>"
        };

        // Act
        var actual = sut.extractCsrfToken(token);

        // Assert
        should.not.exist(actual);
    });

    it('should not extract token', function () {
        // Arrange
        var token = {
            data: ""
        };

        // Act
        var actual = sut.extractCsrfToken(token);

        // Assert
        should.not.exist(actual);
    });
});

describe('httpUtils.getCookie(response)', function () {
    it('should extract cookie', function () {
        // Arrange
        var response = {
            headers: {
                'set-cookie': 'my=cookie; Path=/;'
            }
        };

        // Act
        var actual = sut.getCookie(response);

        // Assert
        should.exist(actual);
    });

    it('should not extract cookie', function () {
        // Arrange
        var response = {
            headers: {
            }
        };

        // Act
        var actual = sut.getCookie(response);

        // Assert
        should.not.exist(actual);
    });
});