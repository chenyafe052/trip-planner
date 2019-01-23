const placeModel = require('../models/place')

module.exports = {
    async getAllPlaces(req, res, next) {
        const result = await placeModel.find({})

        if (result) res.json(result)
        else res.status(404).send('not found')
    },

    async getPlaceById(req, res, next) {
        const { placeGoogleId = null } = req.params
        const result = await placeModel.find({ placeGoogleId })

        if (result) res.json(result)
        else res.status(404).send('not found')
    },

    async saveNewPlace(req, res, next) {
        const { placeGoogleId = null }= req.params
        const { placeType = null } = req.body
        amountOfSelections = 1
        const place = new placeModel({placeType, placeGoogleId, amountOfSelections})
        const result = await place.save()
        if (result) res.json(result)
        else res.status(404).send('not found')
    },

    async updateAmount(req, res, next) {
        const { placeGoogleId = null } = req.params
        const place = await placeModel.findOne({ placeGoogleId })
        place.amountOfSelections++;
        const result = await placeModel.updateOne({placeGoogleId}, {amountOfSelections:place.amountOfSelections})
        if (result) res.json(result)
        else res.status(404).send('not found')
    }
}