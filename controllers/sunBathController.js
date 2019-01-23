const getJSON = require('get-json')
const config = require('../Consts')
const mongoose = require('mongoose');
const placeModel = require('../models/place');
const tripModel = require('../models/trip')

function returnCancellationHistory(tripId){
    console.log(tripId);
    tripModel.find({tripId})
    .then(result => {
        console.log('test',result);
        return result.cancellationHistory;
    }).catch(err => {
        console.log(err);
    });

}

module.exports = {

    //get baaces locations json from google
    getBeaches(req, res, next) {
        // need to complete error check
        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} ${req.body.location} ${config.RADIUS} ${req.body.radius} &type=%22point_of_interest%22,%22natural_feature%22&name=%22shore|beach%22 ${config.GOOGLE_PLACES_API_KEY}`, async function (err, response) {
            const r1 = await returnCancellationHistory(req.body.tripId)
            console.log(r1);
            let key = 0;
            let key2 =0;
            let flag = 1;
            for (key in response.results) {
                const place = response.results[key].place_id;
                if (place >= 4) {
                    for(key2 in r1){
                        if(place === r1[key2]) {
                            flag = 0;
                            break;
                        }                
                    }
                    if(flag === 0) continue;    
                }

                
                console.log(place)
                res.json(place);
                break;
            }
            console.log(response.results.length)
            // if (err) console.log('can not get getBeaches Json')
        });
    },


    // get spa locations json from google
    getSpa(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} ${req.body.location} ${config.RADIUS} ${req.body.radius} &name=%22spa%22 ${config.GOOGLE_PLACES_API_KEY}`, function (err, response) {

            let key = 0
            for (key in response.results) {
                if (response.results[key].rating >= 4)
                    console.log(response.results[key].place_id)
                break;
            }
            res.send(response.results[key].place_id);
            console.log(response.results.length)
            if (err) console.log('can not get getSpa Json')
        });

    },

    // get shops locations json from google
    getShops(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
                ${req.body.location} 
                ${config.RADIUS} 
                ${req.body.radius} &name=%22mall|shops|shopping%20center|boutique%20shop%22
                ${config.GOOGLE_PLACES_API_KEY}`, function (err, response) {

                let key = 0
                for (key in response.results) {
                    if (response.results[key].rating >= 4)
                        console.log(response.results[key].place_id)
                    break;
                }
                res.send(response.results[key].place_id);
                console.log(response.results.length)
                if (err) console.log('can not get getShops Json')
            });
    },


    // get Bars locations json from google
    getBars(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
                ${req.body.location} 
                ${config.RADIUS} 
                ${req.body.radius} &name=%22bar|cocktail%20bar|beach%20bar|club|dance%20club|night%20club|pub|dance%20pub|party|ball|concert%22
                ${config.GOOGLE_PLACES_API_KEY}`, function (err, response) {

                let key = 0
                for (key in response.results) {
                    if (response.results[key].rating >= 4)
                        console.log(response.results[key].place_id)
                    break;
                }
                res.send(response.results[key].place_id);
                console.log(response.results.length);
                if (err) console.log('can not get getBars Json');
            });
    },


    // get Restaurant locations json from google
    getRestaurant(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
                ${req.body.location} 
                ${config.RADIUS} 
                ${req.body.radius} &type=restaurant&name=%22steak%20house|italian|french|bistro|sushi|chinese|jewish|mediterranean|grill%22
                ${config.GOOGLE_PLACES_API_KEY}`, function (err, response) {

                let key = 0
                for (key in response.results) {
                    if (response.results[key].rating >= 4)
                        console.log(response.results[key].place_id)
                    break;
                }
                res.send(response.results[key].place_id);
                console.log(response.results.length)
                if (err) console.log('can not get getRestaurant Json')
            })


    }

}



