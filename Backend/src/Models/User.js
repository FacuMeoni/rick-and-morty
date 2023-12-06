const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        username:{
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true
        },
        password: {
            type :DataTypes.STRING(15),
            validate: {
                is: /\d/
            },
            allowNull: false
        }
    }, { timestamps: false })
}

