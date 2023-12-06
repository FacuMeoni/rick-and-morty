const { User } = require('../db');

async function loginController (username, password) {
    try {
        if(!username)throw new Error('Please complete username')
        if(!password)throw new Error('Please complete Password')

        const user = await User.findOne({
            where: { username }
        });
        

        if(!user)throw new Error('Incorrect username');
        
        
        if( password != user.password ) throw new Error('Incorrect Password');

        return { access: true, user:{
            id:user.id,
            username: user.username
        }};
    } catch (error) {
       throw new Error(error.message)
    }
}



module.exports = loginController;