module.exports = (sequelizeObject, sequelizeModule) => {
    const Voter = sequelizeObject.define('voter', {
        last_name: {
            type: sequelizeModule.STRING,
            allowNull: false,
            field: 'last_name',
        },
        first_name: {
            type: sequelizeModule.STRING,
            allowNull: false,
            field: 'first_name',
        },
        middle_name: {
            type: sequelizeModule.STRING,
            allowNull: false,
            field: 'middle_name',
        },
    }, {
        underscored: true,
        timestamps: false,
    })

    return Voter
}