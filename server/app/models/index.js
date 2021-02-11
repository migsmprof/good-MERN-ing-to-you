const dbConf = require("../config/db.config.js")
const Sequelize = require("sequelize")

// Sequelize ORM Configuration
const sequelize = new Sequelize(dbConf.DB, dbConf.USER, dbConf.PASSWORD, {
    host: dbConf.HOST,
    dialect: dbConf.dialect,
    operatorsAliases: '0',
    pool: {
        max: dbConf.max,
        min: dbConf.min,
        acquired: dbConf.acquired,
        idle: dbConf.idle,
    }
})

// Database Object Init
const db = {}
db.sequelizeModule = Sequelize
db.sequelizeObject = sequelize

// Database Access Objects Init
db.states = require('./state.model.js')(db.sequelizeObject, db.sequelizeModule)
db.counties = require('./county.model.js')(db.sequelizeObject, db.sequelizeModule)
db.voters = require('./voter.model.js')(db.sequelizeObject, db.sequelizeModule)

// ORM Associations/ERD Setup
db.voters.belongsTo(db.states, {
    foreignKey: {
        name: 'home_state',
        type: Sequelize.SMALLINT(length = 2, zerofill = true, unsigned = true),
        allowNull: false,
    },
})
db.voters.belongsTo(db.counties, {
    foreignKey: {
        name: 'home_county',
        type: Sequelize.SMALLINT(length = 5, zerofill = true, unsigned = true),
        allowNull: false,
    }
})
db.counties.belongsTo(db.states, {
    foreignKey: {
        name: 'home_state',
        type: Sequelize.SMALLINT(length = 2, zerofill = true, unsigned = true),
        allowNull: false,
    }
})

module.exports = db