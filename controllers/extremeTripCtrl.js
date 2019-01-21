
// Create client with a Promise constructor
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDx7HFaSFpuvT2BOeiMh4qqL-U2RaxY5fo',
    Promise: Promise // 'Promise' is the native constructor.
})

module.exports = {
    getParks(req, callback, next) {
        googleMapsClient.placesNearby({
            location: '41.383333,2.183333',
            radius: 10000,
            type: 'amusement park',
            name: 'adventure|extreme'
        }, callback)
            .asPromise()
            .then((callback) => {
                console.log(callback.json.results);
            })
            .catch((err) => {
                console.log(err);
            })
    },

    getAdventure(req, callback, next) {
        googleMapsClient.placesNearby({
            location: '41.383333,2.183333',
            radius: 10000,
            type: 'adventure',
            name: 'adventure|helicopter|extreme|mountain|climbing|skydiving|desert trekking|trek|rock climbing|river|hike|Bungee|ski|wave surfing|Mountaineering|Rafting|Paintball|wakeboarding|downhill|Motocross|PARAGLIDING|Snowboarding|Motorcycle'
        }, callback)
            .asPromise()
            .then((callback) => {
                console.log(callback.json.results);
            })
            .catch((err) => {
                console.log(err);
            })
    },

    getRv(req, callback, next) {
        googleMapsClient.placesNearby({
            location: '41.383333,2.183333',
            radius: 10000,
            type: 'rv_park',
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
