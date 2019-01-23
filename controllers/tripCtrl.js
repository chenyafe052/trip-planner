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
        else{
            res.status(404).send('not found')
        }
    },
    //done -V- get all trips
    //CREATE new trip body.params:trip[object]
    async createNewTrip(req, res, next) {
        const trip = new tripModel(req.body);
        const result = await trip.save();
        if(result){
            res.status(200).send({"added":1})
        }
        else{
            res.status(404).send({"error":"wrong params input"})
        }
    },
    //done -V- get all trips
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

        const result = await findById(id);
        if(result){
            res.status(200).send(result)
        }else{
            res.status(404).send({"error":"wrong params or not found"})
        }
    },
    //done -V- get all trips
    //DELETE
    async deleteTrip(req, res, next) {
        const { _id = null } = req.params
        const result = await tripModel.deleteOne(_id);
        if(result){
            res.status(200).send({"deleted":1})
        }else{
            res.status(404).send({"error":"wrong params or not found"})
        }
    }
    // setNewTrip(req, res, next) {
    //     const { userId = null, tripType = null } = req.params
    //     user_ID=userId
    //     trip_type=tripType
    //     const newTrip = new Trips({user_ID, trip_type})
    //     newTrip.save(
    //         (err) => {
    //             if (result) res.json(result)
    //             else res.status(404).send('not found')
    //         })
    // },
    // //READ all trips
    // async getAllTrips(req, res, next) {
    //     const result = await tripModel.find({})
    //     console.log(result);
    //     if (result) res.status(200).json(result)
    //     else res.status(404).send('not found')
    // },
    // //READ trip by tripId
    // getTripById(req, res, next) {
    //     const { tripId = null } = req.params
    //     const result = Trips.find({ tripId })

    //     if (result) res.json(result)
    //     else res.status(404).send('not found')
    // },
    // //UPDATE new trip
    // editTrip(req, res, next) {
    //     const { tripId = null, userId = null } = req.params
    //     const { tripType = null } = req.body
    //     const result = Trips.find({ tripId })
    //     result.save(
    //         (err) => {
    //             if (result) res.json(result)
    //             else res.status(404).send('not found')
    //     })
    // },
    // //DELETE trip by id
    // deleteTrip(req, res, next) {
    //     const {tripId = null } = req.params
    //     Trips.deleteOne(tripId, (err, result) => {
    //         if (result) res.json(result)
    //         else res.status(404).send('not found')
    //     })   
    // }
}
