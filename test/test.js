var expect = require("chai").expect;
var request = require("request");


describe("Add Two Numbers", function() {
    var url = "http://localhost:5500/addTwoNumbers/3/5";
    it("returns status 200 to check if api works", function(done) {
        request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done()
        });
    });

it("returns statusCode key in body to check if api give right result should be 200", function(done) {
    request(url, function(error, response, body) {
        body = JSON.parse(body)
        expect(body.statusCode).to.equal(200);
        done()
    });
});

it("returns the result as number", function(done) {
    request(url, function(error, response, body) {
        body = JSON.parse(body)
        expect(body.result).to.be.a('number');
        done()
        });
});


it("returns the result equal to 8", function(done) {
    request(url, function(error, response, body) {
        body = JSON.parse(body)
        expect(body.result).to.equal(8);
        done()
        });
});
it("returns the result not equal to 15", function(done) {
    request(url, function(error, response, body) {
        body = JSON.parse(body)
        expect(body.result).to.not.equal(15);
        done()
    });
});
});

describe("Add Two strings", function() {
    var url = "http://localhost:5500/addTwoNumbers/a/b";
    it("should not returns status 200", function(done) {
        request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done()
        });
    });

    it("returns statusCode key in body to check if api gives right result should be 400", function(done) {
    request(url, function(error, response, body) {
        body = JSON.parse(body)
        expect(body.statusCode).to.equal(400);
        done()
        });
    });

    it("returns the result as null", function(done) {
    request(url, function(error, response, body) {
        body = JSON.parse(body)
        expect(body.result).to.be.a('null');
        done()
        });
    });
});

describe("Validate Projects api", function() {
    var url = "http://localhost:5500/api/project";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns the result as array", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.data).to.be.a('array');
            done()
          });
    });
});


describe('test GET api', function(){
    const url = "http://localhost:5500/api/project";
    const cat = { path: '', title: '' };


    it("returns status code 200", function (done) {
        request(url, function (error, response, body) {
            if (!error && response && response.statusCode === 200) {
                expect(response.statusCode).to.equal(200);
                done();
            } else {
                done(error || new Error("Failed to get status 200"));
            }
        });
    });

    it("post project to DB", function (done) {
        request.post({ url: url, form: cat }, function (error, response, body) {
            if (error) {
                done(error);
            } else {
                expect(response.statusCode).to.equal(200);
                
            
                let responseBody = JSON.parse(body);
                
                expect(responseBody).to.have.property('statusCode').that.equals(200);
                expect(responseBody).to.have.property('message').that.equals('Project Successfully added');
                
                done();
            }
        });
    });
});