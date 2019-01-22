const connection = require('./db');
const config = require('../Consts.js')
const getJSON = require('get-json')
module.exports = {
    getKidsAttraction(req, res, next) {
        getJSON(`${config.GOOGLE_PLACES_URL_FORMAT} ${req.body.location} ${config.RADIUS} ${req.body.radius} &type=%22point_of_interest%22,%22natural_feature%22&name=%22shore|beach%22 ${config.GOOGLE_PLACES_API_KEY}`, function (err, response) {

            key = 0
            for (key in response.results) {
                if (response.results[key].rating >= 4)
                    res.send(response.results[key].place_id);
                    //console.log(response.results[key].place_id)
                break;
            }
            console.log(response.results.length)
            if (err) console.log('can not get places Json')
        });
    }
}