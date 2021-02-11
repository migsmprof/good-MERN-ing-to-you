module.exports = app => {
    const states = require('../controllers/state.controller')
    var router = require('express').Router()

    //C
    router.post('/', states.create)

    //R
    router.get('/', states.findAll)
    router.get('/:code', states.findOne)

    //U
    router.put('/:code', states.update)

    //D
    router.delete('/:code', states.delete)
    router.delete('/', states.deleteAll)

    app.use('/api/states', router)
}