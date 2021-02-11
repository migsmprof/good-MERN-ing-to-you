const db = require("../models")
const States = db.states
const Op = db.sequelizeModule.Op

//C
exports.create = (req, res) => {
    if (!req.body) {
        res.send({
            message: '',
        })
    }

    States
        .bulkCreate(req.body.entries)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}

//R
exports.findOne = (req, res) => {
    var code = req.params.code * 1

    States
        .findByPk(code)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}

exports.findAll = (req, res) => {
    States
        .findAll({
            where: {}
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}

//U
exports.update = (req, res) => {
    var code = req.params.code * 1

    States
        .update(req.body, {
            where: {
                code: code
            }
        })
        .then(num => {
            var msg = (num == 1) ? 's' : 'e'
            res.send({
                message: msg
            })
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}

//D
exports.delete = (req, res) => {
    var code = req.params.code * 1

    States
        .destroy({
            where: {
                code: code
            }
        })
        .then(num => {
            var msg = (num == 1) ? 's' : 'e'
            res.send({
                message: msg
            })
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}

exports.deleteAll = (req, res) => {
    States
        .destroy({
            where: {},
            truncate: false,
        })
        .then(nums => {
            res.send({
                message: nums
            })
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}