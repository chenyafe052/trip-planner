
// const googleModel = require('./googleController')

const getJSON = require('get-json')
const config = require('../Consts')
const mongoose = require('mongoose');
const placeModel = require('../models/places');
const tripModel = require('../models/trips')



function returnCancellationHistory(tripId){
    console.log(tripId);
    result = tripModel.find({tripId});
    console.log(result);

    console.log(JSON.stringify(result));
    array = result.cancellationHistory;
    if (result) {
        console.log(array);
        return (array);
    }
    else res.status(404).send('place not found');
}

module.exports = {

    //get baaces locations json from google
    getBeaches(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} ${req.body.location} ${config.RADIUS} ${req.body.radius} &type=%22point_of_interest%22,%22natural_feature%22&name=%22shore|beach%22 ${config.GOOGLE_PLACES_API_KEY}`, function (err, response) {
            r1 = returnCancellationHistory(req.body.tripId)
            console.log(r1);
            // let key = 0
            // for (key in response.results) {
            //     const place = response.results[key].place_id;
            //     if (place >= 4) {

            //     }

            //     if ((response.results[key].rating >= 4) && (response.results[key].place_id != req.body.placeID))
            //         console.log(response.results[key].place_id)
            //     res.json(response.results[key].place_id);
            //     break;
            // }
            // const placeRes = response.results[key].place_id;
            // check if exist if DB
            // mongoose
            // .connect(url, options)
            // .then(async() => {
            //     const {placeGoogleId = null} = placeRes;
            //     const result = await placeModel.find({placeGoogleId})

            //     if(result) {
            //         res.send(`place : ${placeRes} was found`);

            //     }
            //     else res.status(404).send('place not found');

            //     mongoose.disconnect();

            // })
            // .catch(err => {
            //     console.error('some error occurred' , err)
            //     res.status(500).send(err.message)
            // })
            // res.send(placeRes);
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



