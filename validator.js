let chai = require('chai');
let chaiHttp = require('chai-http');
let uuidv4 = require('uuid/v4');
let assert = require('assert');

let expect = chai.expect; 

chai.use(chaiHttp);
let argv = require('minimist')(process.argv.slice(2));

if (!argv.hasOwnProperty('app')) {
    process.exit(1);
}

let url = "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/"; 
let app_id = argv['app'];
let service = "offsite";

let webhook1 = url+app_id+"/service/"+service+"/incoming_webhook/search-listings";
let secret1 = "?secret=submission1";
let webhook2 = url+app_id+"/service/"+service+"/incoming_webhook/add-swagpref";
let secret2 = "?secret=submission2";
let webhook3 = url+app_id+"/service/"+service+"/incoming_webhook/get-swagprefs";
let secret3 = "?secret=submission3";

let needle = uuidv4();

describe("*** Eliot's Weekly MongoDB World Challenge Week 4 - Stitch Star ***", function(){
    this.timeout(30000);

    describe("Webhook 1: search-listings", function(){
        it('should return HTTP status code 200', function(done){
            var req = chai.request(webhook1).get(secret1); 
            req.end(function(err, res) {
                expect(res).to.have.status(200);
                expect(err).to.be.null;
                done();
            });
        });
        it('should return an array of 5 listings without any query parameters', function(done){
            var req = chai.request(webhook1).get(secret1); 
            req.end(function(err, res) {
                expect(err).to.be.null;
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(5);
                done();
            });
        });
        it('should only include the fields configured in the Stitch rule', function(done){
            var req = chai.request(webhook1).get(secret1);
            req.end(function(err, res) {
                expect(err).to.be.null;
                expect(res.body[0]).to.be.an('object');
                expect(res.body[0]).to.have.a.property('listing_url');
                expect(res.body[0]).to.have.a.property('name');
                expect(res.body[0]).to.have.a.property('summary');
                expect(res.body[0]).to.have.a.property('property_type');
                expect(res.body[0]).to.have.a.property('room_type');
                expect(res.body[0]).to.have.a.property('bedrooms');
                expect(res.body[0]).to.have.a.property('beds'); 
                expect(res.body[0]).to.have.a.property('bathrooms');
                expect(res.body[0]).to.have.a.property('price'); 
                expect(res.body[0]).to.have.a.property('cleaning_fee');
                expect(res.body[0]).to.have.a.property('address');
                expect(res.body[0]['address']).to.have.a.property('street');
                expect(res.body[0]).to.have.a.property('number_of_reviews');
                expect(res.body[0]).to.have.a.property('review_scores');
                expect(res.body[0]).to.not.have.a.property('minimum_nights');
                done();
            });
        });
        it('should only return listings matching the Stitch filter for the collection', function(done){
            var req = chai.request(webhook1).get(secret1);
            req.end(function(err, res) {
                expect(err).to.be.null;
                for (let i=0; i<5; i++) {
                    expect(parseFloat(res.body[i]['price']['$numberDecimal'])).to.be.below(300);
                    expect(parseInt(res.body[i]['number_of_reviews']['$numberInt'])).to.be.above(50);
                    expect(parseInt(res.body[i]['review_scores']['review_scores_rating']['$numberInt'])).to.be.above(95);
                }
                done();
            });
        });
        it('should return listings matching query parameters', function(done){
            var req = chai.request(webhook1)
                          .get(secret1)
                          .query({'address.country_code':'AU',
                                  'address.suburb':'Haymarket',
                                  'property_type':'Apartment'}); 
            req.end(function(err, res) {
                expect(err).to.be.null;
                expect(res.body).to.be.an('array'); 
                expect(res.body).to.have.length(1);
                expect(res.body[0]).to.be.an('object'); 
                assert(res.body[0]['name'], 'Cosy 2 levels Apartment near Central Station');
                done();
            });
        });
    });

    describe("Webhook 2: add-swagpref", function(){
        it('should be able to insert a document and return status code 201', function(done){
            chai.request(webhook2)
                .post(secret2)
                .send({"firstname":"MongoDB", 
                       "lastname": needle, 
                       "swag_type": "jacket", 
                       "swag_size": "xl"
                })
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    expect(err).to.be.null;
                    done();
                });
        });
        it('should return an error when inserting invalid swag_type value', function(done){
            chai.request(webhook2)
                .post(secret2)
                .send({"firstname":"MongoDB", 
                       "lastname": "Challenge", 
                       "swag_type": "trousers", 
                       "swag_size": "xl",
                       "validator": needle
                })
                .end(function(err, res) {
                    expect(res).to.have.status(403);
                    expect(res).to.have.a.property('error');
                    done();
                });
        });  

    });

    describe("Webhook 3: get-swagprefs", function(){
        it('should return an array sorted in descending order by date', function(done){
            chai.request(webhook3)
                .get(secret3)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(err).to.be.null;
                    expect(res.body).to.be.an('array'); 
                    expect(res.body[0]).to.be.an('object'); 
                    expect(res.body[0]).to.have.a.property('firstname');
                    expect(res.body[0]).to.have.a.property('lastname');

                    expect(res.body[0]).to.have.a.property('swag_size');
                    expect(res.body[0]).to.have.a.property('swag_type');
                    assert(res.body[0]['firstname'],'MongoDB');
                    assert(res.body[0]['lastname'], needle);
                    assert(res.body[0]['swag_type'], 'jacket');
                    assert(res.body[0]['swag_size'], 'xl');
                    done();
                });
        });    
    });

});
