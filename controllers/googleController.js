const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDx7HFaSFpuvT2BOeiMh4qqL-U2RaxY5fo',
    Promise: Promise
});


module.exports = {
    googleNearbyPlaces(req,res,next) {
        googleMapsClient.placesNearby(googleObject2, callback)
            .asPromise()
            .then((callback) => {
                console.log(callback.json.results);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}