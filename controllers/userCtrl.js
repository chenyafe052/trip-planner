const userModel = require('../models/user');

module.exports = {

    /* Adds a new user */
    async addUser(req, res, next) {
        const { email = null, userName = null } = req.body;
        const user = new userModel({ email, userName });
        const result = await user.save()
        
        if (result) res.json(result)
        else res.status(404).send('failed')
    },

    async getUserByEmail(req, res, next) {
        const { email = null } = req.params
        const result = await userModel.findOne({ email })
        
        if (result) res.json(result)
        else res.status(404).send('not found')
    }
}
