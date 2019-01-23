const getJSON = require('get-json')
const config = require('../Consts')
const placeModel = require('../models/place');
const tripModel = require('../models/trip')

// return CancellationHistory array for specific trip
function returnCancellationHistory(tripId){
    //console.log(tripId);
    return tripModel.findById(tripId)
    .then(result => {
        console.log('array of cancellationHistory ',result);
        return (result);
    }).catch(err => {
        console.log(err);
    });

}

// return array of places for specific trip
function returnTripPlaces(tripId){
    //console.log(tripId);
    //const _id = tripId;
    tripModel.find({tripId})
    .then(result => {
        console.log('array of places:',result.places);
        return result.places;
    }).catch(err => {
        console.log(err);
    });

}

// check if a place is recommended by other users
function recommendedLocation(placeId){
    //console.log(placeId);
    placeModel.findOne({placeId})
    .then(result => {
        if(result){
            if (result.amountOfSelections >= 5){
            console.log('recommendedLocation :',result.place_id);
            return "recommended"; // recommended by other users
            }
            else return "notRecommended"; // not recommended
        }
        else return "newInSystem"; // not in places "collection
        
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
            
            const r1 = await returnCancellationHistory(req.body.tripId);
            const r2 = await returnTripPlaces(req.body.tripId);
            console.log("trying to print result",r1);
            let key = 0;
            let key2 =0;
            // flag for if exist in cancellation History
            let cancellationFlag = false;
            let placeArrayFlag = false;
            let placeFoundFlag = false;
            for (key in response.results) {
                const place = response.results[key].place_id;
                if (place >= 4) { // check for rate 
                    for(key2 in r1){
                        console.log(r1[2][key2])
                        if(place === r1[2][key2]) {
                            cancellationFlag = true; // exist in cancellation History
                            break;
                        }                
                    }
                    for (key2 in r2){
                        if(place === r2[key2]){
                            placeArrayFlag = true ; //exist in places array
                            break;
                        }
                    }
                    if(cancellationFlag || placeArrayFlag) continue;

                    const recommend = recommendedLocation(place);
                    if (recommend === "recommended"){
                        placeFoundFlag = true;
                        res.json(place)
                    }
                    if(recommend === "notRecommended") continue;
                    if(recommend === "newInSystem") {
                        placeFoundFlag = true;
                        res.json(place);
                    }
                }
            }
            if(!placeFoundFlag)
            {
                console.log("no place was found")
                res.send({
                    "found" : 0
                })
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



