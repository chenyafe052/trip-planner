const getJSON = require('get-json')
const config = require('../Consts')
const placeModel = require('../models/place');
const tripModel = require('../models/trip')

// return CancellationHistory array for specific trip
async function returnCancellationHistory(tripId, placeId) {
    return tripModel.findById(tripId)
        .then(result => {
            if (result.cancellationHistory) {
                let key;
                //console.log(result.cancellationHistory);

                for (key = 0; key < result.cancellationHistory.length; key++) {
                    //console.log("im in the cancellationHistory  >>>>>",result.cancellationHistory[key]);
                    //console.log("new place Id", placeId)
                    if (result.cancellationHistory[key] === placeId) return 2; // exist
                }
                return 1; // not exist
            }
            else return 0; //no record
        }).catch(err => {
            console.log(err);
        });
}
// return array of places for specific trip
async function returnTripPlaces(tripId, placeId) {
    return tripModel.findById(tripId)
        .then(result => {
            if (result.places) {
                let key;
                for (key = 0; key < result.places.length; key++) {
                    if (result.places[key] === placeId) return 2;
                }
                return 1;
            }
            else return 0;
        }).catch(err => {
            console.log(err);
        });
}

// check if a place is exist in places collection
async function isExist(placeId) {
    const placeGoogleId = placeId;
    return placeModel.findOne({ placeGoogleId })
        .then(result => {
            if (result) {
                return true; // exist in places collections
            }
            else return false; // not exist in places collections
        }).catch(err => {
            console.log(err);
        });
}

// check if a place is recommended by other users , exist for sure, checked before
async function recommendedLocation(placeId) {
    const placeGoogleId = placeId;
    return placeModel.findOne({ placeGoogleId })
        .then(result => {
            if (result.amountOfSelections >= 5) {
                return true; // recommended by other users
            }
            else return false; // not recommended
        }).catch(err => {
            console.log(err);
        });
}



