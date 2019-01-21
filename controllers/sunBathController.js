


module.exports = {

    //get baaces locations json from google
    getBeaches(req, res, next) {

        const {locationParam = null} = req.parasm;
        const {radiusParam = 10000} = req.params;
        const type = "'point_of_interest','natural_feature'";
        const name = 'shore|beach';

   },

    // get spa locations json from google
    getSpa(req, res, next) {

        const {locationParam = null} = req.parasm;
        const {radiusParam = 10000} = req.params;
        const type = "";
        const name = 'spa|hot%20springs|massage|beauty%20therapy|beauty%20center';

    },

    // get shops locations json from google
    getShops(req, res, next) {

        const {locationParam = null} = req.parasm;
        const {radiusParam = 10000} = req.params;
        const type = "";
        const name = 'mall|shops|shopping%20center|boutique%20shop';

    },


    // get Bars locations json from google
    getBars(req, res, next) {

        const {locationParam = null} = req.parasm;
        const {radiusParam = 10000} = req.params;
        const type = "";
        const name = 'bar|cocktail%20bar|beach%20bar|club|dance%20club|night%20club|pub|dance%20pub|party|ball|concert';

    },


    // get Restaurant locations json from google
    getRestaurant(req, res, next) {

        const {locationParam = null} = req.parasm;
        const {radiusParam = 10000} = req.params;
        const type = "";
        const name = 'steak%20house|italian|french|bistro|sushi|chinese|jewish|mediterranean|grill';

    }


}



