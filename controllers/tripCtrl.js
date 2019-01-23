const tripModel = require('../models/trip');

/* ADD ASYNC AWAIT TO ALL DB FUNCTIONS */


/* WHEN CREATE AND UPDATE : TODO UPDATE PLACES AMOUNT VISITORS */



module.exports = {
    //CREATE new trip body.params:trip[object]
    createNewTrip(req,res,next){
        const trip = new tripModel(req.body);
        trip.save(function(err,trip){
            if(err){
                return res.status(400).json(err);
            }
            res.status(200).json(trip)
        })
    },
    //EDIT trip req.params:tripId body.params:placesArray
    editTripByID(req,res,next){
        const {_id = null} = req.params;
        const places = req.body;
        tripModel.updateOne({ _id},{places}).then(function(err){
            if(err){
                return res.status(400).json(err);
            }
            res.status(200).json({"updated":_id});
        })
    },
    //READ TRIP BY ID req.params:id
    findTripByID(req,res,next){
        const id = req.params.id;
        tripModel.findById(id).then(function(trip,err){
            if(err){
                res.send.status(404).json({"found":0});
            }
            res.status(200).json(trip);
        })
    },

    getAllTrips(req,res,next){
        tripModel.find({}).then(function(err,result){
            if(err){
                res.status(404).send("not found");
            }
            res.status(200).json(result);
        })
    },
    deleteTrip(req, res, next) {
        const { _id = null } = req.params
        tripModel.deleteOne(_id, (err, result) => {
            if (result) res.json(result)
            else res.status(404).send('not found')
        })   
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



