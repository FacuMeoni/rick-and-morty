const register = require('../Controllers/registerUserController');


async function registerHandler (req, res) {
    try {
        const newUser = await register(req.body);

        return res.status(200).json(newUser);

    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports = registerHandler;