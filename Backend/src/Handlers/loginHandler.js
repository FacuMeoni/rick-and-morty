const loginController = require('../Controllers/LoginUser');


async function loginHandler (req, res) {
    try {
        const { username, password } = req.body

        const user = await loginController(username, password);
        
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}



module.exports = loginHandler;