const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Character',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
            allowNull:false
        },
        species:{
            type:DataTypes.STRING,
            allowNull: false
        },
        gender:{
            type: DataTypes.ENUM("Male", "Female", "Genderless", "unknown"),
            allowNull: false
        },
        origin:{
            type:DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            isUrl: {
                args: true,
                msg: 'The image must be an URL'
            }}
        }
    }, {
        timestamps: false
    })  
}