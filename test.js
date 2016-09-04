 /*eslint node/no-unpublished-require: 0*/

var http = require('http');
var request = require('request');
var expect = require('chai').expect;

var TEST_PORT = 54674
var PROXY_PORT = process.env.PORT || 3000
var BODY = "Expected message from remote server"

process.env.LISTEN_DOMAIN = `127.0.0.1`
process.env.TARGET_DOMAIN = `127.0.0.1:${TEST_PORT}`

var redbirdProxy = require('./app');

describe("Target with a hostname", function(){

	it("Should have the host header passed to the target", function(done){

		expect(redbirdProxy.routing).to.be.an("object");

		expect(redbirdProxy.routing).to.have.property('127.0.0.1');

		testServer().then(function(req){
			expect(req.headers['host']).to.be.eql(process.env.LISTEN_DOMAIN)
		})

		request.get('http://127.0.0.1:' + PROXY_PORT, function(req, res, body) {
      expect(body).to.be.equals(BODY)
			redbirdProxy.close();
			done();
		});

	})
})


function testServer(){
  return new Promise(function(resolve){
    var server = http.createServer(function(req, res){
      res.write(BODY)
      res.end();
      resolve(req);
      server.close();
    });

    server.listen(TEST_PORT);
  })
}