module.exports = {

    //get baaces locations json from google
    getBeaches(req, res, next) {
        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
                 ${req.body.location} 
                 ${config.RADIUS} 
                 ${req.body.radius} &type=%22point_of_interest%22,%22natural_feature%22&name=%22shore|beach%22 
                 ${config.GOOGLE_PLACES_API_KEY}`,
            async function (err, response) {

                let key = 0, cancellationFlag = 0, placeArrayFlag = 0;
                let isExistFlag = false, isRecommFlag = false;
                let placeSave;

                for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                    cancellationFlag = 0;
                    placeArrayFlag = 0;
                    isExistFlag = false, isRecommFlag = false;

                    cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                    placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);

                    // check if place is not in CancellationHistory && returnTripPlaces
                    if (cancellationFlag === 1 && placeArrayFlag === 1) {
                        isExistFlag = await isExist(response.results[key].place_id)
                        if (isExistFlag) {
                            isRecommFlag = await recommendedLocation(response.results[key].place_id);
                            if (isRecommFlag) res.json(response.results[key].place_id);
                            else continue;
                        }
                        else placeSave = response.results[key].place_id;
                    }
                }
                if (!isExistFlag) res.json(placeSave);
                if (err) console.log('can not get getBeaches Json')

            });
    },


    // get spa locations json from google
    getSpa(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
                 ${req.body.location} 
                 ${config.RADIUS} 
                 ${req.body.radius} &name=%22spa%22 
                 ${config.GOOGLE_PLACES_API_KEY}`,
            async function (err, response) {

                let key = 0, cancellationFlag = 0, placeArrayFlag = 0;
                let isExistFlag = false, isRecommFlag = false;
                let placeSave;

                for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                    cancellationFlag = 0;
                    placeArrayFlag = 0;
                    isExistFlag = false, isRecommFlag = false;

                    cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                    placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);

                    // check if place is not in CancellationHistory && returnTripPlaces
                    if (cancellationFlag === 1 && placeArrayFlag === 1) {
                        isExistFlag = await isExist(response.results[key].place_id)
                        if (isExistFlag) {
                            isRecommFlag = await recommendedLocation(response.results[key].place_id);
                            if (isRecommFlag) res.json(response.results[key].place_id);
                            else continue;
                        }
                        else placeSave = response.results[key].place_id;
                    }
                }
                if (!isExistFlag) res.json(placeSave);
                if (err) console.log('can not get getSpa Json')

            });
    },

    // get shops locations json from google
    getShops(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
        ${req.body.location} 
        ${config.RADIUS} 
        ${req.body.radius}&type=%22shop%22&name=mall|shop|shopping%20center|boutique%20shop 
        ${config.GOOGLE_PLACES_API_KEY}`,
            async function (err, response) {

                let key = 0, cancellationFlag = 0, placeArrayFlag = 0;
                let isExistFlag = false, isRecommFlag = false;
                let placeSave;

                for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                    cancellationFlag = 0;
                    placeArrayFlag = 0;
                    isExistFlag = false, isRecommFlag = false;

                    cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                    placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);

                    // check if place is not in CancellationHistory && returnTripPlaces
                    if (cancellationFlag === 1 && placeArrayFlag === 1) {
                        isExistFlag = await isExist(response.results[key].place_id)
                        if (isExistFlag) {
                            isRecommFlag = await recommendedLocation(response.results[key].place_id);
                            if (isRecommFlag) res.json(response.results[key].place_id);
                            else continue;
                        }
                        else placeSave = response.results[key].place_id;
                    }
                }
                if (!isExistFlag) res.json(placeSave);
                if (err) console.log('can not get getShops Json')

            });
    },


    // get Bars locations json from google
    getBars(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
        ${req.body.location} 
        ${config.RADIUS} 
        ${req.body.radius} &name=%22bar|cocktail%20bar|beach%20bar|club|dance%20club|night%20club|pub|dance%20pub|party|ball|concert%22
        ${config.GOOGLE_PLACES_API_KEY}`,
            async function (err, response) {

                let key = 0, cancellationFlag = 0, placeArrayFlag = 0;
                let isExistFlag = false, isRecommFlag = false;
                let placeSave;

                for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                    cancellationFlag = 0;
                    placeArrayFlag = 0;
                    isExistFlag = false, isRecommFlag = false;

                    cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                    placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);

                    // check if place is not in CancellationHistory && returnTripPlaces
                    if (cancellationFlag === 1 && placeArrayFlag === 1) {
                        isExistFlag = await isExist(response.results[key].place_id)
                        if (isExistFlag) {
                            isRecommFlag = await recommendedLocation(response.results[key].place_id);
                            if (isRecommFlag) res.json(response.results[key].place_id);
                            else continue;
                        }
                        else placeSave = response.results[key].place_id;
                    }
                }
                if (!isExistFlag) res.json(placeSave);
                if (err) console.log('can not get getBars Json')

            });
    },


    // get Restaurant locations json from google
    getRestaurant(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
        ${req.body.location} 
        ${config.RADIUS} 
        ${req.body.radius} &type=restaurant&name=%22steak%20house|italian|french|bistro|sushi|chinese|jewish|mediterranean|grill%22
        ${config.GOOGLE_PLACES_API_KEY}`,
            async function (err, response) {

                let key = 0, cancellationFlag = 0, placeArrayFlag = 0;
                let isExistFlag = false, isRecommFlag = false;
                let placeSave;

                for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                    cancellationFlag = 0;
                    placeArrayFlag = 0;
                    isExistFlag = false, isRecommFlag = false;

                    cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                    placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);

                    // check if place is not in CancellationHistory && returnTripPlaces
                    if (cancellationFlag === 1 && placeArrayFlag === 1) {
                        isExistFlag = await isExist(response.results[key].place_id)
                        if (isExistFlag) {
                            isRecommFlag = await recommendedLocation(response.results[key].place_id);
                            if (isRecommFlag) res.json(response.results[key].place_id);
                            else continue;
                        }
                        else placeSave = response.results[key].place_id;
                    }
                }
                if (!isExistFlag) res.json(placeSave);
                if (err) console.log('can not get getRestaurant Json')

            });
    }


}
