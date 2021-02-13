// NPM Modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Custom Modules
const server_config = require('./app/config/server.config.js')
const db = require('./app/models')

// Initialize Express Framework
const app = express()
app.get('/', (req, res) => res.send('Node.js == Express Framework == Sequelize ORM == MySQL == Heroku'))

// Frontend Connection through CORS
const corsOptions = {
    origin: 'http://localhost:4001'
}
app.use(cors(corsOptions))

// Routing Helpers Setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ORM and Database Synchronization
db.sequelizeObject.sync()

// REST API Routes Directory
require('./app/routes/state.routes')(app)
require('./app/routes/county.routes')(app)
require('./app/routes/voter.routes')(app)

// Server Configuration
const PORT = server_config.PORT
app.listen(PORT, () => {
    console.log(`
        Server is running in port number $ { PORT }.
        `);
});