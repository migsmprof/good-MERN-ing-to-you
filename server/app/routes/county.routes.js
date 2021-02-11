module.exports = app => {
    const counties = require('../controllers/county.controller')
    var router = require('express').Router()

    //C
    router.post('/', counties.create)

    //R
    router.get('/:code', counties.findOne)
    router.get('/', counties.findAll)

    //U
    router.put('/:code', counties.update)

    //D
    router.delete('/:code', counties.delete)
    router.delete('/', counties.deleteAll)

    app.use('/api/counties', router)
}