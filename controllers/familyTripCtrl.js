const getJSON = require('get-json')
const config = require('../Consts')
const placeModel = require('../models/place');
const tripModel = require('../models/trip')

// return CancellationHistory array for specific trip
async function returnCancellationHistory(tripId, placeId) {
   return tripModel.findById(tripId)
        .then(result => {
            if (result) {
                let key;
                for (key = 0; key < result.length; key++) {
                    if (result[key] === placeId) return 2;
                }
                return 1;
            }
            else return 0;
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
// check if a place is recommended by other users
async function recommendedLocation(placeId) {
    const placeGoogleId = placeId;
    return placeModel.findOne({ placeGoogleId })
        .then(result => {
            if(result){
                if (result.amountOfSelections >= 5) {
                    return 2; // recommended by other users
                }
                else return 0; // not recommended
            }
            else return 1; // not in places "collection
        }).catch(err => {
            console.log(err);
        });
}

module.exports = {

    //get baaces locations json from google
    getKidsAttraction(req, res, next) {
        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
                 ${req.body.location} 
                 ${config.RADIUS} 
                 ${req.body.radius} &name=kids|attractions
                 ${config.GOOGLE_PLACES_API_KEY}`,
                 async function (err, response) {
                    let key = 0;
                    let cancellationFlag= 0;
                    let placeArrayFlag = 0;
                    let recommend = 0;

                    for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                        cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                        placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);

                        // check if place is not in CancellationHistory && returnTripPlaces
                        if (cancellationFlag===1 && placeArrayFlag===1) {
                            recommend = await recommendedLocation(response.results[key].place_id);
        
                            if (recommend === 2) { // recommended
                                placeFoundFlag = true;
                                res.json(response.results[key].place_id)
                            }
                            else if (recommend === 1) { // not in system
                                placeFoundFlag = true;
                                console.log(response.results[key].place_id)
                            }
                            if (recommend === 0) continue; // not recommended
                        }
                }
            if (err) console.log('can not get getBeaches Json')
    });
    },


    // get spa locations json from google
    getMuseum(req, res, next) {

    getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
             ${req.body.location} 
             ${config.RADIUS} ${req.body.radius} &name=museum|art|history|top 
             ${config.GOOGLE_PLACES_API_KEY}`, 
             async function (err, response) {
                let key = 0;
                let cancellationFlag= 0;
                let placeArrayFlag = 0;
                let recommend = 0;

                for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                    cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                    placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);

                    // check if place is not in CancellationHistory && returnTripPlaces
                    if (cancellationFlag===1 && placeArrayFlag===1) {
                        recommend = await recommendedLocation(response.results[key].place_id);
    
                        if (recommend === 2) { // recommended
                            placeFoundFlag = true;
                            res.json(response.results[key].place_id)
                        }
                        else if (recommend === 1) { // not in system
                            placeFoundFlag = true;
                            console.log(response.results[key].place_id)
                        }
                        if (recommend === 0) continue; // not recommended
                    }
            }
        if (err) console.log('can not get getBeaches Json')
});

    },

    // get shops locations json from google
    getShoppingPlace(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
                    ${req.body.location} 
                    ${config.RADIUS} 
                    ${req.body.radius} &name=mall|shops|shopping%20center
                    ${config.GOOGLE_PLACES_API_KEY}`, 
                    async function (err, response) {
                        let key = 0;
                        let cancellationFlag= 0;
                        let placeArrayFlag = 0;
                        let recommend = 0;

                        for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                            cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                            placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);

                            // check if place is not in CancellationHistory && returnTripPlaces
                            if (cancellationFlag===1 && placeArrayFlag===1) {
                                recommend = await recommendedLocation(response.results[key].place_id);
            
                                if (recommend === 2) { // recommended
                                    placeFoundFlag = true;
                                    res.json(response.results[key].place_id)
                                }
                                else if (recommend === 1) { // not in system
                                    placeFoundFlag = true;
                                    console.log(response.results[key].place_id)
                                }
                                if (recommend === 0) continue; // not recommended
                            }
                    }
                if (err) console.log('can not get getBeaches Json')
        });
    },


    // get Bars locations json from google
    getParks(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
                    ${req.body.location} 
                    ${config.RADIUS} 
                    ${req.body.radius} &name=amusment|park|nature
                    ${config.GOOGLE_PLACES_API_KEY}`, 
                    async function (err, response) {
                        let key = 0;
                        let cancellationFlag= 0;
                        let placeArrayFlag = 0;
                        let recommend = 0;

                        for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                            cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                            placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);

                            // check if place is not in CancellationHistory && returnTripPlaces
                            if (cancellationFlag===1 && placeArrayFlag===1) {
                                recommend = await recommendedLocation(response.results[key].place_id);
            
                                if (recommend === 2) { // recommended
                                    placeFoundFlag = true;
                                    res.json(response.results[key].place_id)
                                }
                                else if (recommend === 1) { // not in system
                                    placeFoundFlag = true;
                                    console.log(response.results[key].place_id)
                                }
                                if (recommend === 0) continue; // not recommended
                            }
                    }
                if (err) console.log('can not get getBeaches Json')
        });
    },


    // get Restaurant locations json from google
    getRestaurant(req, res, next) {

        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
                    ${req.body.location} 
                    ${config.RADIUS} 
                    ${req.body.radius} &type=restaurant&name=steak%20house|italian|french|bistro|sushi|chinese|mediterranean|grill
                    ${config.GOOGLE_PLACES_API_KEY}`, 
                    async function (err, response) {
                        let key = 0;
                        let cancellationFlag= 0;
                        let placeArrayFlag = 0;
                        let recommend = 0;

                        for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                            cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                            placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);

                            // check if place is not in CancellationHistory && returnTripPlaces
                            if (cancellationFlag===1 && placeArrayFlag===1) {
                                recommend = await recommendedLocation(response.results[key].place_id);
            
                                if (recommend === 2) { // recommended
                                    placeFoundFlag = true;
                                    res.json(response.results[key].place_id)
                                }
                                else if (recommend === 1) { // not in system
                                    placeFoundFlag = true;
                                    console.log(response.results[key].place_id)
                                }
                                if (recommend === 0) continue; // not recommended
                            }
                    }
                if (err) console.log('can not get getBeaches Json')
        });


    }

}



