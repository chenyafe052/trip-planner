const userModel = require('../models/user');

module.exports = {

    /* Adds a new user */
    addUser: async (req, res) => {
        const { email = null, name = null } = req.body;
        const user = new userModel({ email, name });

        user.save()
            .then((result) => {
            console.log(result);
            res.status(200).send(`${name} registered successfully`);
        },
            (err) => {
                console.log(err);
                res.status(404).send(`registration failed`);
            });
    },

    async getUserByEmail(req, res, next) {
        const { email = null } = req.params
        const result = await userModel.findOne({ email })
        
        if (result) res.json(result)
        else res.status(404).send('not found')
    }
}
