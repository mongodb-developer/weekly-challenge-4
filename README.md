# Eliot's Weekly MongoDB World 2019 Challenge Week 4 - Stitch Star

A test suite to help validate your answer to [Eliot's Weekly MongoDB World 2019
Challenge Week 4](https://mdbwchallengeweek4.splashthat.com/).

## Prerequisites

The test suite requires [Node.js](https://nodejs.org/es/).

## How to run: 

To run these tests against your MongoDB Stitch application you need to provide
your unique Stitch AppId as a parameter. You can copy this from the top left of
the Stitch web interface.

```s
cd <repo>
npm install
npm start -- --app <APP_ID>
```

For example:
```s
npm start -- --app "challenge-uvtrd"

> stitch_challenge@1.0.0 start /home/bobbytables/mongodb/weekly-challenge-4
> mocha validator.js "--app" "stitchy-and-scratchy-dczlw"



  *** Eliot's Weekly MongoDB World Challenge Week 4 - Stitch Star ***
    Webhook 1: search-listings
      ✓ should return HTTP status code 200 (3485ms)
      ✓ should return an array of 5 listings without any query parameters (3186ms)
      ✓ should only include the fields configured in the Stitch rule (2156ms)
      ✓ should only return listings matching the Stich filter for the collection (3583ms)
      ✓ should return listings matching query parameters (1587ms)
    Webhook 2: add-swagpref
      ✓ should be able to insert a document and return status code 201 (1074ms)
      ✓ should return an error when inserting invalid swag_type value (1194ms)
    Webhook 3: get-swagprefs
      ✓ should return an array sorted in descending order by date (1340ms)


  8 passing (18s)
```
