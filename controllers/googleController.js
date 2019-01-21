const googleMapsClient = require('@google/maps').createClient({
    key: AIzaSyDx7HFaSFpuvT2BOeiMh4qqL - U2RaxY5fo,
    Promise: Promise
});


module.exports = {
    googleNearbyPlaces(locationParam, radiusParam, typeParam, nameParam) {
        const googleObject = {
            location: locationParam,
            radius: radiusParam,
            type: typeParam,
            name: nameParam
        };
        googleMapsClient.placesNearby(googleObject, res)
            .asPromise()
            .then((res) => {
                console.log(res.json.results);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}