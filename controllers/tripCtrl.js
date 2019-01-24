const tripModel = require('../models/trip');
/* ADD ASYNC AWAIT TO ALL DB FUNCTIONS */
/* WHEN CREATE AND UPDATE : TODO UPDATE PLACES AMOUNT VISITORS */

module.exports = {
    //done -V- get all trips
    async getAllTrips(req, res, next) {
        const result = await tripModel.find({})
        if (result) {
            res.json(result);
        }
        else {
            res.status(404).send('not found')
        }
    },
    //done -V- get all trips
    //CREATE new trip body.params:trip[object]
    async createNewTrip(req, res, next) {
        const trip = new tripModel(req.body);
        const result = await trip.save();
        if (result) {
            res.status(200).send({ "added": 1 })
        }
        else {
            res.status(404).send({ "error": "wrong params input" })
        }
    },

    //EDIT trip req.params:tripId body.params:placesArray
    async editTripByID(req, res, next) {
        const { _id = null } = req.params;
        const places = req.body;

        const result = await tripModel.updateOne({ _id }, { places })
        if(result){
            res.status(200).send({"edited":_id})
        }
        else{
            res.status(404).send({"error":"wrong params or not found"})
        }
    },
    //done -V- get all trips
    //READ TRIP BY ID req.params:id
    async findTripByID(req, res, next) {
        const { id = null } = req.params

        const result = await tripModel.findById(id);
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(404).send({ "error": "wrong params or not found" })
        }
    },
    //done -V- get all trips
    //DELETE
    async deleteTrip(req, res, next) {
        const { _id = null } = req.params
        const result = await tripModel.deleteOne(_id);
        if (result) {
            res.status(200).send({ "deleted": 1 })
        } else {
            res.status(404).send({ "error": "wrong params or not found" })
        }
    }
}
