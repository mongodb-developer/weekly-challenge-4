# Notice: Repository Deprecation
This repository is deprecated and no longer actively maintained. It contains outdated code examples or practices that do not align with current MongoDB best practices. While the repository remains accessible for reference purposes, we strongly discourage its use in production environments.
Users should be aware that this repository will not receive any further updates, bug fixes, or security patches. This code may expose you to security vulnerabilities, compatibility issues with current MongoDB versions, and potential performance problems. Any implementation based on this repository is at the user's own risk.
For up-to-date resources, please refer to the [MongoDB Developer Center](https://mongodb.com/developer).


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
> mocha validator.js "--app" "challenge-uvtrd"



  *** Eliot's Weekly MongoDB World Challenge Week 4 - Stitch Star ***
    Webhook 1: search-listings
      ✓ should return HTTP status code 200 (3485ms)
      ✓ should return an array of 5 listings without any query parameters (3186ms)
      ✓ should only include the fields configured in the Stitch rule (2156ms)
      ✓ should only return listings matching the Stitch filter for the collection (3583ms)
      ✓ should return listings matching query parameters (1587ms)
    Webhook 2: add-swagpref
      ✓ should be able to insert a document and return status code 201 (1074ms)
      ✓ should return an error when inserting invalid swag_type value (1194ms)
    Webhook 3: get-swagprefs
      ✓ should return an array sorted in descending order by date (1340ms)


  8 passing (18s)
```

You can also run a specific test by utilising the `-g` parameter. For example, to only run `search-listings` you can do: 

```s
npm start -- --app "challenge-uvtrd" -g 'search-listings'

> stitch_challenge@1.0.0 start /home/bobbytables/mongodb/weekly-challenge-4
> mocha validator.js "--app" "challenge-uvtrd" "-g" "search-listings"



  *** Eliot's Weekly MongoDB World Challenge Week 4 - Stitch Star ***
    Webhook 1: search-listings
      ✓ should return HTTP status code 200 (5376ms)
      ✓ should return an array of 5 listings without any query parameters (900ms)
      ✓ should only include the fields configured in the Stitch rule (1024ms)
      ✓ should only return listings matching the Stitch filter for the collection (4569ms)
      ✓ should return listings matching query parameters (3006ms)


  5 passing (15s)
```
