module.exports = (sequelizeObject, sequelizeModule) => {
    const County = sequelizeObject.define('county', {
        code: {
            type: sequelizeModule.SMALLINT(5).UNSIGNED.ZEROFILL,
            primaryKey: true,
        },
        county_name: {
            type: sequelizeModule.STRING,
            field: 'name',
            allowNull: false,
        },
    }, {
        underscored: true,
        timestamps: false,
    })

    return County
}