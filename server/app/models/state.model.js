module.exports = (sequelizeObject, sequelizeModule) => {
    const State = sequelizeObject.define('state', {
        code: {
            type: sequelizeModule.SMALLINT(2).UNSIGNED.ZEROFILL,
            primaryKey: true,
        },
        state_name: {
            type: sequelizeModule.STRING,
            unique: true,
            field: 'name',
            allowNull: false,
        }
    }, {
        underscored: true,
        timestamps: false,
    })

    return State
}