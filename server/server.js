// NPM Modules
const express = require('express')
const bodyParser = require('body-parser')

// Local Modules
const server_config = require('./app/config/server.config.js')
const db = require('./app/models')

// Routing
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Node.js == Express Framework == Sequelize ORM == MySQL == Heroku'))

// Database
db.sequelizeObject.sync()

// REST API Routes Directory
require('./app/routes/state.routes')(app)
require('./app/routes/county.routes')(app)
require('./app/routes/voter.routes')(app)

// Server
const PORT = server_config.PORT
app.listen(PORT, () => {
    console.log(`
        Server is running in port number $ { PORT }.
        `);
});