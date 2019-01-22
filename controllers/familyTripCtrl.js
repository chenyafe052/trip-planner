const connection = require('./db');
const config = require('../Consts.js')
module.exports = {
    getKidsAttraction(req, res, next) {
        getJSON(``, function (err, response) {
            let key = 0
            for (key in response.results) {
                if (response.results[key].rating >= 4)
                    console.log(response.results[key].place_id)
                break;
            }
            console.log(response.results.length)
            if (err) console.log('can not get places Json')
        });
    }
}