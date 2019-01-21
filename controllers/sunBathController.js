

// Create client with a Promise constructor
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDx7HFaSFpuvT2BOeiMh4qqL-U2RaxY5fo',
    Promise: Promise // 'Promise' is the native constructor.
});


module.exports = {

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
    }

}

// googleMapsClient.placesNearby({ 
//     location: '41.383333,2.183333', 
//     radius: '10000',
//     type: "'point_of_interest','natural_feature'",
//     name: 'shore|beach'
//     }, callback)
//     .asPromise()
//     .then((callback) => {
//         console.log(callback.json.results);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

