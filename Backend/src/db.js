require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER,  DB_HOST, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
,{
    logging: false,
    native:false
});

//execute the models
require('./Models/Character')(sequelize)
require('./Models/User')(sequelize)


//relations
const { Character, User } = sequelize.models;

Character.belongsToMany(User, { through: 'favorites' });
User.belongsToMany(Character, { through: 'favorites' });


module.exports = {
    ...sequelize.models,
    conn: sequelize
}