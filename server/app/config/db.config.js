module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '1234',
    DB: 'usvotersdb',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquired: 30000,
        idle: 10000,
    },
};