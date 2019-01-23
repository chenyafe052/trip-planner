const getJSON = require('get-json')
const config = require('../Consts')
const mongoose = require('mongoose');
const placeModel = require('../models/place');
const tripModel = require('../models/trip')

function returnCancellationHistory(tripId){
    //console.log(tripId);
    return tripModel.findById(tripId)
    .then(result => {
        return (result.cancellationHistory);
    }).catch(err => {
        console.log(err);
    });

}

// return array of places for specific trip
function returnTripPlaces(tripId){
    //console.log(tripId);
    //const _id = tripId;
    return tripModel.findById(tripId)
    .then(result => {
        return (result.places);
    }).catch(err => {
        console.log(err);
    });

}

module.exports = {

    //get baaces locations json from google
    getBeaches(req, res, next) {
        // need to complete error check
        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} ${req.body.location} ${config.RADIUS} ${req.body.radius} &type=%22point_of_interest%22,%22natural_feature%22&name=%22shore|beach%22 ${config.GOOGLE_PLACES_API_KEY}`, 
        async function (err, response) {
            //console.log(response);
            
            const CancellationHistoryArray = await returnCancellationHistory(req.body.tripId);
            const TripPlacesArray = await returnTripPlaces(req.body.tripId);
            console.log("trying to print result [0]",CancellationHistoryArray[0]);
            let key = 0;
            let key2 =0;
            // flag for if exist in cancellation History
            let cancellationFlag = false;
            let placeArrayFlag = false;
            let placeFoundFlag = false;
            // console.log(response.results);
            console.log("CancellationHistoryArray" , CancellationHistoryArray);
            console.log("TripPlacesArray" , TripPlacesArray);

            for (key=0 ; key < response.results.length ; key++) {
                //console.log("json from google " ,response.results[key].name);
                //const place = response.results[key].place_id;
                console.log("rating" ,response.results[key].rating);

                
                if (response.results[key].rating >= 4) { // check for rate 
                    for(key2=0; key2 < CancellationHistoryArray.length; key2++){
                        console.log("CancellationHistoryArray[key2]",CancellationHistoryArray[key2])
                        console.log("from google" , response.results[key].place_id);
                        
                        if(response.results[key].place_id === CancellationHistoryArray[key2]) {
                            cancellationFlag = true; // exist in cancellation History
                            console.log("cancellationFlag",cancellationFlag);
                            
                            break;
                        }                
                    }
                    for (key2=0; key2 < TripPlacesArray.length; key2++){
                        if(response.results[key].place_id === TripPlacesArray[key2]){
                            placeArrayFlag = true ; //exist in places array
                            break;
                        }
                    }
                    if(cancellationFlag || placeArrayFlag) continue;

                    const recommend = recommendedLocation(response.results[key].place_id);
                    if (recommend === "recommended"){
                        placeFoundFlag = true;
                        res.json(response.results[key].place_id)
                    }
                    if(recommend === "notRecommended") continue;
                    if(recommend === "newInSystem") {
                        placeFoundFlag = true;
                        res.json(response.results[key].place_id);
                    }
                }

                if (response.results[key].rating >= 4)
                    console.log(response.results[key].place_id)
                res.json(response.results[key].place_id);
                break;
            }
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
             if (err) console.log('can not get getBeaches Json')
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



