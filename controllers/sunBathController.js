
// const googleModel = require('./googleController')

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDx7HFaSFpuvT2BOeiMh4qqL-U2RaxY5fo',
    Promise: Promise
});

module.exports = {

    //get baaces locations json from google


    // const {locationParam = null} = req.parasm;
    // const {radiusParam = 10000} = req.params;
    // const type = "'point_of_interest','natural_feature'";
    // const name = 'shore|beach';
    // const googleObject2 = {
    //     location: '41.383333,2.183333',
    //     radius: 10000,
    //     type: "'point_of_interest','natural_feature'",
    //     name: 'shore|beach'
    // };
    getBeaches(req, callback, next) {
        googleMapsClient.placesNearby({
            location: '41.383333,2.183333',
            radius: 10000,
            type: "'point_of_interest','natural_feature'",
            name: 'shore|beach'
        }, callback)
            .asPromise()
            .then((callback) => {
                console.log(callback.json.results);
            })
            .catch((err) => {
                console.log(err);
            })
    },

    // get spa locations json from google
    getSpa(req, res, next) {

    // const { locationParam = null } = req.parasm;
    // const { radiusParam = 10000 } = req.params;
    // const type = "";
    // const name = 'spa|hot springs|massage|beauty therapy|beauty center';

        const result =  googleMapsClient.placesNearby({
            location: [41.383333, 2.183333],
            radius: 10000,
            name: "spa|hot springs|massage|beauty therapy|beauty center"
        }) 
            .asPromise()
            .then(function(response) {
                res.status(200).json(response);
            })
            .catch((err) => {
            console.log(err);
        })


},

// get shops locations json from google
getShops(req, callback, next) {

    // const { locationParam = null } = req.parasm;
    // const { radiusParam = 10000 } = req.params;
    // const type = "";
    // const name = 'mall|shops|shopping%20center|boutique%20shop';

    googleMapsClient.placesNearby({
        location: '41.383333,2.183333',
        radius: 10000,
        name: "mall|shops|shopping center|boutique shop"
    }, callback)
        .asPromise()
        .then((callback) => {
            console.log(callback.json.results);
        })
        .catch((err) => {
            console.log(err);
        })
},


// get Bars locations json from google
getBars(req, callback, next) {

    // const { locationParam = null } = req.parasm;
    // const { radiusParam = 10000 } = req.params;
    // const type = "";
    // const name = "bar|cocktail%20bar|beach%20bar|club|dance%20club|night%20club|pub|dance%20pub|party|ball|concert";

    googleMapsClient.placesNearby({
        location: '41.383333,2.183333',
        radius: 10000,
        name: "bar|cocktail bar|beach bar|club|dance club|night club|pub|dance pub|party|ball|concert"
    }, callback)
        .asPromise()
        .then((callback) => {
            console.log(callback.json.results);
        })
        .catch((err) => {
            console.log(err);
        })
},


// get Restaurant locations json from google
getRestaurant(req, callback, next) {

    // const { locationParam = null } = req.parasm;
    // const { radiusParam = 10000 } = req.params;
    // const type = "";
    // const name = 'steak%20house|italian|french|bistro|sushi|chinese|jewish|mediterranean|grill';

    googleMapsClient.placesNearby({
        location: '41.383333,2.183333',
        radius: 10000,
        name: "steak house|italian|french|bistro|sushi|chinese|jewish|mediterranean|grill"
    }, callback)
        .asPromise()
        .then((callback) => {
            console.log(callback.json.results);
        })
        .catch((err) => {
            console.log(err);
        })
}


}



