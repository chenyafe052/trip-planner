module.exports = {
    //CREATE new trip
    setNewTrip(req, res, next) {
        const { userId = null, tripType = null } = req.params
        user_ID=userId
        trip_type=tripType
        const newTrip = new Trips({user_ID, trip_type})
        newTrip.save(
            (err) => {
                if (result) res.json(result)
                else res.status(404).send('not found')
            })
    },
    //READ all trips
    getAllTrips(req, res, next) {
        const result = Trips.find({})

        if (result) res.json(result)
        else res.status(404).send('not found')
    },
    //READ trip by tripId
    getTripById(req, res, next) {
        const { tripId = null } = req.params
        const result = Trips.find({ tripId })

        if (result) res.json(result)
        else res.status(404).send('not found')
    },
    //UPDATE new trip
    // editTrip(req, res, next) {
    //     const { tripId = null, userId = null } = req.params
    //     const { tripType = null } = req.body
    //     const result = Trips.find({ tripId })
    //     result.save(
    //         (err) => {
    //             if (result) res.json(result)
    //             else res.status(404).send('not found')
    //         }
    // },
    //DELETE trip by id
    deleteTrip(req, res, next) {
        const {tripId = null } = req.params
        Trips.deleteOne(tripId, (err, result) => {
            if (result) res.json(result)
            else res.status(404).send('not found')
        })   
    }
}



