const getJSON = require('get-json')
const config = require('../Consts')
const placeModel = require('../models/place');
const tripModel = require('../models/trip')


// return CancellationHistory array for specific trip
async function returnCancellationHistory(tripId, placeId) {
   return tripModel.findById(tripId)
        .then(result => {
            if (result) {
                //console.log(array);
        
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
                //console.log(array);
        
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
    console.log("placeId>>>>>>>", placeId);
    const placeGoogleId = placeId;
    console.log("placeGoogleId >>>>", placeGoogleId);
    
    return placeModel.findOne({ placeGoogleId })
        .then(result => {
            if(result){
                console.log("place>>>>>>>", result);
                if (result.amountOfSelections >= 5) {
    
                    console.log('recommendedLocation :', result.amountOfSelections);
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
    getBeaches(req, res, next) {
        // need to complete error check
        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} 
        ${req.body.location} 
        ${config.RADIUS} 
        ${req.body.radius} &type=%22point_of_interest%22,%22natural_feature%22&name=%22shore|beach%22 
        ${config.GOOGLE_PLACES_API_KEY}`,
            async function (err, response) {
                // const CancellationHistoryArray = await returnCancellationHistory(req.body.tripId);
                // const TripPlacesArray = await returnTripPlaces(req.body.tripId);
                let key = 0;
                // let counter = 0;
                
                // flag for if exist in cancellation History
                let cancellationFlag=0;
                let placeArrayFlag =0;
                console.log(response.results.length)

                for (key = 0; key < response.results.length && response.results[key].rating >= 4; key++) {
                    console.log("json from google ", response.results[key].place_id);
                    console.log("rating", response.results[key].rating);

                    cancellationFlag = await returnCancellationHistory(req.body.tripId, response.results[key].place_id);
                    placeArrayFlag = await returnTripPlaces(req.body.tripId, response.results[key].place_id);
                    console.log(cancellationFlag);
                    console.log(placeArrayFlag);
                    //

                    if (cancellationFlag===1 && placeArrayFlag===1) {
                        const recommend = await recommendedLocation(response.results[key].place_id);
                        console.log('recommended>>>>>>>>>>>>>>>', recommend);
    
                        if (recommend === 2) { // recommended
                            placeFoundFlag = true;
                            res.json(response.results[key].place_id)
                        }
                        else if (recommend === 1) { // not in system
                            placeFoundFlag = true;
                            console.log(response.results[key].place_id)
                            // res.json(response.results[key].place_id);
                        }
                        if (recommend === 0) continue; // not recommended
    
                    }

                }


        
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



