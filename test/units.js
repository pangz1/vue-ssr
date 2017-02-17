'use strict';

const supertest = require('supertest');
const should = require('should');

let app = require('../app').listen();
// local test
let user = {
    name: 'roei',
}

describe('basic tests', function() {
    it('the name should be tj', function() {
        user.name.should.equal('roei');
    });
});


describe('index page tests', function() {
    it('should pass, it should return valid status or data', function(done) {
        supertest(app)
            .get('/')
            .expect(function(res){
                console.log(res.status);
                let flag = res.status === 200 || res.status === 302
                if(!flag){
                    throw new Error('fail to get homepage');
                }
            })
            .end(done);
    });
});
