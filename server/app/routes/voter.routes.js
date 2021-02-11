module.exports = app => {
    const voters = require('../controllers/voter.controller')
    var router = require('express').Router()

    //C
    router.post('/', voters.create)

    //R
    router.get('/:id', voters.findOne)
    router.get('/', voters.findAll)

    //U
    router.put('/:id', voters.update)

    //D
    router.delete('/:id', voters.delete)
    router.delete('/', voters.deleteAll)

    app.use('/api/voters', router)
}