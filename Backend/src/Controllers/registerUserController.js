const { User } = require('../db');

async function register ({ username, password }) {
    try {
        
        if(!username)throw new Error('Please complete Username');
        if(!password)throw new Error('Please complete Password');

        const userCreated = await User.findOne({where: { username: username}});

        if(userCreated) throw new Error('User already exists');

        const newUser = await User.create({
            username, password
        });

        
        return  { access: true, user:{
            id: newUser.id,
            username: newUser.username
        }};
    } catch (error) {
        throw new Error(error.message);   
    }
} 

module.exports = register;